import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { obtenerLecturasRecientes, obtenerEstadisticasDia, obtenerConfiguracionPeluche } from '../pelucheUtils';

const Dashboard = () => {
  const [codigoPeluche, setCodigoPeluche] = useState('');
  const [lecturas, setLecturas] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [pelucheVinculado, setPelucheVinculado] = useState(false);

  useEffect(() => {
    // Intentar cargar código guardado
    const codigoGuardado = localStorage.getItem('codigoPelucheActual');
    if (codigoGuardado) {
      setCodigoPeluche(codigoGuardado);
      cargarDatos(codigoGuardado);
    }
  }, []);

  const cargarDatos = async (codigo) => {
    setCargando(true);
    setError('');

    // Verificar si el peluche existe
    const config = await obtenerConfiguracionPeluche(codigo);
    if (!config.success) {
      setError('Peluche no encontrado. Por favor vincúlalo primero.');
      setCargando(false);
      setPelucheVinculado(false);
      return;
    }

    setPelucheVinculado(true);

    // Cargar lecturas recientes
    const resultadoLecturas = await obtenerLecturasRecientes(codigo, 50);
    if (resultadoLecturas.success) {
      setLecturas(resultadoLecturas.data);
    }

    // Cargar estadísticas del día
    const resultadoEstadisticas = await obtenerEstadisticasDia(codigo);
    if (resultadoEstadisticas.success) {
      setEstadisticas(resultadoEstadisticas.data);
    }

    setCargando(false);
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (codigoPeluche.trim()) {
      localStorage.setItem('codigoPelucheActual', codigoPeluche);
      cargarDatos(codigoPeluche);
    }
  };

  const prepararDatosGrafica = () => {
    if (lecturas.length === 0) return [];

    return lecturas.slice(0, 20).reverse().map((lectura, index) => ({
      nombre: `#${index + 1}`,
      presion: lectura.presion,
      hora: lectura.hora || '',
      fecha: lectura.fecha || ''
    }));
  };

  const calcularPromedioSemanal = () => {
    if (lecturas.length === 0) return [];

    const lecturasRecientes = lecturas.slice(0, 100);
    const porDia = {};

    lecturasRecientes.forEach(lectura => {
      const fecha = lectura.fecha;
      if (!porDia[fecha]) {
        porDia[fecha] = { total: 0, count: 0, max: 0 };
      }
      porDia[fecha].total += lectura.presion;
      porDia[fecha].count += 1;
      porDia[fecha].max = Math.max(porDia[fecha].max, lectura.presion);
    });

    return Object.keys(porDia).slice(0, 7).map(fecha => ({
      fecha: fecha,
      promedio: Math.round(porDia[fecha].total / porDia[fecha].count),
      maximo: porDia[fecha].max
    })).reverse();
  };

  if (!pelucheVinculado && !cargando) {
    return (
      <div style={styles.container}>
        <h2 style={styles.titulo}>📊 Dashboard de Mi Peluche</h2>
        <div style={styles.buscarCard}>
          <p>Ingresa el código de tu peluche para ver las estadísticas:</p>
          <form onSubmit={handleBuscar} style={styles.buscarForm}>
            <input
              type="text"
              value={codigoPeluche}
              onChange={(e) => setCodigoPeluche(e.target.value.toUpperCase())}
              placeholder="NUTRIA-XXXXX"
              style={styles.input}
              required
            />
            <button type="submit" style={styles.botonBuscar}>
              🔍 Buscar
            </button>
          </form>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.ayuda}>
            <p>💡 <strong>Consejo:</strong> Si aún no has vinculado tu peluche, ve a la sección "Vincular Mi Peluche" primero.</p>
          </div>
        </div>
      </div>
    );
  }

  if (cargando) {
    return (
      <div style={styles.container}>
        <h2 style={styles.titulo}>📊 Dashboard de Mi Peluche</h2>
        <div style={styles.cargando}>⏳ Cargando datos...</div>
      </div>
    );
  }

  const datosGrafica = prepararDatosGrafica();
  const datosSemanal = calcularPromedioSemanal();

  return (
    <div style={styles.container}>
      <div style={styles.headerDashboard}>
        <h2 style={styles.titulo}>📊 Dashboard - {codigoPeluche}</h2>
        <button onClick={() => cargarDatos(codigoPeluche)} style={styles.botonRefrescar}>
          🔄 Actualizar
        </button>
      </div>

      {/* Estadísticas del Día */}
      {estadisticas && !estadisticas.sinDatos && (
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValor}>{estadisticas.totalLecturas}</div>
            <div style={styles.statLabel}>Lecturas Hoy</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValor, color: '#ff9800'}}>{estadisticas.presionMaxima}</div>
            <div style={styles.statLabel}>Presión Máxima</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValor, color: '#2196f3'}}>{estadisticas.presionPromedio}</div>
            <div style={styles.statLabel}>Promedio Hoy</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statValor, color: estadisticas.totalAlertas > 0 ? '#f44336' : '#4caf50'}}>
              {estadisticas.totalAlertas}
            </div>
            <div style={styles.statLabel}>Alertas</div>
          </div>
        </div>
      )}

      {estadisticas && estadisticas.sinDatos && (
        <div style={styles.infoBox}>
          <p>📭 No hay datos registrados para hoy. ¡Comienza a usar tu peluche!</p>
        </div>
      )}

      {/* Gráfica de Lecturas Recientes */}
      {datosGrafica.length > 0 && (
        <div style={styles.graficaCard}>
          <h3 style={styles.subtitulo}>📈 Últimas 20 Lecturas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={datosGrafica}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="presion"
                stroke="#4caf50"
                strokeWidth={2}
                name="Presión"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Gráfica Semanal */}
      {datosSemanal.length > 0 && (
        <div style={styles.graficaCard}>
          <h3 style={styles.subtitulo}>📊 Promedio por Día (Última Semana)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosSemanal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="promedio" fill="#4caf50" name="Promedio" />
              <Bar dataKey="maximo" fill="#ff9800" name="Máximo" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Tabla de Lecturas */}
      {lecturas.length > 0 && (
        <div style={styles.tablaCard}>
          <h3 style={styles.subtitulo}>📋 Historial de Lecturas</h3>
          <div style={styles.tablaContainer}>
            <table style={styles.tabla}>
              <thead>
                <tr>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Hora</th>
                  <th style={styles.th}>Presión</th>
                  <th style={styles.th}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {lecturas.slice(0, 15).map((lectura, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.trPar : styles.trImpar}>
                    <td style={styles.td}>{lectura.fecha}</td>
                    <td style={styles.td}>{lectura.hora}</td>
                    <td style={{...styles.td, fontWeight: 'bold', color: lectura.presion >= 70 ? '#f44336' : '#4caf50'}}>
                      {lectura.presion}
                    </td>
                    <td style={styles.td}>
                      {lectura.presion >= 70 ? '🔴 Alerta' : lectura.presion >= 50 ? '🟡 Atención' : '🟢 Normal'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {lecturas.length === 0 && !estadisticas?.sinDatos && (
        <div style={styles.infoBox}>
          <p>📭 No hay lecturas registradas aún. Espera a que tu peluche envíe datos.</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  headerDashboard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  titulo: {
    color: '#2e7d32',
    borderBottom: '2px solid #c8e6c9',
    paddingBottom: '10px',
    margin: 0
  },
  subtitulo: {
    color: '#388e3c',
    marginBottom: '15px'
  },
  botonRefrescar: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statValor: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: '10px'
  },
  statLabel: {
    fontSize: '16px',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  graficaCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  tablaCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  tablaContainer: {
    overflowX: 'auto'
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  },
  trPar: {
    backgroundColor: '#f9f9f9'
  },
  trImpar: {
    backgroundColor: 'white'
  },
  buscarCard: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  buscarForm: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    justifyContent: 'center'
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #4caf50',
    borderRadius: '8px',
    minWidth: '250px'
  },
  botonBuscar: {
    padding: '12px 24px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '15px',
    border: '1px solid #ef5350'
  },
  ayuda: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
    textAlign: 'left'
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #2196f3'
  },
  cargando: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '24px',
    color: '#666'
  }
};

export default Dashboard;
