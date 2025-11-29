# Configuración de la Encuesta

## Estado Actual

La encuesta está **funcionando** y se puede probar en la sección "Encuesta" del menú. Actualmente, cuando los usuarios envían el formulario:
- ✅ Se valida que todas las preguntas requeridas estén contestadas
- ✅ Se muestra un mensaje de éxito
- ✅ Los datos se imprimen en la consola del navegador (para pruebas)
- ⚠️ **Las respuestas NO se guardan permanentemente** (solo es una simulación)

## Opciones para Guardar Respuestas Reales

### Opción 1: FormSpree (Recomendada - Más Fácil)

**Ventajas:**
- ✅ Gratis para 50 envíos/mes
- ✅ Muy fácil de configurar (solo necesitas un email)
- ✅ Las respuestas llegan por email y se pueden ver en su dashboard
- ✅ No requiere backend

**Pasos:**
1. Ve a [formspree.io](https://formspree.io) y crea una cuenta gratis
2. Crea un nuevo formulario y obtén tu endpoint (algo como `https://formspree.io/f/xxxxxxxx`)
3. En `src/App.js`, línea 232-234, reemplaza el código:

```javascript
// Reemplaza estas líneas:
console.log('Datos de la encuesta:', formData);
setEnviado(true);

// Por esto:
fetch('https://formspree.io/f/TU_ID_AQUI', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => {
  if (response.ok) {
    setEnviado(true);
  } else {
    setError('Hubo un error al enviar la encuesta. Intenta de nuevo.');
  }
})
.catch(() => {
  setError('Error de conexión. Verifica tu internet e intenta de nuevo.');
});
```

---

### Opción 2: Google Forms

**Ventajas:**
- ✅ Totalmente gratis e ilimitado
- ✅ Respuestas se guardan en Google Sheets automáticamente
- ✅ Muy fácil de analizar datos

**Pasos:**
1. Crea un Google Form con las mismas preguntas
2. Obtén el enlace del formulario
3. En `src/App.js`, busca el componente `EncuestaForm` y cambia el botón para que abra el Google Form en una nueva pestaña

---

### Opción 3: GitHub Issues API

**Ventajas:**
- ✅ Gratis e ilimitado
- ✅ Todo queda en tu repositorio de GitHub
- ✅ Fácil de revisar y gestionar

**Desventajas:**
- ⚠️ Las respuestas son públicas (a menos que uses un repo privado)
- ⚠️ Requiere crear un Personal Access Token

**Pasos:**
1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Genera un nuevo token con permisos `repo` (solo para repos privados) o `public_repo`
3. En `src/App.js`, línea 232-234, reemplaza:

```javascript
const token = 'TU_TOKEN_AQUI';
const owner = 'limpi000';
const repo = 'nutrias-equilibrio';

fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
  method: 'POST',
  headers: {
    'Authorization': `token ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: `Encuesta - ${formData.nombre || 'Anónimo'}`,
    body: `
**Pregunta 1:** ${formData.pregunta1}
**Pregunta 2:** ${formData.pregunta2}
**Pregunta 3:** ${formData.pregunta3}
**Pregunta 4:** ${formData.pregunta4}

**Comentarios:**
${formData.comentarios || 'Sin comentarios'}
    `,
    labels: ['encuesta']
  })
})
.then(response => {
  if (response.ok) {
    setEnviado(true);
  } else {
    setError('Error al enviar la encuesta.');
  }
})
.catch(() => {
  setError('Error de conexión.');
});
```

**IMPORTANTE:** No subas el token a GitHub. Usa variables de entorno.

---

### Opción 4: EmailJS

**Ventajas:**
- ✅ Envía emails directamente desde el navegador
- ✅ Gratis para 200 emails/mes
- ✅ No requiere backend

**Pasos:**
1. Ve a [emailjs.com](https://www.emailjs.com) y crea una cuenta
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Instala EmailJS: `npm install @emailjs/browser`
4. Sigue la documentación de EmailJS para configurar el envío

---

## Preguntas de la Encuesta

Actualmente la encuesta incluye:

1. **Nombre** (opcional)
2. **¿Cómo calificarías el taller en general?** (Excelente / Muy bueno / Bueno / Regular / Malo)
3. **¿Las actividades del taller fueron útiles para ti?** (Muy útiles / Útiles / Poco útiles / No fueron útiles)
4. **¿Te sentiste cómodo/a durante el taller?** (Muy cómodo/a / Cómodo/a / Neutral / Incómodo/a)
5. **¿Recomendarías este taller a otras personas?** (Definitivamente sí / Probablemente sí / No estoy seguro/a / Probablemente no / Definitivamente no)
6. **Comentarios adicionales** (campo de texto libre)

## Personalización

Si quieres agregar o modificar preguntas, edita el componente `EncuestaForm` en `src/App.js` (línea 202-459).

## Soporte

Si necesitas ayuda para configurar cualquiera de estas opciones, no dudes en preguntar.
