# 🐍 Guía MicroPython - ESP32 con Potenciómetro/FSR

**Configuración completa para ESP32 con MicroPython**

---

## 📋 Lo Que Necesitas

### Hardware
- **ESP32** (cualquier modelo)
- **Potenciómetro** (luego será sensor FSR)
- **Cables jumper**
- **Cable USB** para programar

### Software
- **Python 3.x** instalado en tu computadora
- **esptool** (para flashear MicroPython)
- **Thonny IDE** (recomendado) o **ampy**

---

## 🔌 Paso 1: Conectar el Hardware

### Potenciómetro → ESP32

```
Potenciómetro         ESP32

Pin 1 (VCC)    →     3.3V
Pin 2 (Signal) →     GPIO 34
Pin 3 (GND)    →     GND
```

**Nota:** Cuando uses FSR, la conexión es la misma pero necesitas una resistencia de 10kΩ:
```
ESP32 GPIO 34 ─┬─── FSR ──── 3.3V
               │
               └─── Resistencia 10kΩ ──── GND
```

---

## 💻 Paso 2: Instalar MicroPython en el ESP32

### 2.1 Instalar esptool (desde Python)

Abre una terminal/CMD y ejecuta:
```bash
pip install esptool
```

### 2.2 Descargar el firmware de MicroPython

Ve a: https://micropython.org/download/esp32/

Descarga el archivo más reciente (por ejemplo: `esp32-20231005-v1.21.0.bin`)

### 2.3 Borrar la flash del ESP32

**Conecta el ESP32 por USB** y ejecuta:

**Windows:**
```bash
esptool.py --chip esp32 --port COM3 erase_flash
```

**Mac/Linux:**
```bash
esptool.py --chip esp32 --port /dev/ttyUSB0 erase_flash
```

**Nota:** Reemplaza `COM3` o `/dev/ttyUSB0` con tu puerto. Para ver los puertos:
- Windows: `mode` en CMD
- Mac/Linux: `ls /dev/tty.*`

### 2.4 Flashear MicroPython

**Windows:**
```bash
esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 esp32-20231005-v1.21.0.bin
```

**Mac/Linux:**
```bash
esptool.py --chip esp32 --port /dev/ttyUSB0 --baud 460800 write_flash -z 0x1000 esp32-20231005-v1.21.0.bin
```

**Nota:** Reemplaza el nombre del archivo `.bin` con el que descargaste.

Deberías ver:
```
Writing at 0x00001000... (100%)
Wrote 1648640 bytes (...)
Hash of data verified.
Leaving...
Hard resetting via RTS pin...
```

✅ **¡MicroPython instalado!**

---

## 🛠️ Paso 3: Instalar Thonny IDE (Recomendado)

### 3.1 Descargar Thonny

Ve a: https://thonny.org/

Descarga e instala para tu sistema operativo.

### 3.2 Configurar Thonny para ESP32

1. Abre Thonny
2. **Run** → **Select interpreter**
3. Selecciona: **MicroPython (ESP32)**
4. Puerto: Selecciona tu puerto COM/USB
5. Click **OK**

En la parte inferior deberías ver:
```
MicroPython v1.21.0 on 2023-10-05; ESP32 module with ESP32
>>>
```

✅ **Thonny está conectado al ESP32**

---

## 📝 Paso 4: Configurar y Subir el Código

### 4.1 Abrir el archivo main.py

En Thonny:
1. **File** → **Open**
2. Busca el archivo: **`main.py`** (en la carpeta del proyecto)

O copia el código desde el archivo `main.py`.

### 4.2 Editar la configuración (IMPORTANTE)

Busca estas líneas al inicio del código y edítalas:

```python
# LÍNEA 18 - Tu WiFi
WIFI_SSID = "TU_WIFI_AQUI"

# LÍNEA 19 - Tu contraseña WiFi
WIFI_PASSWORD = "TU_PASSWORD_AQUI"

# LÍNEA 25 - Tu código de peluche
PELUCHE_ID = "NUTRIA-XXXXXX"  # El código que generaste en la web
```

**Ejemplo:**
```python
WIFI_SSID = "MiCasa2.4G"
WIFI_PASSWORD = "mipassword123"
PELUCHE_ID = "NUTRIA-A1B2C3"
```

⚠️ **IMPORTANTE:** La URL del API ya está configurada:
```python
API_URL = "https://nutrias-equilibrio.vercel.app/api/sensor-data"
```
**NO la cambies.**

### 4.3 Guardar en el ESP32

1. **File** → **Save as...**
2. Selecciona: **MicroPython device**
3. Nombre del archivo: **`main.py`**
4. Click **OK**

✅ **El código se ejecutará automáticamente al encender el ESP32**

---

## 🧪 Paso 5: Probar que Funciona

### 5.1 Ejecutar el código

En Thonny, click en el botón **▶️ Run** (o F5)

Deberías ver en la consola:

```
==================================================
  Nutrias en Equilibrio - ESP32 MicroPython
==================================================
Peluche ID: NUTRIA-A1B2C3
API URL: https://nutrias-equilibrio.vercel.app/api/sensor-data
Pin del sensor: GPIO 34
==================================================

Conectando a WiFi: MiCasa2.4G
..........
✓ WiFi conectado!
IP: 192.168.1.100

🦦 Iniciando monitoreo...

Presión: 0
Presión: 0 (no enviado - presión baja)
```

### 5.2 Probar girando el potenciómetro

Gira el potenciómetro para cambiar el valor:

```
Presión: 450 [HTTP 200] ✓ Enviado
Presión: 520 [HTTP 200] ✓ Enviado
Presión: 35 (no enviado - presión baja)
```

✅ **Si ves "✓ Enviado"** = ¡FUNCIONA!

---

## 🌐 Paso 6: Ver los Datos en la Web

1. Ve a: **https://nutrias-equilibrio.vercel.app**
2. Click en **"🎛️ Monitoreo"**
3. Ingresa tu código de peluche
4. **¡Deberías ver la presión en tiempo real!**

También puedes ir a **"📊 Dashboard"** para ver gráficas.

---

## 🔧 Comandos Útiles en el REPL

Si quieres probar cosas manualmente, abre el REPL de Thonny y ejecuta:

### Ver información del sistema
```python
import sys
sys.implementation
```

### Probar WiFi manualmente
```python
import network
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("TU_WIFI", "TU_PASSWORD")
wlan.isconnected()
wlan.ifconfig()
```

### Probar lectura del sensor
```python
from machine import ADC, Pin
sensor = ADC(Pin(34))
sensor.atten(ADC.ATTN_11DB)
sensor.read()  # Valor entre 0-4095
```

### Probar envío de datos
```python
import urequests
import ujson

datos = {
    "pelucheId": "NUTRIA-ABC123",
    "presion": 100
}

response = urequests.post(
    "https://nutrias-equilibrio.vercel.app/api/sensor-data",
    data=ujson.dumps(datos),
    headers={"Content-Type": "application/json"}
)

print(response.text)
response.close()
```

---

## 🐛 Solución de Problemas

### ❌ "No se pudo conectar a WiFi"
- **Causa:** Nombre o contraseña incorrectos
- **Solución:**
  - Verifica que el SSID sea exacto (distingue mayúsculas/minúsculas)
  - Asegúrate de usar WiFi de **2.4 GHz** (ESP32 no soporta 5 GHz)
  - Comprueba que la contraseña sea correcta

### ❌ "ImportError: no module named 'urequests'"
- **Causa:** El módulo urequests no está instalado en el ESP32
- **Solución:**
  ```python
  # En el REPL de Thonny:
  import mip
  mip.install("urequests")
  ```

### ❌ "OSError: [Errno 103] ECONNABORTED"
- **Causa:** Problema de conexión a internet o API
- **Solución:**
  - Verifica que el ESP32 esté conectado a WiFi
  - Prueba hacer ping desde tu computadora: `ping nutrias-equilibrio.vercel.app`
  - Revisa que la URL del API sea correcta

### ❌ "HTTP 404 - Peluche no encontrado"
- **Causa:** El peluche no está vinculado en la web
- **Solución:**
  - Ve a https://nutrias-equilibrio.vercel.app
  - Vincula el peluche primero en la sección "Vincular Mi Peluche"
  - Usa el código correcto en el ESP32

### ❌ El sensor siempre marca 0 o 4095
- **Causa:** Conexión incorrecta o pin equivocado
- **Solución:**
  - Verifica las conexiones del potenciómetro
  - Asegúrate de usar GPIO 34
  - Prueba con otro pin ADC (32, 33, 35, 36)

### ❌ No puedo flashear el ESP32
- **Causa:** El ESP32 no entra en modo bootloader
- **Solución:**
  1. Desconecta el ESP32
  2. Mantén presionado el botón **BOOT**
  3. Conecta el USB mientras mantienes BOOT presionado
  4. Suelta BOOT
  5. Intenta flashear de nuevo

---

## 📊 Estructura del Código

```python
main.py
├── Configuración (WiFi, API, Peluche)
├── Configurar hardware (ADC, LED)
├── Funciones:
│   ├── parpadear_led()
│   ├── conectar_wifi()
│   ├── leer_sensor()
│   └── enviar_datos()
└── main() - Loop principal
```

---

## 🔄 Reiniciar el ESP32

### Desde código:
```python
import machine
machine.reset()
```

### Desde hardware:
Presiona el botón **EN** o **RST** del ESP32

---

## 💾 Gestión de Archivos en el ESP32

### Ver archivos en el ESP32
En Thonny:
- **View** → **Files**
- Verás dos paneles: tu computadora y el ESP32

### Subir archivos adicionales
Arrastra archivos desde el panel de tu computadora al panel del ESP32.

### Eliminar archivos del ESP32
Click derecho en el archivo → **Delete**

---

## 📈 Optimizaciones

### Reducir consumo de batería (Deep Sleep)
```python
import machine

# Dormir 10 segundos
machine.deepsleep(10000)
```

**Nota:** En deep sleep el ESP32 se reinicia al despertar.

### Aumentar velocidad de envío
```python
INTERVALO_ENVIO = 1  # Enviar cada 1 segundo (en lugar de 2)
```

### Cambiar el umbral mínimo
```python
UMBRAL_MINIMO = 100  # Solo enviar si presión > 100
```

---

## 🔗 Recursos Útiles

- **MicroPython Docs:** https://docs.micropython.org/en/latest/esp32/quickref.html
- **Thonny IDE:** https://thonny.org/
- **esptool:** https://github.com/espressif/esptool
- **Web App:** https://nutrias-equilibrio.vercel.app
- **Firebase Console:** https://console.firebase.google.com/project/nutrias-equilibrio

---

## 🎯 Resumen del Flujo

1. ✅ Flashear MicroPython en el ESP32
2. ✅ Instalar Thonny IDE
3. ✅ Conectar potenciómetro al GPIO 34
4. ✅ Editar WiFi y código del peluche en `main.py`
5. ✅ Guardar `main.py` en el ESP32
6. ✅ Ejecutar y ver datos en el REPL
7. ✅ Verificar datos en la web

---

**🦦 ¡Tu peluche con MicroPython está listo! 💚**
