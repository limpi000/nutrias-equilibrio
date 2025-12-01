# 🎵 Sonidos Relajantes para Nutrias en Equilibrio

Esta carpeta contiene los archivos de audio MP3 que se reproducen durante crisis de ansiedad.

## Archivos Necesarios

Agrega los siguientes archivos MP3 a esta carpeta:

1. **naturaleza.mp3** - Sonidos de naturaleza (lluvia, pájaros, río)
2. **olas.mp3** - Sonidos de olas del mar
3. **respiracion.mp3** - Guía de respiración 4-7-8
4. **piano.mp3** - Música instrumental relajante

## ¿Dónde conseguir sonidos gratuitos?

### Sitios Recomendados (Libres de Derechos)
- **Freesound.org** - https://freesound.org/
- **YouTube Audio Library** - https://www.youtube.com/audiolibrary
- **Pixabay Music** - https://pixabay.com/music/
- **Incompetech** - https://incompetech.com/music/

### Búsquedas Sugeridas
- "rain sounds relaxing"
- "ocean waves calm"
- "breathing exercise 4-7-8"
- "calm piano instrumental"
- "forest ambient sounds"

## Formato Recomendado

- **Formato:** MP3
- **Bitrate:** 128-192 kbps (para web)
- **Duración:** 3-10 minutos (se reproduce en loop)
- **Volumen:** Normalizado, sin picos

## Conversión de Archivos

Si tienes archivos en otro formato (WAV, M4A, etc.), puedes convertirlos con:

### Opción 1: Online
- **Online Audio Converter** - https://online-audio-converter.com/

### Opción 2: FFmpeg (Command Line)
```bash
ffmpeg -i input.wav -b:a 192k naturaleza.mp3
```

## Ejemplo de Uso en el Código

Los archivos se referencian en `/src/soundManager.js`:

```javascript
naturaleza: {
  nombre: 'Sonidos de Naturaleza',
  archivo: '/sounds/naturaleza.mp3',
  duracion: 300
}
```

## Notas Importantes

⚠️ **Derechos de Autor:** Asegúrate de usar solo música libre de derechos o con licencia apropiada.

✅ **Tamaño de Archivos:** Mantén los archivos pequeños (< 5 MB cada uno) para carga rápida.

🎧 **Calidad:** Usa audios de calidad pero optimizados para web.

## Alternativa: Videos de YouTube

Si no tienes archivos MP3, la aplicación también soporta videos de YouTube embebidos (ver `/src/soundManager.js` para configurar los IDs de video).
