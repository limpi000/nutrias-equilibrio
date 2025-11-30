// Gestor de sonidos relajantes para crisis de ansiedad

// Lista de sonidos disponibles (puedes agregar archivos MP3 a public/sounds/)
export const sonidosDisponibles = {
  naturaleza: {
    nombre: 'Sonidos de Naturaleza',
    descripcion: 'Lluvia, pájaros y río',
    archivo: '/sounds/naturaleza.mp3',
    duracion: 300 // 5 minutos
  },
  olas: {
    nombre: 'Olas del Mar',
    descripcion: 'Olas suaves en la playa',
    archivo: '/sounds/olas.mp3',
    duracion: 300
  },
  respiracion: {
    nombre: 'Guía de Respiración',
    descripcion: 'Ejercicio 4-7-8',
    archivo: '/sounds/respiracion.mp3',
    duracion: 180 // 3 minutos
  },
  musica: {
    nombre: 'Música Instrumental',
    descripcion: 'Piano relajante',
    archivo: '/sounds/piano.mp3',
    duracion: 600 // 10 minutos
  }
};

// Videos de YouTube relajantes (IDs reales de videos públicos)
export const videosYouTube = {
  respiracion: {
    nombre: 'Ejercicio de Respiración Guiada',
    videoId: 'SEfs5TJZ6Nk', // Video de 5 minutos de respiración
    duracion: 300
  },
  naturaleza: {
    nombre: 'Sonidos de Bosque - 1 hora',
    videoId: '3QlPppPsnYw', // Sonidos de bosque
    duracion: 3600
  },
  meditacion: {
    nombre: 'Meditación para Ansiedad - 10 min',
    videoId: 'O-6f5wQXSu8', // Meditación guiada
    duracion: 600
  },
  lluvia: {
    nombre: 'Sonido de Lluvia - 30 min',
    videoId: 'q76bMs-NwRk', // Lluvia relajante
    duracion: 1800
  }
};

// Clase para manejar reproducción de audio
class AudioManager {
  constructor() {
    this.audioActual = null;
    this.estaReproduciendo = false;
  }

  reproducir(tipoSonido) {
    // Detener audio actual si existe
    this.detener();

    const sonido = sonidosDisponibles[tipoSonido];
    if (!sonido) {
      console.error('Tipo de sonido no encontrado:', tipoSonido);
      return false;
    }

    try {
      this.audioActual = new Audio(sonido.archivo);
      this.audioActual.loop = true; // Repetir en loop
      this.audioActual.volume = 0.7; // Volumen al 70%

      this.audioActual.play()
        .then(() => {
          this.estaReproduciendo = true;
          console.log('Reproduciendo:', sonido.nombre);
        })
        .catch(error => {
          console.error('Error al reproducir audio:', error);
          // Fallback: algunos navegadores requieren interacción del usuario
          console.log('Intenta hacer clic en el botón de reproducción nuevamente');
        });

      return true;
    } catch (error) {
      console.error('Error al crear audio:', error);
      return false;
    }
  }

  detener() {
    if (this.audioActual) {
      this.audioActual.pause();
      this.audioActual.currentTime = 0;
      this.audioActual = null;
      this.estaReproduciendo = false;
      console.log('Audio detenido');
    }
  }

  ajustarVolumen(nivel) {
    if (this.audioActual) {
      // Nivel debe ser entre 0 y 1
      this.audioActual.volume = Math.max(0, Math.min(1, nivel));
    }
  }

  obtenerEstado() {
    return {
      estaReproduciendo: this.estaReproduciendo,
      tiempoActual: this.audioActual ? this.audioActual.currentTime : 0,
      volumen: this.audioActual ? this.audioActual.volume : 0
    };
  }
}

// Instancia única del gestor de audio
export const gestorAudio = new AudioManager();

// Función para reproducir sonido de emergencia
export const reproducirSonidoEmergencia = (preferencia = 'naturaleza') => {
  console.log('🚨 Activando sonido de emergencia:', preferencia);
  gestorAudio.reproducir(preferencia);
};

// Función para detener todos los sonidos
export const detenerSonidos = () => {
  gestorAudio.detener();
};
