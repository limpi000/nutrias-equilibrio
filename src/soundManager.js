
export const recursosDisponibles = {
  naturaleza: {
    nombre: 'Sonidos de Naturaleza',
    descripcion: 'Lluvia, pájaros y bosque',
    tipo: 'audio',
    videoId: 'lE6RYpe9IT0', 
    duracion: 3600,
    icono: '🌳'
  },
  olas: {
    nombre: 'Olas del Mar',
    descripcion: 'Olas suaves en la playa',
    tipo: 'audio',
    videoId: 'WHPYKLQID4U', 
    duracion: 3600,
    icono: '🌊'
  },
  respiracion: {
    nombre: 'Guía de Respiración',
    descripcion: 'Ejercicio 4-7-8',
    tipo: 'video',
    videoId: 'SEfs5TJZ6Nk', 
    duracion: 300,
    icono: '🫁'
  },
  musica: {
    nombre: 'Música Instrumental',
    descripcion: 'Piano relajante',
    tipo: 'audio',
    videoId: '4oStw0r33so',
    duracion: 3600,
    icono: '🎹'
  },
  meditacion: {
    nombre: 'Meditación para Ansiedad',
    descripcion: 'Meditación guiada 10 min',
    tipo: 'video',
    videoId: 'O-6f5wQXSu8',
    duracion: 600,
    icono: '🧘'
  },
  lluvia: {
    nombre: 'Sonido de Lluvia',
    descripcion: 'Lluvia relajante 30 min',
    tipo: 'audio',
    videoId: 'q76bMs-NwRk',
    duracion: 1800,
    icono: '☔'
  },
  bosque: {
    nombre: 'Bosque Tranquilo',
    descripcion: 'Sonidos del bosque',
    tipo: 'audio',
    videoId: '3QlPppPsnYw', 
    duracion: 3600,
    icono: '🌲'
  },
  fuego: {
    nombre: 'Chimenea',
    descripcion: 'Sonido de fuego crepitante',
    tipo: 'audio',
    videoId: 'L_LUpnjgPso', 
    duracion: 3600,
    icono: '🔥'
  }
};


class YouTubeAudioManager {
  constructor() {
    this.player = null;
    this.estaReproduciendo = false;
    this.recursoActual = null;
    this.volumen = 0.7;
    this.apiCargada = false;
    this.callbacks = [];
  }

  
  inicializar(containerId = 'youtube-player') {
    console.log('🎵 Inicializando Audio Manager...');
    
    
    if (!document.getElementById(containerId)) {
      const container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.bottom = '-1000px'; 
      container.style.left = '-1000px';
      document.body.appendChild(container);
    }

    
    if (!window.YT) {
      this.cargarAPIYouTube();
    } else {
      this.apiCargada = true;
      this.ejecutarCallbacks();
    }
  }

  cargarAPIYouTube() {
    console.log('📡 Cargando API de YouTube...');
    
  
    window.onYouTubeIframeAPIReady = () => {
      console.log('✅ API de YouTube cargada');
      this.apiCargada = true;
      this.ejecutarCallbacks();
    };

    
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  ejecutarCallbacks() {
    this.callbacks.forEach(callback => callback());
    this.callbacks = [];
  }

  cuandoEsteListoLaAPI(callback) {
    if (this.apiCargada) {
      callback();
    } else {
      this.callbacks.push(callback);
    }
  }

  
  reproducir(tipoRecurso) {
    const recurso = recursosDisponibles[tipoRecurso];
    if (!recurso) {
      console.error('❌ Recurso no encontrado:', tipoRecurso);
      return false;
    }

    console.log('▶️ Reproduciendo:', recurso.nombre);
    this.recursoActual = recurso;

    this.cuandoEsteListoLaAPI(() => {
      if (this.player) {
        
        this.player.loadVideoById({
          videoId: recurso.videoId,
          startSeconds: 0
        });
        this.player.setVolume(this.volumen * 100);
      } else {
       
        this.crearPlayer(recurso.videoId);
      }
      
      this.estaReproduciendo = true;
    });

    return true;
  }

  crearPlayer(videoId) {
    if (!window.YT || !window.YT.Player) {
      console.error('❌ API de YouTube no disponible');
      return;
    }

    console.log('🎬 Creando player de YouTube...');

    this.player = new window.YT.Player('youtube-player', {
      height: '1',
      width: '1',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: videoId, 
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: (event) => {
          console.log('✅ Player listo');
          event.target.setVolume(this.volumen * 100);
          event.target.playVideo();
        },
        onStateChange: (event) => {
          
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
          
          
          if (event.data === window.YT.PlayerState.PLAYING) {
            this.estaReproduciendo = true;
          } else if (event.data === window.YT.PlayerState.PAUSED || 
                     event.data === window.YT.PlayerState.ENDED) {
            this.estaReproduciendo = false;
          }
        },
        onError: (event) => {
          console.error('❌ Error en el player de YouTube:', event.data);
          this.estaReproduciendo = false;
        }
      }
    });
  }

  
  detener() {
    if (this.player) {
      try {
        this.player.stopVideo();
        console.log('⏹️ Audio detenido');
      } catch (error) {
        console.error('Error al detener:', error);
      }
      this.estaReproduciendo = false;
      this.recursoActual = null;
    }
  }

  
  pausar() {
    if (this.player && this.estaReproduciendo) {
      try {
        this.player.pauseVideo();
        console.log('⏸️ Audio pausado');
      } catch (error) {
        console.error('Error al pausar:', error);
      }
      this.estaReproduciendo = false;
    }
  }

  
  reanudar() {
    if (this.player && !this.estaReproduciendo) {
      try {
        this.player.playVideo();
        console.log('▶️ Audio reanudado');
      } catch (error) {
        console.error('Error al reanudar:', error);
      }
      this.estaReproduciendo = true;
    }
  }

  
  ajustarVolumen(nivel) {
    this.volumen = Math.max(0, Math.min(1, nivel));
    
    if (this.player) {
      try {
        
        this.player.setVolume(this.volumen * 100);
        console.log('🔊 Volumen ajustado a:', Math.round(this.volumen * 100) + '%');
      } catch (error) {
        console.error('Error al ajustar volumen:', error);
      }
    }
  }

 
  obtenerEstado() {
    let tiempoActual = 0;
    let duracion = 0;

    if (this.player && typeof this.player.getCurrentTime === 'function') {
      try {
        tiempoActual = this.player.getCurrentTime();
        duracion = this.player.getDuration();
      } catch (error) {
        
      }
    }

    return {
      estaReproduciendo: this.estaReproduciendo,
      recursoActual: this.recursoActual,
      tiempoActual: tiempoActual,
      duracion: duracion,
      volumen: this.volumen
    };
  }

  
  hayAudioActivo() {
    return this.estaReproduciendo && this.recursoActual !== null;
  }
}


export const gestorAudio = new YouTubeAudioManager();


export const reproducirSonidoEmergencia = (preferencia = 'naturaleza') => {
  console.log('🚨 Activando sonido de emergencia:', preferencia);
  
  
  if (!gestorAudio.player && !gestorAudio.apiCargada) {
    gestorAudio.inicializar();
    
    
    gestorAudio.cuandoEsteListoLaAPI(() => {
      setTimeout(() => {
        gestorAudio.reproducir(preferencia);
      }, 500);
    });
  } else {
    gestorAudio.reproducir(preferencia);
  }
};

export const detenerSonidos = () => {
  gestorAudio.detener();
};

export const pausarSonidos = () => {
  gestorAudio.pausar();
};

export const reanudarSonidos = () => {
  gestorAudio.reanudar();
};


export const obtenerListaRecursos = () => {
  return Object.entries(recursosDisponibles).map(([id, recurso]) => ({
    id,
    ...recurso
  }));
};


export const useAudioManager = () => {
  const [estado, setEstado] = React.useState(gestorAudio.obtenerEstado());

  React.useEffect(() => {
    
    gestorAudio.inicializar();

   
    const intervalo = setInterval(() => {
      setEstado(gestorAudio.obtenerEstado());
    }, 1000);

    return () => {
      clearInterval(intervalo);
      
    };
  }, []);

  return {
    ...estado,
    reproducir: (tipo) => gestorAudio.reproducir(tipo),
    detener: () => gestorAudio.detener(),
    pausar: () => gestorAudio.pausar(),
    reanudar: () => gestorAudio.reanudar(),
    ajustarVolumen: (nivel) => gestorAudio.ajustarVolumen(nivel),
    recursos: recursosDisponibles
  };
};

export default gestorAudio;