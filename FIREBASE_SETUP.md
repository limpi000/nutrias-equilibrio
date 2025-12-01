# 🔥 Configuración de Firebase para Nutrias en Equilibrio

Esta guía te ayudará a configurar Firebase para tu proyecto.

---

## 📋 Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Add project" o "Agregar proyecto"
3. Nombre del proyecto: `nutrias-equilibrio` (o el que prefieras)
4. Desactiva Google Analytics (opcional)
5. Haz clic en "Create project"

---

## 🗄️ Paso 2: Configurar Realtime Database

1. En el menú lateral, selecciona **Build > Realtime Database**
2. Haz clic en **"Create Database"**
3. Selecciona ubicación: **United States (us-central1)** (recomendado)
4. Modo de seguridad: **"Start in test mode"** (por ahora)
5. Haz clic en **"Enable"**

### Configurar Reglas de Seguridad

Una vez creada la base de datos, ve a la pestaña **"Rules"** y reemplaza con:

```json
{
  "rules": {
    "peluches": {
      "$pelucheId": {
        ".read": true,
        ".write": true
      }
    },
    "lecturas": {
      "$pelucheId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

**Nota:** Estas reglas permiten lectura/escritura pública. Para producción, deberías implementar autenticación.

Haz clic en **"Publish"** para guardar.

---

## 🌐 Paso 3: Obtener Configuración Web

1. En la página principal de Firebase, haz clic en el ícono **</> (Web)**
2. Nombre de la app: `nutrias-equilibrio-web`
3. **NO** marcar "Also set up Firebase Hosting"
4. Haz clic en **"Register app"**
5. Copia el objeto `firebaseConfig`, se verá así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "nutrias-equilibrio.firebaseapp.com",
  databaseURL: "https://nutrias-equilibrio-default-rtdb.firebaseio.com",
  projectId: "nutrias-equilibrio",
  storageBucket: "nutrias-equilibrio.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## 📝 Paso 4: Configurar el Proyecto React

### Editar `src/firebaseConfig.js`

Reemplaza los valores en `/src/firebaseConfig.js` con tu configuración:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://TU_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
```

---

## 🔑 Paso 5: Configurar Firebase Admin (Para API)

### Generar Clave Privada

1. En Firebase Console, ve a **Project Settings** (ícono de engranaje)
2. Pestaña **"Service accounts"**
3. Haz clic en **"Generate new private key"**
4. Se descargará un archivo JSON con formato:

```json
{
  "type": "service_account",
  "project_id": "nutrias-equilibrio",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@nutrias-equilibrio.iam.gserviceaccount.com",
  ...
}
```

### Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/)
2. Settings > Environment Variables
3. Agrega las siguientes variables:

| Variable Name | Value |
|---------------|-------|
| `FIREBASE_SERVICE_ACCOUNT` | Pega TODO el contenido del archivo JSON (como texto) |
| `FIREBASE_DATABASE_URL` | `https://TU_PROJECT_ID-default-rtdb.firebaseio.com` |

4. Asegúrate de seleccionar: **Production, Preview, Development**
5. Haz clic en **"Save"**

**⚠️ IMPORTANTE:** Nunca subas el archivo JSON al repositorio de GitHub.

---

## 🧪 Paso 6: Probar la Configuración

### Prueba Local

1. Instala dependencias:
```bash
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm start
```

3. Ve a [http://localhost:3000](http://localhost:3000)
4. Navega a **"Vincular Mi Peluche"**
5. Genera un código de peluche
6. Vincula el peluche
7. Verifica en Firebase Console > Realtime Database que se creó el registro

### Estructura Esperada en Firebase

```
nutrias-equilibrio-default-rtdb
│
├── peluches/
│   └── NUTRIA-ABC123/
│       ├── codigo: "NUTRIA-ABC123"
│       ├── nombreUsuario: "Usuario"
│       ├── contactosEmergencia: ["614-123-4567"]
│       ├── umbralAlerta: 70
│       ├── preferenciasSonido: "naturaleza"
│       ├── fechaVinculacion: "2025-11-30T12:00:00.000Z"
│       └── activo: true
│
└── lecturas/
    └── NUTRIA-ABC123/
        ├── -NzAbc123/
        │   ├── presion: 450
        │   ├── timestamp: "2025-11-30T12:34:56.789Z"
        │   ├── fecha: "30/11/2025"
        │   └── hora: "12:34:56"
        └── -NzAbc124/
            └── ...
```

---

## 🚀 Paso 7: Deploy a Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno (Paso 5)
3. Haz deploy
4. Obtén la URL de tu aplicación (ej: `https://nutrias-equilibrio.vercel.app`)
5. Actualiza la URL en el código del ESP32

---

## 📊 Límites del Plan Gratuito de Firebase

| Recurso | Límite Gratuito |
|---------|-----------------|
| **Almacenamiento** | 1 GB |
| **Transferencia** | 10 GB/mes |
| **Conexiones simultáneas** | 100 |
| **Operaciones de lectura** | 50,000/día |
| **Operaciones de escritura** | 20,000/día |

**Para este proyecto:** Con envíos cada 2 segundos, un peluche usaría ~43,200 escrituras/día (dentro del límite si tienes pocos peluches).

---

## 🔐 Seguridad (Producción)

### Reglas de Seguridad Mejoradas

Para producción, actualiza las reglas:

```json
{
  "rules": {
    "peluches": {
      "$pelucheId": {
        ".read": true,
        ".write": "!data.exists() || data.child('codigo').val() === $pelucheId"
      }
    },
    "lecturas": {
      "$pelucheId": {
        ".read": true,
        ".write": "root.child('peluches').child($pelucheId).exists()"
      }
    }
  }
}
```

Esto permite:
- ✅ Cualquiera puede leer datos
- ✅ Solo se puede crear un peluche nuevo
- ✅ Solo se pueden agregar lecturas a peluches existentes
- ❌ No se pueden modificar peluches existentes (a menos que sean nuevos)

---

## 🛠️ Troubleshooting

### Error: "Permission denied"
- Verifica las reglas de seguridad en Firebase Console
- Asegúrate de que estén en modo "test" durante desarrollo

### Error: "Firebase: No Firebase App '[DEFAULT]' has been created"
- Verifica que `firebaseConfig.js` esté correctamente importado
- Revisa que las credenciales sean correctas

### Error: "CORS policy"
- Asegúrate de que el endpoint `/api/sensor-data` tenga headers CORS configurados
- Verifica que la URL del API en el ESP32 sea correcta

### Base de datos no se actualiza
- Revisa las reglas de seguridad
- Verifica la URL de `databaseURL` en la configuración
- Checa el Monitor Serial del ESP32 para ver errores HTTP

---

## 📚 Recursos Adicionales

- [Documentación de Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Reglas de Seguridad](https://firebase.google.com/docs/database/security)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

---

**¡Listo! Firebase está configurado correctamente 🔥**
