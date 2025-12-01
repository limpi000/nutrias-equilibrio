# 🚀 Inicio Rápido - ESP32 con MicroPython

**Todo está configurado y listo. Solo necesitas configurar el ESP32 con MicroPython.**

---

## 📋 Lo Que Necesitas

### Hardware
- **ESP32** (cualquier modelo)
- **Potenciómetro** (luego será sensor FSR)
- **Cables jumper**
- **Cable USB** para programar

### Software
- **Python 3.x** en tu computadora
- **Thonny IDE** (recomendado) - https://thonny.org/

---

## ⚡ Inicio Súper Rápido (5 Pasos)

### 1️⃣ Instalar Thonny
Ve a https://thonny.org/ y descarga Thonny para tu sistema operativo.

### 2️⃣ Flashear MicroPython en el ESP32
1. Conecta el ESP32 por USB
2. Abre Thonny
3. **Run** → **Configure interpreter** → **MicroPython (ESP32)**
4. Click en **Install or update MicroPython**
5. Selecciona tu puerto y click **Install**
6. Espera a que termine (1-2 minutos)

### 3️⃣ Conectar el Potenciómetro
```
Potenciómetro    →    ESP32
Pin 1 (VCC)      →    3.3V
Pin 2 (Signal)   →    GPIO 34
Pin 3 (GND)      →    GND
```

### 4️⃣ Configurar el Código
1. Abre el archivo **`main.py`** (en la carpeta del proyecto)
2. Edita estas 3 líneas:
   ```python
   WIFI_SSID = "TU_WIFI_AQUI"          # Línea 18
   WIFI_PASSWORD = "TU_PASSWORD_AQUI"   # Línea 19
   PELUCHE_ID = "NUTRIA-XXXXXX"         # Línea 25
   ```
3. **File** → **Save as...** → **MicroPython device** → Nombre: `main.py`

### 5️⃣ Ejecutar
1. Click en **▶️ Run** (o F5)
2. Deberías ver en la consola:
   ```
   ✓ WiFi conectado!
   IP: 192.168.1.100
   🦦 Iniciando monitoreo...
   Presión: 0
   ```
3. Gira el potenciómetro y verás:
   ```
   Presión: 450 [HTTP 200] ✓ Enviado
   ```

✅ **¡Funciona!**

---

## 🌐 Ver los Datos en la Web

Ve a: **https://nutrias-equilibrio.vercel.app**
- **🎛️ Monitoreo** → Ver presión en tiempo real
- **📊 Dashboard** → Ver gráficas y estadísticas

---

## 📁 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| **`main.py`** | Código MicroPython listo para usar |
| **`GUIA_MICROPYTHON_ESP32.md`** | Guía completa paso a paso |
| **`ESP32_SETUP.md`** | Documentación técnica detallada |

---

## 🔧 URLs Configuradas

✅ **API Endpoint:** `https://nutrias-equilibrio.vercel.app/api/sensor-data`
✅ **Web App:** `https://nutrias-equilibrio.vercel.app`
✅ **Firebase:** `https://nutrias-equilibrio-default-rtdb.firebaseio.com`

**No necesitas cambiar ninguna URL, todo está listo.**

---

## 🐛 Problemas Comunes

### ❌ No se conecta a WiFi
- Usa WiFi de **2.4 GHz** (ESP32 no soporta 5 GHz)
- Verifica nombre y contraseña exactos

### ❌ "ImportError: no module named 'urequests'"
En Thonny, ve al REPL y ejecuta:
```python
import mip
mip.install("urequests")
```

### ❌ HTTP 404 - Peluche no encontrado
Ve a la web y vincula el peluche primero en **"🦦 Vincular Mi Peluche"**

### ❌ El sensor siempre marca 0
Verifica que el potenciómetro esté conectado a **GPIO 34**

---

## 📊 Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 ✅ | Datos enviados correctamente |
| 400 ❌ | Código de peluche inválido |
| 404 ❌ | Peluche no vinculado en la web |
| 500 ❌ | Error del servidor |

---

## 🎯 Siguiente Paso: Cambiar a FSR

Cuando tengas el sensor FSR, cambia la conexión:

```
ESP32 GPIO 34 ─┬─── FSR ──── 3.3V
               │
               └─── Resistencia 10kΩ ──── GND
```

**El código es el mismo, no necesitas cambiar nada.**

---

## 📞 ¿Necesitas Más Ayuda?

Lee la **guía completa** en: **`GUIA_MICROPYTHON_ESP32.md`**

Incluye:
- Instalación manual de MicroPython
- Comandos del REPL
- Optimizaciones de batería
- Troubleshooting detallado

---

**🦦 ¡Listo! Tu sistema está funcionando con MicroPython 💚**
