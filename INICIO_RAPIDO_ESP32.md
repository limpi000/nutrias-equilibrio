# 🚀 Inicio Rápido - ESP32

**Todo está configurado y listo. Solo necesitas configurar el ESP32.**

---

## 📋 Lo Que Necesitas

### Hardware
- **ESP32** (cualquier modelo)
- **Sensor FSR** (Force Sensitive Resistor)
- **Resistencia 10kΩ**
- **Cables jumper**
- **Cable USB** para programar

### Software
- **Arduino IDE** instalado
- **Librería ArduinoJson** (se instala desde Arduino IDE)

---

## 🔌 Paso 1: Conectar el Hardware

### Diagrama Simple
```
ESP32                    Sensor FSR

GPIO 34 ─────┬────── FSR ────── 3.3V
             │
             └────── Resistencia 10kΩ ────── GND
```

### Conexiones
1. **Pin 1 del FSR** → **3.3V del ESP32**
2. **Pin 2 del FSR** → **GPIO 34 del ESP32** Y **Resistencia 10kΩ**
3. **Otro extremo de la resistencia** → **GND del ESP32**

---

## 💻 Paso 2: Instalar Arduino IDE y Configurarlo

### 2.1 Descargar Arduino IDE
https://www.arduino.cc/en/software

### 2.2 Agregar soporte para ESP32
1. Abrir Arduino IDE
2. **File** → **Preferences**
3. En "Additional Board Manager URLs" pegar:
   ```
   https://dl.espressif.com/dl/package_esp32_index.json
   ```
4. Click **OK**
5. **Tools** → **Board** → **Boards Manager**
6. Buscar "ESP32" e instalar **"ESP32 by Espressif Systems"**

### 2.3 Instalar librería ArduinoJson
1. **Sketch** → **Include Library** → **Manage Libraries**
2. Buscar: **ArduinoJson**
3. Instalar versión **6.x**

---

## 📝 Paso 3: Configurar y Subir el Código

### 3.1 Abrir el código
En Arduino IDE:
- **File** → **Open**
- Buscar el archivo: **`ESP32_CODE.ino`** (en la carpeta del proyecto)

### 3.2 Editar 3 líneas (IMPORTANTE)

Busca estas líneas al inicio del código y cámbiala:

```cpp
// LÍNEA 16 - Tu WiFi
const char* ssid = "TU_WIFI_AQUI";

// LÍNEA 17 - Tu contraseña WiFi
const char* password = "TU_PASSWORD_AQUI";

// LÍNEA 23 - Tu código de peluche
const char* pelucheId = "NUTRIA-XXXXXX";  // El código que generaste en la web
```

**Ejemplo:**
```cpp
const char* ssid = "MiCasa2.4G";
const char* password = "mipassword123";
const char* pelucheId = "NUTRIA-A1B2C3";
```

⚠️ **IMPORTANTE:** La URL del API ya está configurada correctamente:
```cpp
const char* apiURL = "https://nutrias-equilibrio.vercel.app/api/sensor-data";
```
**NO la cambies.**

### 3.3 Conectar el ESP32 por USB

Conecta el ESP32 a tu computadora con un cable USB.

### 3.4 Seleccionar la placa y puerto

1. **Tools** → **Board** → **ESP32 Arduino** → **ESP32 Dev Module**
   (Si tienes otro modelo de ESP32, selecciona el tuyo)

2. **Tools** → **Port** → Selecciona el puerto COM
   - Windows: `COM3`, `COM4`, etc.
   - Mac: `/dev/cu.usbserial-xxxxx`
   - Linux: `/dev/ttyUSB0`

### 3.5 Subir el código

1. Click en el botón **Upload** (flecha →)
2. Espera a que compile y suba (tarda ~30 segundos)
3. Verás: "Hard resetting via RTS pin..." cuando termine

---

## 🧪 Paso 4: Probar que Funciona

### 4.1 Abrir Serial Monitor
1. **Tools** → **Serial Monitor**
2. Configurar velocidad: **115200 baud** (abajo a la derecha)

### 4.2 Verificar la salida

Deberías ver algo así:
```
=== Nutrias en Equilibrio - ESP32 ===
Peluche ID: NUTRIA-A1B2C3
API URL: https://nutrias-equilibrio.vercel.app/api/sensor-data
Conectando a WiFi.....
✓ WiFi conectado!
IP: 192.168.1.100
Presión: 0
Presión: 0
```

### 4.3 Probar presionando el sensor

Presiona el sensor FSR con el dedo:
```
Presión: 450 ✓ Enviado
Presión: 520 ✓ Enviado
Presión: 35 (no enviado - presión baja)
```

✅ **Si ves "✓ Enviado"** = ¡FUNCIONA!

---

## 🌐 Paso 5: Ver los Datos en la Web

1. Ve a: **https://nutrias-equilibrio.vercel.app**
2. Click en **"🎛️ Monitoreo"**
3. Ingresa tu código de peluche
4. ¡Deberías ver la presión en tiempo real!

También puedes ir a **"📊 Dashboard"** para ver gráficas.

---

## 🐛 Solución de Problemas

### ❌ "No se pudo conectar a WiFi"
- Verifica que el nombre del WiFi sea correcto
- Asegúrate de usar la red de 2.4 GHz (el ESP32 NO soporta 5 GHz)
- Revisa que la contraseña sea correcta

### ❌ "HTTP 404 - Peluche no encontrado"
- Ve a la web y vincula el peluche primero
- Asegúrate de usar el código correcto en el ESP32

### ❌ "HTTP 400 - Código inválido"
- Verifica que el código tenga el formato: `NUTRIA-XXXXXX`
- Revisa que no haya espacios al inicio o final

### ❌ El sensor siempre marca 0
- Verifica las conexiones del sensor
- Asegúrate de que el FSR esté conectado a GPIO 34
- Prueba presionar el sensor con más fuerza

### ❌ No compila / Errores de librería
```bash
# Reinstala la librería ArduinoJson
Sketch → Include Library → Manage Libraries
Buscar "ArduinoJson" → Desinstalar → Instalar versión 6.21.4
```

---

## 📊 Códigos de Estado HTTP

| Código | Significado | Solución |
|--------|-------------|----------|
| 200 | ✅ Éxito | Todo funciona bien |
| 400 | ❌ Código inválido | Verifica el formato NUTRIA-XXXXXX |
| 404 | ❌ Peluche no encontrado | Vincula el peluche en la web primero |
| 500 | ❌ Error del servidor | Contacta soporte |

---

## 🎯 Resumen del Flujo Completo

1. ✅ Conectar hardware (FSR al ESP32)
2. ✅ Instalar Arduino IDE + ESP32 + ArduinoJson
3. ✅ Editar WiFi y código del peluche en `ESP32_CODE.ino`
4. ✅ Subir código al ESP32
5. ✅ Verificar en Serial Monitor que se conecta
6. ✅ Presionar sensor y ver datos enviados
7. ✅ Ver datos en la web (Monitoreo o Dashboard)

---

## 📞 ¿Necesitas Ayuda?

- **Guía completa:** Lee `ESP32_SETUP.md` (tiene más detalles)
- **Calibración del sensor:** Revisa la sección de calibración en `ESP32_SETUP.md`
- **Problemas con Firebase:** Lee `FIREBASE_SETUP.md`

---

**🦦 ¡Listo! Tu peluche Nutrias en Equilibrio está funcionando 💚**

---

## 🔗 Links Útiles

- **Web de producción:** https://nutrias-equilibrio.vercel.app
- **API Endpoint:** https://nutrias-equilibrio.vercel.app/api/sensor-data
- **Firebase Console:** https://console.firebase.google.com/project/nutrias-equilibrio
- **Vercel Dashboard:** https://vercel.com/dashboard
