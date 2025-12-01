// API Endpoint para recibir datos del sensor FSR del ESP32
// Ruta: /api/sensor-data
//
// IMPORTANTE: Este es un endpoint serverless de Vercel.
// Para usarlo en desarrollo local: npm install -g vercel && vercel dev

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Inicializar Firebase Admin (solo una vez)
if (!getApps().length) {
  // OPCIÓN 1: Usando variables de entorno (RECOMENDADO para producción)
  // Configura estas variables en Vercel Dashboard > Settings > Environment Variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else {
    // OPCIÓN 2: Para desarrollo local (no usar en producción)
    // Descarga el archivo de credenciales desde Firebase Console
    initializeApp({
      databaseURL: "https://TU_PROJECT_ID-default-rtdb.firebaseio.com"
    });
  }
}

const db = getDatabase();

// Función para validar el código del peluche
function validarCodigoPeluche(codigo) {
  if (!codigo || typeof codigo !== 'string') {
    return false;
  }
  // Formato esperado: NUTRIA-XXXXXX (letras y números)
  const regex = /^NUTRIA-[A-Z0-9]{6}$/;
  return regex.test(codigo);
}

// Función para validar la presión
function validarPresion(presion) {
  const num = Number(presion);
  return !isNaN(num) && num >= 0 && num <= 1023; // Rango del sensor FSR
}

// Handler del endpoint
export default async function handler(req, res) {
  // Configurar CORS para permitir peticiones desde el ESP32
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar peticiones OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo aceptar peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Método no permitido. Usa POST.'
    });
  }

  try {
    const { pelucheId, presion } = req.body;

    // Validar datos recibidos
    if (!validarCodigoPeluche(pelucheId)) {
      return res.status(400).json({
        success: false,
        error: 'Código de peluche inválido. Formato esperado: NUTRIA-XXXXXX'
      });
    }

    if (!validarPresion(presion)) {
      return res.status(400).json({
        success: false,
        error: 'Presión inválida. Debe ser un número entre 0 y 1023.'
      });
    }

    // Verificar que el peluche existe en la base de datos
    const pelucheRef = db.ref(`peluches/${pelucheId}`);
    const pelucheSnapshot = await pelucheRef.once('value');

    if (!pelucheSnapshot.exists()) {
      return res.status(404).json({
        success: false,
        error: 'Peluche no encontrado. Por favor vincúlalo primero en la aplicación web.'
      });
    }

    // Guardar la lectura en Firebase
    const lecturaRef = db.ref(`lecturas/${pelucheId}`).push();
    await lecturaRef.set({
      presion: Number(presion),
      timestamp: new Date().toISOString(),
      fecha: new Date().toLocaleDateString('es-MX'),
      hora: new Date().toLocaleTimeString('es-MX')
    });

    // Responder con éxito
    return res.status(200).json({
      success: true,
      message: 'Lectura guardada correctamente',
      data: {
        pelucheId,
        presion: Number(presion),
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error al procesar datos del sensor:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
