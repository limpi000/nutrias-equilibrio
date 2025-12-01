# 🦦 Nutrias en Equilibrio

**Sistema de detección de crisis de ansiedad mediante peluche inteligente con sensor FSR**

Una aplicación web integrada con ESP32 para monitorear niveles de ansiedad a través de la presión ejercida en un peluche, proporcionando alertas, sonidos relajantes y recursos de apoyo en tiempo real.

---

## 📋 Descripción del Proyecto

Nutrias en Equilibrio es un proyecto que combina hardware (ESP32 + sensor FSR) con una aplicación web para:

- **Detectar crisis de ansiedad** mediante la presión que una persona ejerce en un peluche
- **Alertar en tiempo real** cuando se detectan niveles elevados de presión (>70)
- **Proporcionar recursos** como sonidos relajantes, números de emergencia y ejercicios de respiración
- **Visualizar datos** históricos y estadísticas de uso
- **Personalizar** la experiencia según las necesidades del usuario

---

## ✨ Funcionalidades

### 🦦 Vinculación de Peluche
- Generar código único para cada peluche (formato: `NUTRIA-XXXXXX`)
- Configurar nombre, contactos de emergencia y preferencias de sonido
- Establecer umbral personalizado de alerta de crisis

### 📊 Dashboard de Datos
- Gráficas de presión en tiempo real con Recharts
- Estadísticas diarias: lecturas totales, presión máxima, promedio y alertas
- Historial de lecturas con estados codificados por colores
- Visualización semanal de tendencias

### 🎛️ Monitoreo en Tiempo Real
- Indicador de presión actual con código de colores:
  - 🟢 Verde (0-49): Calma
  - 🟡 Amarillo (50-69): Atención
  - 🔴 Rojo (70+): Crisis
- Reproducción automática de sonidos relajantes durante crisis
- Últimas 10 lecturas en tiempo real
- Botones de contacto de emergencia

### 🎵 Sonidos Relajantes
- **Audio local:** Naturaleza, olas, respiración guiada, música instrumental
- **Videos de YouTube:** Meditación, sonidos de bosque, lluvia
- Control de reproducción con detección automática de crisis

### 📱 Información de Apoyo
- Directorio de 11 centros de tratamiento psicológico en Chihuahua
- Información sobre 6 trastornos mentales
- Guía de manejo de crisis emocionales
- Recursos para familiares y amigos

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React** 19.2.0 - Framework UI
- **Recharts** 2.10.3 - Gráficas y visualización de datos
- **React YouTube** 10.1.0 - Integración de videos
- **Firebase** 10.7.1 - Base de datos en tiempo real

### Backend
- **Vercel Serverless Functions** - API endpoints
- **Firebase Admin** 12.0.0 - Gestión de base de datos

### Hardware
- **ESP32** - Microcontrolador con WiFi
- **Sensor FSR** o **Potenciómetro** - Force Sensitive Resistor
- **MicroPython** - Lenguaje de programación para ESP32

---

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js 16.x o superior
- npm o yarn
- Cuenta de Firebase
- Cuenta de Vercel (para deployment)
- ESP32 y sensor FSR (para hardware)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/limpi000/nutrias-equilibrio.git
cd nutrias-equilibrio
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Firebase
Ver guía completa en [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md)

**Resumen:**
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Activar Realtime Database
3. Obtener credenciales web
4. Editar `src/firebaseConfig.js` con tus credenciales

### 4. Configurar ESP32
Ver guía completa en [`GUIA_MICROPYTHON_ESP32.md`](./GUIA_MICROPYTHON_ESP32.md)

**Resumen:**
1. Instalar MicroPython en el ESP32
2. Conectar potenciómetro o sensor FSR al GPIO 34
3. Configurar WiFi y código del peluche en `main.py`
4. Subir `main.py` al ESP32

### 5. Desarrollo Local
```bash
npm start
```
Abre [http://localhost:3000](http://localhost:3000)

### 6. Deploy a Producción
```bash
npm run build
```

O conectar con Vercel:
```bash
vercel --prod
```

---

## 📁 Estructura del Proyecto

```
nutrias-equilibrio/
├── api/
│   └── sensor-data.js          # Endpoint para recibir datos del ESP32
├── public/
│   ├── sounds/                 # Archivos MP3 de sonidos relajantes
│   │   └── README.md           # Guía para agregar sonidos
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── VincularPeluche.js  # Página de vinculación
│   │   ├── Dashboard.js        # Dashboard con gráficas
│   │   └── MonitoreoTiempoReal.js  # Monitoreo en vivo
│   ├── App.js                  # Componente principal
│   ├── firebaseConfig.js       # Configuración de Firebase
│   ├── pelucheUtils.js         # Funciones de manejo de datos
│   └── soundManager.js         # Gestor de audio
├── main.py                     # Código MicroPython para ESP32
├── GUIA_MICROPYTHON_ESP32.md   # Guía completa de MicroPython
├── INICIO_RAPIDO_ESP32.md      # Guía rápida para ESP32
├── ESP32_SETUP.md              # Documentación técnica ESP32
├── FIREBASE_SETUP.md           # Guía de configuración de Firebase
├── ENCUESTA_CONFIG.md          # Configuración de encuestas
└── README.md                   # Este archivo
```

---

## 🔌 Protocolo de Comunicación ESP32

### Endpoint API
```
POST https://tu-app.vercel.app/api/sensor-data
Content-Type: application/json
```

### Request Body
```json
{
  "pelucheId": "NUTRIA-ABC123",
  "presion": 450
}
```

### Response (Éxito)
```json
{
  "success": true,
  "message": "Lectura guardada correctamente",
  "data": {
    "pelucheId": "NUTRIA-ABC123",
    "presion": 450,
    "timestamp": "2025-11-30T12:34:56.789Z"
  }
}
```

Ver documentación completa en [`GUIA_MICROPYTHON_ESP32.md`](./GUIA_MICROPYTHON_ESP32.md)

---

## 🎨 Capturas de Pantalla

### Vincular Peluche
Formulario para generar código único y configurar preferencias.

### Dashboard
Gráficas de presión, estadísticas diarias y tabla de lecturas.

### Monitoreo en Tiempo Real
Indicador de presión actual con alertas y controles de audio.

---

## 🧪 Uso del Sistema

### Flujo Básico

1. **Vincular el peluche:**
   - Ve a "Vincular Mi Peluche"
   - Genera un código único
   - Configura contactos de emergencia y preferencias
   - Guarda el código

2. **Configurar ESP32:**
   - Programa el ESP32 con el código generado
   - Conecta el sensor FSR
   - Verifica conexión WiFi

3. **Monitorear:**
   - Ve a "Monitoreo" para ver presión en tiempo real
   - Revisa "Dashboard" para ver estadísticas
   - El sistema alertará automáticamente si presión > 70

4. **En caso de crisis:**
   - Se activan sonidos relajantes automáticamente
   - Aparecen números de emergencia
   - Opciones de ejercicios de respiración

---

## 🔐 Seguridad y Privacidad

- Los datos se almacenan en Firebase Realtime Database
- Cada peluche tiene un código único
- No se requiere autenticación de usuario (por diseño)
- Datos son anónimos (solo alias opcional)
- Reglas de Firebase configurables para producción

---

## 📊 Límites y Consideraciones

### Firebase (Plan Gratuito)
- 50,000 lecturas/día
- 20,000 escrituras/día
- 1 GB almacenamiento
- **Recomendación:** Enviar datos cada 2-5 segundos

### Vercel (Plan Gratuito)
- 100 GB bandwidth/mes
- Serverless functions ilimitadas
- Suficiente para ~10-20 peluches activos

---

## 🛡️ Solución de Problemas

### El peluche no envía datos
- Verificar conexión WiFi del ESP32
- Revisar Monitor Serial para errores
- Confirmar que el peluche esté vinculado en la web

### No aparecen gráficas
- Verificar que haya datos en Firebase
- Asegurarse de usar el código correcto
- Revisar consola del navegador para errores

### Sonidos no reproducen
- Agregar archivos MP3 a `public/sounds/`
- Verificar que los nombres coincidan con `soundManager.js`
- Probar con videos de YouTube como alternativa

Ver más en las guías de configuración.

---

## 🤝 Contribuciones

Este es un proyecto académico de la campaña "Nutrias en Equilibrio".

Para contribuir:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

## 👥 Créditos

### Instituciones Colaboradoras
- AMIIF (Asociación Mexicana de Industrias de Investigación Farmacéutica)
- IMSS
- OMS (Organización Mundial de la Salud)
- Instituto Nacional de Psiquiatría Ramón de la Fuente

### Equipo
- Desarrolladores: Equipo Nutrias en Equilibrio
- Institución: [Tu institución]
- Año: 2025

---

## 📞 Contacto

- Email: nutriasenequilibrio@gmail.com
- IMPASS: (614) 194-02-00 (Línea de crisis 24/7)

---

## 🎯 Roadmap Futuro

- [ ] Implementar autenticación de usuarios
- [ ] App móvil nativa (React Native)
- [ ] Notificaciones push
- [ ] Análisis predictivo de patrones de ansiedad
- [ ] Integración con smartwatches
- [ ] Modo offline para datos

---

**¡Gracias por usar Nutrias en Equilibrio! 🦦💚**

*Recuerda: Este sistema es complementario, no sustituye atención profesional médica o psicológica.*
