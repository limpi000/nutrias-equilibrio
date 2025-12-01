"""
Nutrias en Equilibrio - ESP32 con MicroPython
Sensor: Potenciómetro (luego FSR)

Este código lee datos del potenciómetro y los envía a la API web
para detectar crisis de ansiedad.

INSTRUCCIONES:
1. Instala MicroPython en tu ESP32
2. Edita las configuraciones WiFi y código del peluche abajo
3. Sube este archivo como main.py al ESP32
4. Reinicia el ESP32 y abre el REPL para ver los mensajes
"""

import network
import time
import ujson
import urequests
from machine import ADC, Pin

# ========== CONFIGURACIÓN ==========
# WiFi - EDITA ESTO
WIFI_SSID = "TU_WIFI_AQUI"
WIFI_PASSWORD = "TU_PASSWORD_AQUI"

# API - URL de producción (NO CAMBIAR)
API_URL = "https://nutrias-equilibrio.vercel.app/api/sensor-data"

# Peluche - EDITA ESTO
PELUCHE_ID = "NUTRIA-XXXXXX"  # ⚠️ CAMBIAR por el código que generaste en la web

# Hardware
SENSOR_PIN = 34  # GPIO 34 para leer el potenciómetro/FSR
LED_PIN = 2      # LED integrado del ESP32

# Configuración de envío
INTERVALO_ENVIO = 2  # Segundos entre cada envío
UMBRAL_MINIMO = 50   # No enviar si presión < 50

# ========== CONFIGURAR HARDWARE ==========
# ADC para leer el sensor (12 bits: 0-4095)
sensor = ADC(Pin(SENSOR_PIN))
sensor.atten(ADC.ATTN_11DB)  # Rango completo: 0-3.3V
sensor.width(ADC.WIDTH_12BIT)  # Resolución de 12 bits

# LED integrado
led = Pin(LED_PIN, Pin.OUT)

# ========== FUNCIONES ==========

def parpadear_led(veces=1, duracion=0.1):
    """Parpadear el LED"""
    for _ in range(veces):
        led.on()
        time.sleep(duracion)
        led.off()
        time.sleep(duracion)

def conectar_wifi():
    """Conectar a WiFi"""
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)

    if wlan.isconnected():
        print("✓ Ya conectado a WiFi")
        print(f"IP: {wlan.ifconfig()[0]}")
        return wlan

    print(f"Conectando a WiFi: {WIFI_SSID}")
    wlan.connect(WIFI_SSID, WIFI_PASSWORD)

    # Esperar conexión (máximo 10 segundos)
    intentos = 0
    while not wlan.isconnected() and intentos < 20:
        print(".", end="")
        time.sleep(0.5)
        intentos += 1

    print()

    if wlan.isconnected():
        print("✓ WiFi conectado!")
        print(f"IP: {wlan.ifconfig()[0]}")
        parpadear_led(2, 0.1)
        return wlan
    else:
        print("✗ No se pudo conectar a WiFi")
        print("Reiniciando en 5 segundos...")
        time.sleep(5)
        machine.reset()

def leer_sensor():
    """
    Leer el sensor (potenciómetro o FSR)
    Retorna valor entre 0-1023 (compatible con Arduino)
    """
    valor_raw = sensor.read()  # 0-4095 (12 bits)
    # Mapear a 0-1023 (10 bits) para compatibilidad
    valor = int(valor_raw * 1023 / 4095)
    return valor

def enviar_datos(presion):
    """
    Enviar datos a la API de Vercel
    Retorna True si fue exitoso, False si hubo error
    """
    try:
        # Crear JSON
        datos = {
            "pelucheId": PELUCHE_ID,
            "presion": presion
        }

        json_data = ujson.dumps(datos)

        # Enviar POST request
        headers = {"Content-Type": "application/json"}
        response = urequests.post(API_URL, data=json_data, headers=headers)

        # Verificar respuesta
        if response.status_code == 200:
            print(f" [HTTP {response.status_code}] ", end="")
            response.close()
            return True
        else:
            print(f" [HTTP {response.status_code}] Error: {response.text}", end="")
            response.close()
            return False

    except Exception as e:
        print(f" Error de conexión: {e}", end="")
        return False

def main():
    """Función principal"""
    print("\n" + "="*50)
    print("  Nutrias en Equilibrio - ESP32 MicroPython")
    print("="*50)
    print(f"Peluche ID: {PELUCHE_ID}")
    print(f"API URL: {API_URL}")
    print(f"Pin del sensor: GPIO {SENSOR_PIN}")
    print("="*50 + "\n")

    # Conectar a WiFi
    wlan = conectar_wifi()

    print("\n🦦 Iniciando monitoreo...\n")

    ultimo_envio = time.time()

    # Loop principal
    while True:
        try:
            # Leer sensor
            presion = leer_sensor()
            print(f"Presión: {presion}", end="")

            # Verificar si es tiempo de enviar
            tiempo_actual = time.time()
            if tiempo_actual - ultimo_envio >= INTERVALO_ENVIO:

                # Solo enviar si presión > umbral
                if presion >= UMBRAL_MINIMO:
                    # Verificar conexión WiFi
                    if not wlan.isconnected():
                        print(" (WiFi desconectado, reconectando...)")
                        wlan = conectar_wifi()

                    # Enviar datos
                    if enviar_datos(presion):
                        print("✓ Enviado")
                        parpadear_led(1, 0.1)
                    else:
                        print("✗ Error al enviar")
                        parpadear_led(3, 0.2)
                else:
                    print(" (no enviado - presión baja)")

                ultimo_envio = tiempo_actual
            else:
                print()

            # Esperar 500ms antes de la siguiente lectura
            time.sleep(0.5)

        except KeyboardInterrupt:
            print("\n\n⏸️  Programa detenido por el usuario")
            break
        except Exception as e:
            print(f"\n⚠️  Error inesperado: {e}")
            time.sleep(1)

# ========== EJECUTAR ==========
if __name__ == "__main__":
    main()
