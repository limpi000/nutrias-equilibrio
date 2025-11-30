# 🎛️ Configuración del ESP32 para Nutrias en Equilibrio

Esta guía te ayudará a configurar tu ESP32 para enviar datos del sensor FSR a la aplicación web.

---

## 📋 Requisitos

### Hardware
- **ESP32** (cualquier modelo con WiFi)
- **Sensor FSR** (Force Sensitive Resistor)
- **Resistencia de 10kΩ** (para divisor de voltaje)
- **Cables jumper**
- **Protoboard** (opcional pero recomendado)

### Software
- **Arduino IDE** 1.8.x o superior (o PlatformIO)
- **Librería HTTPClient** (incluida en ESP32)
- **Librería WiFi** (incluida en ESP32)
- **Librería ArduinoJson** (instalar desde Library Manager)

---

## 🔌 Conexión del Hardware

### Diagrama de Conexión FSR

```
ESP32                FSR Sensor

3.3V ----+
         |
         +---- FSR ----+---- GND
                       |
                       +---- Resistencia 10kΩ ---- GND
                       |
GPIO 34 (ADC) --------+
```

### Pines Recomendados
- **FSR Signal:** GPIO 34 (ADC1_CH6) - Pin analógico
- **VCC:** 3.3V del ESP32
- **GND:** GND del ESP32

**Nota:** El ESP32 tiene ADC de 12 bits (valores 0-4095), pero usaremos 0-1023 para compatibilidad con Arduino estándar.

---

## 🌐 Protocolo de Comunicación

### Método: HTTP POST
- **URL del API:** `https://tu-app.vercel.app/api/sensor-data`
- **Método:** POST
- **Content-Type:** application/json

### Formato del Request

```json
{
  "pelucheId": "NUTRIA-ABC123",
  "presion": 450
}
```

### Parámetros

| Parámetro | Tipo | Rango | Descripción |
|-----------|------|-------|-------------|
| `pelucheId` | String | NUTRIA-XXXXXX | Código único del peluche (6 caracteres alfanuméricos) |
| `presion` | Number | 0-1023 | Valor de presión del sensor FSR |

### Respuestas del API

#### ✅ Éxito (200 OK)
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

#### ❌ Peluche no vinculado (404 Not Found)
```json
{
  "success": false,
  "error": "Peluche no encontrado. Por favor vincúlalo primero en la aplicación web."
}
```

#### ❌ Código inválido (400 Bad Request)
```json
{
  "success": false,
  "error": "Código de peluche inválido. Formato esperado: NUTRIA-XXXXXX"
}
```

---

## 💻 Código Arduino para ESP32

### Versión Completa

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ========== CONFIGURACIÓN ==========
// WiFi
const char* ssid = "TU_WIFI_SSID";
const char* password = "TU_WIFI_PASSWORD";

// API
const char* apiURL = "https://tu-app.vercel.app/api/sensor-data";
const char* pelucheId = "NUTRIA-ABC123";  // ⚠️ CAMBIAR POR TU CÓDIGO

// Hardware
const int FSR_PIN = 34;  // GPIO 34 (ADC)
const int LED_PIN = 2;   // LED integrado (opcional)

// Configuración de envío
const int INTERVALO_ENVIO = 2000;  // Enviar cada 2 segundos
const int UMBRAL_MINIMO = 50;      // No enviar si presión < 50

unsigned long ultimoEnvio = 0;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);

  Serial.println("\n=== Nutrias en Equilibrio - ESP32 ===");
  Serial.print("Peluche ID: ");
  Serial.println(pelucheId);

  // Conectar a WiFi
  conectarWiFi();
}

void loop() {
  // Leer sensor FSR
  int presion = analogRead(FSR_PIN);

  // Mapear de 12 bits (0-4095) a 10 bits (0-1023)
  presion = map(presion, 0, 4095, 0, 1023);

  Serial.print("Presión: ");
  Serial.print(presion);

  // Enviar datos al servidor
  if (millis() - ultimoEnvio >= INTERVALO_ENVIO) {
    if (presion >= UMBRAL_MINIMO) {
      if (enviarDatos(presion)) {
        Serial.println(" ✓ Enviado");
        parpadearLED(1, 100);
      } else {
        Serial.println(" ✗ Error al enviar");
        parpadearLED(3, 200);
      }
    } else {
      Serial.println(" (no enviado - presión baja)");
    }
    ultimoEnvio = millis();
  } else {
    Serial.println();
  }

  delay(500);  // Leer sensor cada 500ms
}

void conectarWiFi() {
  Serial.print("Conectando a WiFi");
  WiFi.begin(ssid, password);

  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 20) {
    delay(500);
    Serial.print(".");
    intentos++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✓ WiFi conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n✗ No se pudo conectar a WiFi");
    Serial.println("Reiniciando en 5 segundos...");
    delay(5000);
    ESP.restart();
  }
}

bool enviarDatos(int presion) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado. Reconectando...");
    conectarWiFi();
    return false;
  }

  HTTPClient http;
  http.begin(apiURL);
  http.addHeader("Content-Type", "application/json");

  // Crear JSON
  StaticJsonDocument<200> doc;
  doc["pelucheId"] = pelucheId;
  doc["presion"] = presion;

  String jsonString;
  serializeJson(doc, jsonString);

  // Enviar POST request
  int httpCode = http.POST(jsonString);

  bool exito = false;
  if (httpCode > 0) {
    if (httpCode == 200) {
      String response = http.getString();
      Serial.print(" [HTTP ");
      Serial.print(httpCode);
      Serial.print("] ");
      exito = true;
    } else {
      Serial.print(" [HTTP ");
      Serial.print(httpCode);
      Serial.print("] Error: ");
      Serial.print(http.getString());
      exito = false;
    }
  } else {
    Serial.print(" Error de conexión: ");
    Serial.print(http.errorToString(httpCode));
    exito = false;
  }

  http.end();
  return exito;
}

void parpadearLED(int veces, int duracion) {
  for (int i = 0; i < veces; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(duracion);
    digitalWrite(LED_PIN, LOW);
    delay(duracion);
  }
}
```

---

## 🚀 Instrucciones de Instalación

### Paso 1: Instalar Arduino IDE y ESP32
1. Descargar Arduino IDE desde [arduino.cc](https://www.arduino.cc/en/software)
2. Agregar soporte para ESP32:
   - Ir a `File > Preferences`
   - En "Additional Board Manager URLs" agregar:
     ```
     https://dl.espressif.com/dl/package_esp32_index.json
     ```
   - Ir a `Tools > Board > Boards Manager`
   - Buscar "ESP32" e instalar

### Paso 2: Instalar Librerías
1. Ir a `Sketch > Include Library > Manage Libraries`
2. Buscar e instalar:
   - **ArduinoJson** (versión 6.x)

### Paso 3: Configurar el Código
1. Abrir el código en Arduino IDE
2. **Cambiar estos valores:**
   ```cpp
   const char* ssid = "TU_WIFI_SSID";           // Nombre de tu WiFi
   const char* password = "TU_WIFI_PASSWORD";   // Contraseña de tu WiFi
   const char* apiURL = "https://tu-app.vercel.app/api/sensor-data";  // URL de tu app
   const char* pelucheId = "NUTRIA-ABC123";     // Código de tu peluche
   ```

### Paso 4: Subir el Código
1. Conectar el ESP32 por USB
2. Seleccionar:
   - `Tools > Board > ESP32 Dev Module` (o tu modelo)
   - `Tools > Port > COM3` (o el puerto correspondiente)
3. Presionar el botón **Upload** (→)
4. Abrir el Monitor Serial (`Tools > Serial Monitor`) a 115200 baud

---

## 🧪 Pruebas

### Verificar Conexión WiFi
El monitor serial debe mostrar:
```
=== Nutrias en Equilibrio - ESP32 ===
Peluche ID: NUTRIA-ABC123
Conectando a WiFi.....
✓ WiFi conectado!
IP: 192.168.1.100
```

### Verificar Envío de Datos
Al presionar el peluche:
```
Presión: 450 ✓ Enviado
Presión: 520 ✓ Enviado
Presión: 35 (no enviado - presión baja)
```

### Códigos de Error Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| HTTP 404 | Peluche no vinculado | Vincular peluche en la web primero |
| HTTP 400 | Código inválido | Verificar formato NUTRIA-XXXXXX |
| HTTP 500 | Error del servidor | Revisar configuración de Firebase |
| -1 | No hay internet | Verificar WiFi |
| -11 | Timeout | Mejorar señal WiFi |

---

## 📊 Frecuencia de Envío Recomendada

| Uso | Intervalo | Razón |
|-----|-----------|-------|
| **Producción** | 2-5 segundos | Balance entre respuesta y batería |
| **Desarrollo** | 1 segundo | Pruebas rápidas |
| **Batería** | 10 segundos | Máxima duración |

**Nota:** Firebase tiene límites gratuitos de:
- 50,000 lecturas/día
- 20,000 escrituras/día
- 1 GB almacenamiento

---

## 🔋 Optimización de Batería

### Modo Deep Sleep (Opcional)

```cpp
#include <esp_sleep.h>

// En loop, después de enviar datos:
esp_sleep_enable_timer_wakeup(5 * 1000000); // 5 segundos
esp_deep_sleep_start();
```

**Advertencia:** En deep sleep, el ESP32 se reinicia al despertar.

---

## 🛠️ Calibración del Sensor FSR

Ejecuta este código para calibrar:

```cpp
void setup() {
  Serial.begin(115200);
  pinMode(FSR_PIN, INPUT);
}

void loop() {
  int presion = analogRead(FSR_PIN);
  presion = map(presion, 0, 4095, 0, 1023);

  Serial.print("Presión: ");
  Serial.print(presion);

  if (presion < 50) Serial.println(" [Nada]");
  else if (presion < 200) Serial.println(" [Leve]");
  else if (presion < 500) Serial.println(" [Moderada]");
  else if (presion < 800) Serial.println(" [Fuerte]");
  else Serial.println(" [Muy Fuerte]");

  delay(100);
}
```

---

## 🔐 Seguridad

### Consideraciones
- **No** incluir credenciales WiFi en repositorios públicos
- Usar variables de entorno en producción
- Configurar reglas de seguridad en Firebase:

```json
{
  "rules": {
    "peluches": {
      "$pelucheId": {
        ".read": true,
        ".write": "newData.child('codigo').val() === $pelucheId"
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

---

## 📞 Soporte

Si tienes problemas:
1. Verifica las conexiones del hardware
2. Revisa el Monitor Serial para errores
3. Comprueba que el peluche esté vinculado en la web
4. Asegúrate de que la URL del API sea correcta

---

## 🎯 Próximos Pasos

1. ✅ Conectar el hardware
2. ✅ Subir el código al ESP32
3. ✅ Vincular el peluche en la aplicación web
4. ✅ Verificar que los datos lleguen al Dashboard
5. ✅ Ajustar el umbral de alerta según necesites

---

**¡Listo! Tu peluche Nutria en Equilibrio está conectado 🦦💚**
