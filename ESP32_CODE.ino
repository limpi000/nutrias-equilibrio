/*
 * Nutrias en Equilibrio - ESP32 Sensor FSR
 *
 * Este código envía datos del sensor de presión FSR a la aplicación web
 * para detectar crisis de ansiedad.
 *
 * INSTRUCCIONES:
 * 1. Instala la librería ArduinoJson desde el Library Manager
 * 2. Configura tu WiFi y el código del peluche abajo
 * 3. Conecta el sensor FSR al pin 34 del ESP32
 * 4. Sube el código y abre el Serial Monitor (115200 baud)
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ========== CONFIGURACIÓN ==========
// WiFi - EDITA ESTO
const char* ssid = "TU_WIFI_AQUI";              // Nombre de tu red WiFi
const char* password = "TU_PASSWORD_AQUI";       // Contraseña de tu WiFi

// API - URL de producción (NO CAMBIAR)
const char* apiURL = "https://nutrias-equilibrio.vercel.app/api/sensor-data";

// Peluche - EDITA ESTO
const char* pelucheId = "NUTRIA-XXXXXX";  // ⚠️ CAMBIAR por el código que generaste en la web

// Hardware
const int FSR_PIN = 34;  // GPIO 34 (Pin ADC para leer el sensor)
const int LED_PIN = 2;   // LED integrado del ESP32 (opcional)

// Configuración de envío
const int INTERVALO_ENVIO = 2000;  // Enviar cada 2 segundos
const int UMBRAL_MINIMO = 50;      // No enviar si presión < 50

unsigned long ultimoEnvio = 0;

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(FSR_PIN, INPUT);

  Serial.println("\n\n=== Nutrias en Equilibrio - ESP32 ===");
  Serial.print("Peluche ID: ");
  Serial.println(pelucheId);
  Serial.print("API URL: ");
  Serial.println(apiURL);

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
    parpadearLED(2, 100);
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
