
export const sonidosDisponibles = {
  naturaleza: {
    nombre: 'Sonidos de Naturaleza',
    descripcion: 'Lluvia, pájaros y río',
    archivo: '/sounds/naturaleza.mp3',
    duracion: 300 
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
    duracion: 180 
  },
  musica: {
    nombre: 'Música Instrumental',
    descripcion: 'Piano relajante',
    archivo: '/sounds/piano.mp3',
    duracion: 600 
  }
};


export const videosYouTube = {
  respiracion: {
    nombre: 'Ejercicio de Respiración Guiada',
    videoId: 'SEfs5TJZ6Nk', 
    duracion: 300
  },
  naturaleza: {
    nombre: 'Sonidos de Bosque - 1 hora',
    videoId: '3QlPppPsnYw', 
    duracion: 3600
  },
  meditacion: {
    nombre: 'Meditación para Ansiedad - 10 min',
    videoId: 'O-6f5wQXSu8', 
    duracion: 600
  },
  lluvia: {
    nombre: 'Sonido de Lluvia - 30 min',
    videoId: 'q76bMs-NwRk', 
    duracion: 1800
  }
};


class AudioManager {
  constructor() {
    this.audioActual = null;
    this.estaReproduciendo = false;
  }

  reproducir(tipoSonido) {
    
    this.detener();

    const sonido = sonidosDisponibles[tipoSonido];
    if (!sonido) {
      console.error('Tipo de sonido no encontrado:', tipoSonido);
      return false;
    }

    try {
      this.audioActual = new Audio(sonido.archivo);
      this.audioActual.loop = true; 
      this.audioActual.volume = 0.7; 

      this.audioActual.play()
        .then(() => {
          this.estaReproduciendo = true;
          console.log('Reproduciendo:', sonido.nombre);
        })
        .catch(error => {
          console.error('Error al reproducir audio:', error);
      
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


export const gestorAudio = new AudioManager();


export const reproducirSonidoEmergencia = (preferencia = 'naturaleza') => {
  console.log('🚨 Activando sonido de emergencia:', preferencia);
  gestorAudio.reproducir(preferencia);
};


export const detenerSonidos = () => {
  gestorAudio.detener();
};