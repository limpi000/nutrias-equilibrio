import { useState } from "react";
import "./App.css";
import VincularPeluche from "./components/VincularPeluche";
import MonitoreoTiempoReal from "./components/MonitoreoTiempoReal"; 
 
// Estilos principales 
const styles = { 
rootContainer: { 
backgroundColor: "#f0f7f0", 
minHeight: "100vh", 
color: "#2d5016", 
fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
lineHeight: "1.6", 
}, 
crisisBanner: { 
backgroundColor: "#e8f5e9", 
padding: "10px 20px", 
textAlign: "center", 
borderBottom: "2px solid #4caf50", 
fontSize: "18px", 
fontWeight: "bold", 
}, 
header: { 
backgroundColor: "#4caf50", 
color: "white", 
padding: "20px", 
textAlign: "center", 
}, 
navBar: { 
display: "flex", 
justifyContent: "center", 
backgroundColor: "#388e3c", 
padding: "10px 0", 
flexWrap: "wrap", 
}, 
navItem: { 
color: "white", 
padding: "10px 20px", 
margin: "0 5px", 
borderRadius: "5px", 
cursor: "pointer", 
transition: "background-color 0.3s", 
}, 
contentContainer: { 
display: "flex", 
maxWidth: "1200px", 
margin: "0 auto", 
padding: "20px", 
}, 
mainContent: { 
flex: "3", 
padding: "20px", 
backgroundColor: "white", 
borderRadius: "10px", 
boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
marginRight: "20px", 
}, 
sidebar: { 
flex: "1", 
padding: "20px", 
backgroundColor: "#e8f5e9", 
borderRadius: "10px", 
boxShadow: "0 2px 10px rgba(0,0,0,0.1)", 
}, 
footer: { 
backgroundColor: "#2e7d32", 
color: "white", 
textAlign: "center", 
padding: "20px", 
marginTop: "30px", 
}, 
sectionTitle: { 
color: "#2e7d32", 
borderBottom: "2px solid #c8e6c9", 
paddingBottom: "10px", 
}, 
card: { 
backgroundColor: "white", 
borderRadius: "8px", 
padding: "15px", 
marginBottom: "15px", 
boxShadow: "0 1px 5px rgba(0,0,0,0.1)", 
}, 
}; 
 
const dropdownStyles = { 
dropdownContainer: { 
margin: "20px 0", 
}, 
select: { 
width: "100%", 
padding: "12px 15px", 
fontSize: "16px", 
border: "2px solid #4caf50", 
borderRadius: "8px", 
backgroundColor: "white", 
cursor: "pointer", 
outline: "none", 
}, 
infoCard: { 
backgroundColor: "#e8f5e9", 
border: "1px solid #4caf50", 
borderRadius: "8px", 
padding: "20px", 
marginTop: "15px", 
boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
}, 
mapContainer: { 
width: "100%", 
height: "300px", 
borderRadius: "5px", 
overflow: "hidden", 
marginTop: "10px", 
border: "2px solid #4caf50" 
} 
}; 
 
// Datos de los lugares de tratamiento 
const locationData = [ 
{
id: 1, 
name: "Chihuahua Ortiz Mena", 
address: "Blvrd Antonio Ortiz Mena 3403, Quintas del Sol, Campestre-Lomas, 31214 Chihuahua, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 18:00", 
services: ["Terapia individual", "Consulta psicológica"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.061568673308!2d-106.10191182538266!3d28.62791677566727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea5ccd6000f5ff%3A0xf67b56aecd481b44!2sBlvrd%20Antonio%20Ortiz%20Mena%203403%2C%20Quintas%20del%20Sol%2C%20Campestre-Lomas%2C%2031214%20Chihuahua%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583161143!5m2!1ses-419!2smx"
}, 
{ 
id: 2, 
name: "Chihuahua División del Nte", 
address: "Cesar A. Sandino 1306-I, División del Nte. I Etapa, 31064 Chihuahua, Chih.", 
schedule: "24 horas", 
services: ["Emergencias", "Terapia de crisis", "Hospitalización"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.8811916303234!2d-106.03623592670667!3d28.603340821932672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea5b102aa0b29f%3A0x8d1a0bc226a07b4a!2sCesar%20A.%20Sandino%201306%2C%20Divisi%C3%B3n%20del%20Nte.%20I%20Etapa%2C%2031064%20Chihuahua%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583246140!5m2!1ses-419!2smx"
}, 
{ 
id: 3, 
name: "Chihuahua Zarco", 
address: "Av. Francisco Zarco 3003, Zarco, 31020 Chihuahua, Chih.", 
schedule: "Lunes a Viernes: 10:00 - 19:00", 
services: ["Terapia individual", "Familiar"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.385446709801!2d-106.09154162538312!3d28.61820777567261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea5cc7e9d25209%3A0x71c7fcefc19b10e0!2sAv.%20Francisco%20Zarco%203003%2C%20Zarco%2C%2031020%20Chihuahua%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583344410!5m2!1ses-419!2smx"
}, 
{ 
id: 4, 
name: "Juárez", 
address: "Av. de Las Fuentes 1543, Fuentes del Valle, 32500 Juárez, Chih.", 
schedule: "Lunes a Sábado: 9:00 - 20:00", 
services: ["Terapia individual", "Talleres", "Orientación"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.9203686024557!2d-106.42178852523651!3d31.71807017412404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75c12e3544d91%3A0x758cdb216f616b9f!2sAv.%20de%20Las%20Fuentes%201543%2C%20Fuentes%20del%20Valle%2C%2032500%20Ju%C3%A1rez%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583441578!5m2!1ses-419!2smx"
}, 
{ 
id: 5, 
name: "Aldama", 
address: "Ojinaga 1083, Centro, 32910 Juan Aldama, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 17:00", 
services: ["Terapia comunitaria", "Grupos de apoyo"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.013728657348!2d-105.91188292537313!3d28.83845127555294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea36266ec02381%3A0xfd814088ddc90c0!2sOjinaga%201083%2C%20Centro%2C%2032910%20Juan%20Aldama%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583509414!5m2!1ses-419!2smx"
}, 
{ 
id: 6, 
name: "Camargo", 
address: "Río Urique 223, Río Florido, 33720 Santa Rosalía de Camargo, Chih.", 
schedule: "Lunes a Viernes: 10:00 - 18:00", 
services: ["Terapia individual", "Evaluación psicológica"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2913604280875!2d-105.15911522542481!3d27.677388376199715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8694af10bfcd4215%3A0xc3d4acc2433e838e!2sR%C3%ADo%20Urique%20223%2C%20R%C3%ADo%20Florido%2C%2033720%20Santa%20Rosal%C3%ADa%20de%20Camargo%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583578278!5m2!1ses-419!2smx"
}, 
{ 
id: 7, 
name: "Casas Grandes", 
address: "Minerva 516, Centro, 31700 Nuevo Casas Grandes, Chih.", 
schedule: "Lunes a Sábado: 9:00 - 19:00", 
services: ["Consulta psicológica", "Acompañamiento"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.668126590543!2d-107.92049802529968!3d30.417156474738057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86dcac582146f83f%3A0xee5487a51b19ecdd!2sMinerva%20516%2C%20Centro%2C%2031700%20Nuevo%20Casas%20Grandes%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583631415!5m2!1ses-419!2smx"
}, 
{ 
id: 8, 
name: "Cuauhtémoc", 
address: "Periférico 220-A, Emiliano Zapata, 31579 Cuauhtémoc, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 18:00", 
services: ["Terapia integral", "Seguimiento"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.588138016952!2d-106.82559792539146!3d28.43168197577503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86c1cbf402a95555%3A0x1d42c9abb5a4b355!2sPerif%C3%A9rico%20220-A%2C%20Emiliano%20Zapata%2C%2031579%20Cuauht%C3%A9moc%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583691886!5m2!1ses-419!2smx"
}, 
{ 
id: 9, 
name: "Delicias", 
address: "Av. 6a. Sur 303, Sur 1, 33000 Delicias, Chih.", 
schedule: "Lunes a Viernes: 10:00 - 19:00", 
services: ["Mindfulness", "Terapia cognitiva", "Meditación"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.662630918567!2d-105.47608022540238!3d28.18717387591086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86eb15b919c45b8d%3A0x31ba75edcfa70469!2sAv.%206a.%20Sur%20303%2C%20Sur%201%2C%2033000%20Delicias%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583758140!5m2!1ses-419!2smx"
}, 
{ 
id: 10, 
name: "Meoqui", 
address: "Esquina con Matamoros, C. Ricardo Salgado 2312, San Francisco, 33130 Pedro Meoqui, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 17:00", 
services: ["Terapia individual", "Familiar", "Grupos"],
mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.0607954433985!2d-105.49596302679346!3d28.266173322530133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86eb13e7aca46b05%3A0x2cdddb37a0528a95!2sC.%20Ricardo%20Salgado%202312%2C%20San%20Francisco%2C%2033130%20Pedro%20Meoqui%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583874904!5m2!1ses-419!2smx"
}, 
{ 
id: 11, 
name: "Parral", 
address: "Del Ojito, Centro, 33850 Hidalgo del Parral, Chih.", 
schedule: "Lunes a Sábado: 9:00 - 18:00", 
services: ["Consulta psicológica", "Orientación", "Primera ayuda psicológica"],
mapUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.176753613792!2d-105.66047572545709!3d26.929610476637123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8694513bf798fbe1%3A0x2eb83e0b352f0001!2sDel%20Ojito%2C%20Hidalgo%20del%20Parral%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1764583927214!5m2!1ses-419!2smx"
} 
]; 
 
// Componente de Encuesta
const EncuestaForm = () => {
const [formData, setFormData] = useState({
nombre: '',
pregunta1: '',
pregunta2: '',
pregunta3: '',
pregunta4: '',
comentarios: ''
});
const [enviado, setEnviado] = useState(false);
const [error, setError] = useState('');

const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({
...prev,
[name]: value
}));
};

const handleSubmit = (e) => {
e.preventDefault();
setError('');


if (!formData.pregunta1 || !formData.pregunta2 || !formData.pregunta3 || !formData.pregunta4) {
setError('Por favor, completa todas las preguntas requeridas.');
return;
}


console.log('Datos de la encuesta:', formData);


setEnviado(true);


setTimeout(() => {
setFormData({
nombre: '',
pregunta1: '',
pregunta2: '',
pregunta3: '',
pregunta4: '',
comentarios: ''
});
setEnviado(false);
}, 3000);
};

const formStyles = {
form: {
backgroundColor: 'white',
padding: '20px',
borderRadius: '10px',
marginTop: '20px'
},
inputGroup: {
marginBottom: '20px'
},
label: {
display: 'block',
marginBottom: '8px',
fontWeight: 'bold',
color: '#2e7d32'
},
input: {
width: '100%',
padding: '10px',
fontSize: '16px',
border: '2px solid #c8e6c9',
borderRadius: '5px',
boxSizing: 'border-box'
},
select: {
width: '100%',
padding: '10px',
fontSize: '16px',
border: '2px solid #c8e6c9',
borderRadius: '5px',
backgroundColor: 'white',
boxSizing: 'border-box'
},
textarea: {
width: '100%',
padding: '10px',
fontSize: '16px',
border: '2px solid #c8e6c9',
borderRadius: '5px',
minHeight: '100px',
resize: 'vertical',
fontFamily: 'inherit',
boxSizing: 'border-box'
},
button: {
backgroundColor: '#4caf50',
color: 'white',
padding: '12px 30px',
fontSize: '18px',
border: 'none',
borderRadius: '5px',
cursor: 'pointer',
fontWeight: 'bold',
transition: 'background-color 0.3s'
},
successMessage: {
backgroundColor: '#d4edda',
color: '#155724',
padding: '15px',
borderRadius: '5px',
marginBottom: '20px',
border: '1px solid #c3e6cb',
textAlign: 'center'
},
errorMessage: {
backgroundColor: '#f8d7da',
color: '#721c24',
padding: '15px',
borderRadius: '5px',
marginBottom: '20px',
border: '1px solid #f5c6cb',
textAlign: 'center'
}
};

return (
<div style={formStyles.form}>
{enviado && (
<div style={formStyles.successMessage}>
✅ ¡Gracias por tu respuesta! Tu opinión ha sido registrada exitosamente.
</div>
)}

{error && (
<div style={formStyles.errorMessage}>
❌ {error}
</div>
)}

<form onSubmit={handleSubmit}>
<div style={formStyles.inputGroup}>
<label style={formStyles.label}>
Nombre (opcional):
</label>
<input
type="text"
name="nombre"
value={formData.nombre}
onChange={handleChange}
style={formStyles.input}
placeholder="Tu nombre"
/>
</div>

<div style={formStyles.inputGroup}>
<label style={formStyles.label}>
1. ¿Cómo calificarías el taller en general? *
</label>
<select
name="pregunta1"
value={formData.pregunta1}
onChange={handleChange}
style={formStyles.select}
required
>
<option value="">Selecciona una opción</option>
<option value="excelente">Excelente</option>
<option value="muy-bueno">Muy bueno</option>
<option value="bueno">Bueno</option>
<option value="regular">Regular</option>
<option value="malo">Malo</option>
</select>
</div>

<div style={formStyles.inputGroup}>
<label style={formStyles.label}>
2. ¿Las actividades del taller fueron útiles para ti? *
</label>
<select
name="pregunta2"
value={formData.pregunta2}
onChange={handleChange}
style={formStyles.select}
required
>
<option value="">Selecciona una opción</option>
<option value="muy-utiles">Muy útiles</option>
<option value="utiles">Útiles</option>
<option value="poco-utiles">Poco útiles</option>
<option value="no-utiles">No fueron útiles</option>
</select>
</div>

<div style={formStyles.inputGroup}>
<label style={formStyles.label}>
3. ¿Te sentiste cómodo/a durante el taller? *
</label>
<select
name="pregunta3"
value={formData.pregunta3}
onChange={handleChange}
style={formStyles.select}
required
>
<option value="">Selecciona una opción</option>
<option value="muy-comodo">Muy cómodo/a</option>
<option value="comodo">Cómodo/a</option>
<option value="neutral">Neutral</option>
<option value="incomodo">Incómodo/a</option>
</select>
</div>

<div style={formStyles.inputGroup}>
<label style={formStyles.label}>
4. ¿Recomendarías este taller a otras personas? *
</label>
<select
name="pregunta4"
value={formData.pregunta4}
onChange={handleChange}
style={formStyles.select}
required
>
<option value="">Selecciona una opción</option>
<option value="definitivamente-si">Definitivamente sí</option>
<option value="probablemente-si">Probablemente sí</option>
<option value="no-estoy-seguro">No estoy seguro/a</option>
<option value="probablemente-no">Probablemente no</option>
<option value="definitivamente-no">Definitivamente no</option>
</select>
</div>

<div style={formStyles.inputGroup}>
<label style={formStyles.label}>
Comentarios adicionales:
</label>
<textarea
name="comentarios"
value={formData.comentarios}
onChange={handleChange}
style={formStyles.textarea}
placeholder="Comparte tus sugerencias, experiencias o cualquier otro comentario..."
/>
</div>

<button
type="submit"
style={formStyles.button}
onMouseOver={(e) => e.target.style.backgroundColor = '#388e3c'}
onMouseOut={(e) => e.target.style.backgroundColor = '#4caf50'}
>
Enviar Encuesta
</button>
</form>
</div>
);
};

// Componente del Selector
const LocationSelector = () => { 
const [selectedLocation, setSelectedLocation] = useState(locationData[0]); 
 
const handleLocationChange = (event) => { 
const locationId = parseInt(event.target.value); 
const location = locationData.find(loc => loc.id === locationId); 
setSelectedLocation(location); 
}; 
 
return ( 
<div style={dropdownStyles.dropdownContainer}> 
<select  
style={dropdownStyles.select} 
value={selectedLocation.id} 
onChange={handleLocationChange} 
> 
{locationData.map(location => ( 
<option key={location.id} value={location.id}> 
{location.name} 
</option> 
))} 
</select> 
 
 
{selectedLocation && ( 
<div style={dropdownStyles.infoCard}> 
<h3 style={{ color: "#2e7d32", marginBottom: "15px" }}> 
{selectedLocation.name} 
</h3> 
<div style={{ marginBottom: "10px" }}> 
<strong>Dirección:</strong> {selectedLocation.address} 
</div> 
<div style={{ marginBottom: "10px" }}> 
<strong>Horario:</strong> {selectedLocation.schedule} 
</div> 
<div style={{ marginBottom: "15px" }}> 
<strong>Servicios:</strong> 
<ul style={{ margin: "5px 0", paddingLeft: "20px" }}> 
{selectedLocation.services.map((service, index) => ( 
<li key={index}>{service}</li> 
))} 
</ul> 
</div> 
 
<iframe
src={selectedLocation.mapUrl}
style={dropdownStyles.mapContainer}
allowFullScreen=""
loading="lazy"
referrerPolicy="no-referrer-when-downgrade"
title={`Mapa de ${selectedLocation.name}`}
/>
</div> 
)} 
</div> 
); 
}; 
 
// Componentes de la página 
const CrisisBanner = () => { 
return ( 
<div style={styles.crisisBanner}> 
🆘 ¿Estás en crisis? Llama al: <strong>(614) 194-02-00</strong> - Disponible 24/7 
</div> 
); 
}; 
 
const Header = () => { 
return ( 
<header style={styles.header}> 
<h1>Nutrias en Equilibrio 🦦</h1> 
<p>Apoyo psicológico</p> 
</header> 
);      
}; 
 
const Navigation = ({ currentSection, setCurrentSection }) => {
const sections = [
{ id: "inicio", name: "Inicio" },
{ id: "vincular", name: "🦦 Vincular Mi Peluche" },
{ id: "monitoreo", name: "🎛️ Monitoreo" },
{ id: "lugares", name: "Lugares de Tratamiento" },
{ id: "Taller", name: "Taller" },
{ id: "trastornos", name: "Trastornos" },
{ id: "informacion", name: "Información para externos" },
{ id: "encuesta", name: "Encuesta" },
{ id: "creditos", name: "Créditos" },
]; 
 
return ( 
<nav style={styles.navBar}> 
{sections.map((section) => ( 
<div 
key={section.id} 
style={{ 
...styles.navItem, 
backgroundColor: currentSection === section.id ? "#2e7d32" : "transparent", 
}} 
onClick={() => setCurrentSection(section.id)} 
> 
{section.name} 
</div> 
))} 
</nav> 
); 
}; 
 
const MainContent = ({ currentSection }) => {
const renderContent = () => {
switch (currentSection) {
case "vincular":
return <VincularPeluche />;

case "monitoreo":
return <MonitoreoTiempoReal />;

case "inicio":
return (
<div>
<div style={{
textAlign: 'center',
padding: '30px 20px',
backgroundColor: '#e8f5e9',
borderRadius: '10px',
marginBottom: '30px'
}}>
<div style={{ fontSize: '80px', marginBottom: '20px' }}>🦦</div>
<h2 style={{ ...styles.sectionTitle, borderBottom: 'none', color: '#2e7d32', fontSize: '32px' }}>
Bienvenido a Nutrias en Equilibrio
</h2>
<p style={{ fontSize: '18px', color: '#2d5016', maxWidth: '800px', margin: '0 auto' }}>
Tu espacio seguro para el bienestar emocional
</p>
</div>

<div style={styles.card}>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
<div style={{ fontSize: '60px', flexShrink: 0 }}>🦦</div>
<div style={{ flex: 1 }}>
<h3 style={{ color: '#2e7d32', marginTop: 0 }}>¿Por qué nutrias?</h3>
<p>
Las nutrias son animales sociales que se toman de las manos para no separarse mientras duermen.
Representan el apoyo mutuo, la conexión y el cuidado que todos necesitamos en momentos difíciles.
</p>
</div>
</div>
</div>

<div style={styles.card}>
<h3 style={{ color: '#2e7d32' }}>Nuestra Misión</h3>
<p>
Este proyecto busca reducir la desinformación y el estigma asociados a los trastornos mentales,
fomentando la empatía y la comunicación efectiva entre quienes los padecen y su entorno.
Asimismo, pretende orientar a la población hacia espacios de apoyo profesional y recursos de emergencia,
fortaleciendo la educación emocional y el bienestar colectivo.
</p>
</div>

<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
gap: '20px',
marginTop: '20px'
}}>
<div style={{
...styles.card,
textAlign: 'center',
backgroundColor: '#e8f5e9'
}}>
<div style={{ fontSize: '48px', marginBottom: '10px' }}>💚</div>
<h4 style={{ color: '#2e7d32' }}>Empatía</h4>
<p>Comprender y apoyar sin juzgar</p>
</div>

<div style={{
...styles.card,
textAlign: 'center',
backgroundColor: '#e8f5e9'
}}>
<div style={{ fontSize: '48px', marginBottom: '10px' }}>🤝</div>
<h4 style={{ color: '#2e7d32' }}>Conexión</h4>
<p>Nadie debe enfrentar esto solo</p>
</div>

<div style={{
...styles.card,
textAlign: 'center',
backgroundColor: '#e8f5e9'
}}>
<div style={{ fontSize: '48px', marginBottom: '10px' }}>🌱</div>
<h4 style={{ color: '#2e7d32' }}>Crecimiento</h4>
<p>Herramientas para el bienestar</p>
</div>
</div>

<div style={styles.card}>
<div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
<div style={{ flex: 1 }}>
<h3 style={{ color: '#2e7d32', marginTop: 0 }}>Acerca de nosotros</h3>
<p>
La campaña quiere ayudar a que más personas entiendan qué hacer cuando alguien cercano necesita apoyo
emocional y a que quienes lo viven aprendan a comunicarse, expresarse y pedir ayuda.
El objetivo es que todos tengamos más herramientas para escucharnos,
apoyarnos y reconocer que la salud mental importa tanto como la física.
</p>
</div>
<div style={{ fontSize: '60px', flexShrink: 0 }}>🦦💙</div>
</div>
</div>

<div style={{
textAlign: 'center',
padding: '20px',
backgroundColor: '#c8e6c9',
borderRadius: '10px',
marginTop: '20px'
}}>
<p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32', margin: 0 }}>
"Como las nutrias que se toman de las manos, juntos podemos mantenernos a flote" 🦦🤝🦦
</p>
</div>
</div>
); 
case "Taller": 
return( 
<div> 
<div style={{
textAlign: 'center',
padding: '20px',
backgroundColor: '#e8f5e9',
borderRadius: '10px',
marginBottom: '20px'
}}>
<div style={{ fontSize: '60px' }}>🦦🎓</div>
<h2 style={{ ...styles.sectionTitle, borderBottom: 'none', color: '#2e7d32' }}>
Información de nuestro taller
</h2>
</div>

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
<div style={{ fontSize: '40px' }}>💡</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>¿De qué trata nuestro taller?</h3>
</div>
<p>El objetivo de nuestro taller es informar y concientizar a las personas acerca de los trastornos mentales 
y sus complicaciones para fomentar el apoyo a quienes padecen de alguno de estos trastornos mentales.</p> 
</div> 

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
<div style={{ fontSize: '40px' }}>🦦✨</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>Tu compañero peluche</h3>
</div>
<p>Contamos con un peluche especial que te indica qué tanta ansiedad estás experimentando, 
ayudándote a reconocer tus emociones y buscar apoyo cuando lo necesites.</p>
</div>

<div style={styles.card}> 
<h3 style={{ color: '#2e7d32', marginBottom: '20px' }}>🎯 Actividades de nuestro taller</h3> 
<p style={{ marginBottom: '20px' }}>
En nuestro taller encontrarás varias actividades para aprender a controlar tu cuerpo y tu mente 
en caso de una crisis emocional. También te enseñaremos qué hacer 
para ayudar a una persona que esté pasando por una crisis emocional.
</p> 

<div style={{
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
gap: '15px',
marginTop: '20px'
}}>
<div style={{
padding: '15px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '4px solid #4caf50'
}}>
<div style={{ fontSize: '30px', marginBottom: '8px' }}>🧘</div>
<strong>Meditación</strong>
<p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Técnicas de relajación</p>
</div>

<div style={{
padding: '15px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '4px solid #4caf50'
}}>
<div style={{ fontSize: '30px', marginBottom: '8px' }}>💨</div>
<strong>Respiraciones</strong>
<p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Para tranquilizar</p>
</div>

<div style={{
padding: '15px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '4px solid #4caf50'
}}>
<div style={{ fontSize: '30px', marginBottom: '8px' }}>💬</div>
<strong>Comunicación efectiva</strong>
<p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Expresar emociones</p>
</div>

<div style={{
padding: '15px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '4px solid #4caf50'
}}>
<div style={{ fontSize: '30px', marginBottom: '8px' }}>🎨</div>
<strong>Materiales anti-estrés</strong>
<p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Herramientas prácticas</p>
</div>

<div style={{
padding: '15px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '4px solid #4caf50'
}}>
<div style={{ fontSize: '30px', marginBottom: '8px' }}>📚</div>
<strong>Plática informativa</strong>
<p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Conocimiento esencial</p>
</div>

<div style={{
padding: '15px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '4px solid #4caf50'
}}>
<div style={{ fontSize: '30px', marginBottom: '8px' }}>🤝</div>
<strong>Conclusión grupal</strong>
<p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Compartir experiencias</p>
</div>
</div>
</div>

<div style={{
textAlign: 'center',
padding: '20px',
backgroundColor: '#c8e6c9',
borderRadius: '10px',
marginTop: '20px'
}}>
<div style={{ fontSize: '40px', marginBottom: '10px' }}>🦦💚</div>
<p style={{ fontSize: '16px', fontWeight: 'bold', color: '#2e7d32', margin: 0 }}>
"Juntos aprenderemos a navegar las aguas de nuestras emociones"
</p>
</div>
</div> 
); 
 
 
case "trastornos": 
return ( 
<div> 
<div style={{
textAlign: 'center',
padding: '20px',
backgroundColor: '#e8f5e9',
borderRadius: '10px',
marginBottom: '20px'
}}>
<div style={{ fontSize: '60px' }}>🧠💚</div>
<h2 style={{ ...styles.sectionTitle, borderBottom: 'none', color: '#2e7d32' }}>
Información sobre Trastornos
</h2>
<p style={{ maxWidth: '700px', margin: '10px auto 0' }}>
A continuación encontrarás información breve sobre diferentes trastornos psicológicos.
Conocer es el primer paso para comprender y apoyar.
</p>
</div>

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{ fontSize: '35px' }}>😰</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>Trastorno de ansiedad</h3>
</div>
<p> 
La ansiedad es una reacción de miedo o inseguridad hacia situaciones estresantes. 
Las personas que padecen de un trastorno de ansiedad suelen tener preocupaciones  
excesivas por ciertas situaciones (debido al trabajo, salud, dinero, relaciones personales)  
y estas preocupaciones afectan negativamente la manera en la que estas personas actúan. 
</p> 
</div> 

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{ fontSize: '35px' }}>😔</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>Depresión</h3>
</div>
<p> 
La depresión es un trastorno que causa una pérdida de interés y un estado de ánimo más bajo. 
Las personas que padecen de depresión usualmente evitan actividades que antes disfrutaban,  
se alejan de sus relaciones sociales, y también suelen tener una baja autoestima. 
</p> 
</div> 

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{ fontSize: '35px' }}>🍽️</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>Trastornos alimenticios</h3>
</div>
<p> 
Los trastornos alimenticios afectan específicamente al comportamiento  
que se tiene hacia la alimentación como son: la Anorexia, la Bulimia, Trastorno por atracón, etc. 
</p>
<div style={{ marginTop: '15px', paddingLeft: '15px', borderLeft: '3px solid #4caf50' }}>
<p><strong>Anorexia:</strong> Miedo a subir de peso, vómito, las personas que padecen anorexia suelen 
hacer ejercicio excesivo.</p>
<p><strong>Bulimia:</strong> Ansiedad por no comer, debilidad física, las personas con bulimia suelen 
purgar lo comido o hacer ejercicio excesivo y sienten culpa después de comer.</p>
</div>
</div> 

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{ fontSize: '35px' }}>⚡</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>TDAH</h3>
</div>
<p> 
El TDAH es un trastorno cuyos síntomas son: dificultad para concentrarse, hiperactividad, incapacidad para 
controlar el propio comportamiento. 
Las personas con TDAH suelen tener dificultades en trabajos escolares y deberes debido a la frecuencia con la 
que se distraen. 
</p> 
</div> 

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{ fontSize: '35px' }}>🧩</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>Autismo</h3>
</div>
<p> 
El autismo es un trastorno que puede provocar dificultades sociales y de conducta,  
las personas con autismo tienen maneras distintas de comunicación y aprendizaje. 
Algunas características son: evitar el contacto visual, dificultad para relacionarse con otras  
personas y dificultad para entender las emociones y sentimientos de las otras personas. 
</p> 
</div> 

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{ fontSize: '35px' }}>🔄</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>TOC</h3>
</div>
<p> 
El trastorno obsesivo-compulsivo hace que algunos pensamientos se vuelvan incontrolables y se vuelvan en 
obsesiones. 
El TOC causa un comportamiento compulsivo en las personas donde se forman obsesiones por el orden, la 
limpieza, y estos realizan rituales relacionados con su obsesión. 
</p> 
</div>

<div style={{
textAlign: 'center',
padding: '20px',
backgroundColor: '#fff3cd',
borderRadius: '10px',
marginTop: '20px',
border: '2px solid #ffc107'
}}>
<div style={{ fontSize: '30px', marginBottom: '10px' }}>⚠️</div>
<p style={{ fontSize: '16px', fontWeight: 'bold', color: '#856404', margin: 0 }}>
Si tú o alguien que conoces experimenta estos síntomas, busca ayuda profesional. No estás solo/a.
</p>
</div>
</div> 
); 
 
case "lugares": 
return ( 
<div> 
<h2 style={styles.sectionTitle}>Lugares de Tratamiento</h2> 
<p>Encuentra centros de atención psicológica en diferentes ciudades de Chihuahua. Selecciona tu ciudad para 
ver la información detallada.</p> 
<LocationSelector /> 
</div> 
); 
 
case "informacion": 
return ( 
<div> 
<div style={{
textAlign: 'center',
padding: '20px',
backgroundColor: '#e8f5e9',
borderRadius: '10px',
marginBottom: '20px'
}}>
<div style={{ fontSize: '60px' }}>🆘🤝</div>
<h2 style={{ ...styles.sectionTitle, borderBottom: 'none', color: '#2e7d32' }}>
Información para externos
</h2>
<p style={{ maxWidth: '700px', margin: '10px auto 0' }}>
Aprende cómo ayudar a alguien que está atravesando una crisis emocional
</p>
</div>

<div style={styles.card}> 
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
<div style={{ fontSize: '40px' }}>❓</div>
<h3 style={{ margin: 0, color: '#2e7d32' }}>¿Qué es una crisis emocional?</h3>
</div>
<p>Una crisis emocional es un estado en el que una persona se siente desbordada por sus emociones, hasta el 
punto de no poder enfrentarlas de manera efectiva. 
Estas crisis pueden generar sentimientos de desesperanza, miedo, confusión y una pérdida de control sobre la 
propia vida.</p> 
</div> 

<div style={styles.card}> 
<h3 style={{ color: '#2e7d32', marginBottom: '20px' }}>🛟 Pasos para manejar una crisis emocional</h3> 

<div style={{
display: 'flex',
flexDirection: 'column',
gap: '20px'
}}>
<div style={{
padding: '20px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '5px solid #4caf50'
}}>
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{
backgroundColor: '#4caf50',
color: 'white',
width: '40px',
height: '40px',
borderRadius: '50%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '20px',
fontWeight: 'bold',
flexShrink: 0
}}>1</div>
<h4 style={{ margin: 0, color: '#2e7d32' }}>Validación emocional</h4>
</div>
<p style={{ marginLeft: '55px' }}>
La primera técnica clave para manejar una crisis emocional es 
validar los sentimientos de la persona. 
Las emociones intensas a menudo se ven acompañadas de una sensación de incomprensión.
</p>
</div>

<div style={{
padding: '20px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '5px solid #4caf50'
}}>
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{
backgroundColor: '#4caf50',
color: 'white',
width: '40px',
height: '40px',
borderRadius: '50%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '20px',
fontWeight: 'bold',
flexShrink: 0
}}>2</div>
<h4 style={{ margin: 0, color: '#2e7d32' }}>Técnicas de respiración</h4>
</div>
<p style={{ marginLeft: '55px' }}>
Las técnicas de respiración profunda y relajación muscular progresiva pueden ayudar a calmar el sistema nervioso y restablecer la sensación de 
control.
</p>
</div>

<div style={{
padding: '20px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '5px solid #4caf50'
}}>
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{
backgroundColor: '#4caf50',
color: 'white',
width: '40px',
height: '40px',
borderRadius: '50%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '20px',
fontWeight: 'bold',
flexShrink: 0
}}>3</div>
<h4 style={{ margin: 0, color: '#2e7d32' }}>Fomentar el autocuidado</h4>
</div>
<p style={{ marginLeft: '55px' }}>
Durante una crisis emocional, las personas pueden descuidar 
su bienestar físico y mental. Promover prácticas de autocuidado es esencial para que el paciente recupere el equilibrio y la resiliencia.
</p>
</div>

<div style={{
padding: '20px',
backgroundColor: '#e8f5e9',
borderRadius: '8px',
borderLeft: '5px solid #4caf50'
}}>
<div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
<div style={{
backgroundColor: '#4caf50',
color: 'white',
width: '40px',
height: '40px',
borderRadius: '50%',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '20px',
fontWeight: 'bold',
flexShrink: 0
}}>4</div>
<h4 style={{ margin: 0, color: '#2e7d32' }}>Reestructuración cognitiva</h4>
</div>
<p style={{ marginLeft: '55px' }}>
La reestructuración cognitiva es una técnica derivada de la 
terapia cognitivo-conductual (TCC) que puede ayudar a las personas a identificar y cambiar los pensamientos negativos o distorsionados que 
están exacerbando su crisis emocional.
</p>
</div>
</div>
</div>

<div style={{
textAlign: 'center',
padding: '25px',
backgroundColor: '#d1f2eb',
borderRadius: '10px',
marginTop: '20px',
border: '2px solid #4caf50'
}}>
<div style={{ fontSize: '40px', marginBottom: '15px' }}>🦦💚🦦</div>
<p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32', margin: '0 0 10px 0' }}>
Recuerda: Tu presencia y apoyo pueden hacer la diferencia
</p>
<p style={{ fontSize: '14px', color: '#2d5016', margin: 0 }}>
Como las nutrias que se apoyan mutuamente, podemos ayudar a quienes más lo necesitan
</p>
</div>
</div> 
); 
 
case "encuesta":
return (
<div>
<h2 style={styles.sectionTitle}>Encuesta de Satisfacción del Taller</h2>
<p>Tu opinión es muy importante para nosotros. Por favor, ayúdanos a mejorar completando esta breve encuesta.</p>
<EncuestaForm />
</div>
);

case "creditos":
return (
<div>
<h2 style={styles.sectionTitle}>Créditos</h2> 
<p>Agradecimientos a las instituciones</p> 
<div style={styles.card}> 
<h3>Instituciones colaboradoras</h3> 
<ul> 
<li>La AMIIF (Asociación Mexicana de Industrias de Investigación Farmacéutica)</li> 
<li>Real Academia Española (RAE)</li> 
<li>ONU, 2021</li> 
<li>Doctor Marcelo Valencia, investigador en Ciencias Médicas del Instituto Nacional de Psiquiatría Ramón de 
la Fuente</li> 
<li>Simon Kung, M.D., 2025</li> 
<li>Organización Mundial de la Salud, 2025</li> 
<li>IMSS, 2023</li> 
<li>Gilbert, Patel, Farmer y Lu, 2015</li> 
<li>Alviter, L., Acosta, C. y Rodríguez, E., 2023</li> 
<li>Amezcua, 2024</li> 
<li>Valdez, Villalobos, Arenas, Benjet y Vázquez, 2023</li> 
<li>Del Longo, N., 2011; Monzani, M., Benatti, F., et al., 2015</li> 
<li>María de los Ángeles Aragón, 2025</li> 
<li>Instituto Nacional de la Salud Mental (NIMH)</li> 
<li>Departamento de Salud y Servicios Humanos de los Estados Unidos (HHS)</li> 
</ul> 
</div> 
<div style={styles.card}> 
<h3>Fuentes en línea</h3> 
<ul> 
<li>https://ciep.mx/salud-mental-presupuesto-y-politica-nacional/</li> 
<li>https://www.who.int/es/news-room/fact-sheets/detail/mental-disorders</li> 
<li>https://www.wellnite.com/es-mx/post/salud-mental-en-adultos-manejo-y-estrategias-para-una-vida
plena</li> 
<li>https://psicomagister.com/como-manejar-crisis-emocionales/</li> 
</ul> 
</div> 
</div> 
); 
 
default: 
return ( 
<div> 
<h2 style={styles.sectionTitle}>Bienvenido</h2> 
<p>Selecciona una sección del menú para explorar el contenido.</p> 
</div> 
); 
} 
}; 
 
return <div style={styles.mainContent}>{renderContent()}</div>; 
}; 
 
const Sidebar = () => { 
return ( 
<aside style={styles.sidebar}> 
<div style={{ textAlign: 'center', marginBottom: '20px' }}>
<div style={{ fontSize: '50px' }}>🦦</div>
<h3 style={{ ...styles.sectionTitle, borderBottom: 'none', textAlign: 'center' }}>Recursos de Ayuda</h3>
</div>

<div style={styles.card}> 
<div style={{ textAlign: 'center', marginBottom: '10px' }}>
<div style={{ fontSize: '40px' }}>📞</div>
</div>
<h4 style={{ color: '#2e7d32', textAlign: 'center' }}>Líneas de Ayuda</h4>
<div style={{ 
backgroundColor: '#ffebee', 
padding: '15px', 
borderRadius: '8px',
marginBottom: '10px',
border: '2px solid #e53935'
}}>
<p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#c62828' }}>🆘 Línea de la vida</p>
<p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#c62828' }}>800-911-2000</p>
<p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Disponible 24/7</p>
</div>
<div style={{ 
backgroundColor: '#e8f5e9', 
padding: '15px', 
borderRadius: '8px',
border: '2px solid #4caf50'
}}>
<p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#2e7d32' }}>💚 IMPASS</p>
<p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#2e7d32' }}>(614) 194-02-00</p>
<p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Servicio de Chihuahua</p>
</div>
</div> 

<div style={styles.card}> 
<div style={{ textAlign: 'center', marginBottom: '10px' }}>
<div style={{ fontSize: '40px' }}>🕐</div>
</div>
<h4 style={{ color: '#2e7d32', textAlign: 'center' }}>Horarios de Atención</h4> 
<div style={{ fontSize: '14px' }}>
<p style={{ 
margin: '0 0 8px 0', 
padding: '10px',
backgroundColor: 'white',
borderRadius: '5px'
}}>
<strong>Lunes a Viernes:</strong><br/>
9:00 - 18:00
</p> 
<p style={{ 
margin: 0, 
padding: '10px',
backgroundColor: 'white',
borderRadius: '5px'
}}>
<strong>Sábados:</strong><br/>
10:00 - 14:00
</p>
</div>
</div> 

<div style={styles.card}> 
<div style={{ textAlign: 'center', marginBottom: '10px' }}>
<div style={{ fontSize: '40px' }}>📊</div>
</div>
<h4 style={{ color: '#2e7d32', textAlign: 'center' }}>Dato Importante</h4> 
<div style={{
backgroundColor: '#fff3cd',
padding: '15px',
borderRadius: '8px',
border: '2px solid #ffc107',
textAlign: 'center'
}}>
<p style={{ 
fontSize: '32px', 
fontWeight: 'bold', 
color: '#856404',
margin: '0 0 5px 0'
}}>4.4%</p>
<p style={{ 
fontSize: '14px', 
color: '#856404',
margin: 0,
lineHeight: '1.4'
}}>
de la población mundial padece actualmente un trastorno de ansiedad
</p>
</div>
</div>

<div style={{
...styles.card,
backgroundColor: '#c8e6c9',
textAlign: 'center'
}}>
<div style={{ fontSize: '30px', marginBottom: '10px' }}>🦦💙</div>
<p style={{ 
fontSize: '14px', 
fontWeight: 'bold',
color: '#2e7d32',
margin: 0,
lineHeight: '1.5'
}}>
"No estás solo/a.<br/>
Hay ayuda disponible."
</p>
</div>
</aside> 
); 
}; 
 
const Footer = () => { 
return ( 
<footer style={styles.footer}> 
<p>Nutrias en Equilibrio - Campaña de Apoyo Psicológico</p> 
<p>Contacto: nutriasenequilibrio.gmail | IMPASS: (614) 194-02-00</p> 
<p>&copy; 2025 Todos los derechos reservados</p> 
</footer> 
); 
}; 
 
// Componente principal 
function App() { 
const [currentSection, setCurrentSection] = useState("inicio"); 
 
return ( 
<div style={styles.rootContainer}> 
<CrisisBanner /> 
<Header /> 
<Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} /> 
<div style={styles.contentContainer}> 
<MainContent currentSection={currentSection} /> 
<Sidebar /> 
</div> 
<Footer /> 
</div> 
); 
} 
 
export default App;