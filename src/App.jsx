import { useState } from "react";
import "./App.css"; 
 
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
mapPlaceholder: { 
width: "100%", 
height: "200px", 
backgroundColor: "#c8e6c9", 
borderRadius: "5px", 
display: "flex", 
alignItems: "center", 
justifyContent: "center", 
marginTop: "10px", 
color: "#2e7d32", 
fontWeight: "bold", 
} 
}; 
 
// Datos de los lugares de tratamiento 
const locationData = [ 
{ 
id: 1, 
name: "Chihuahua Ortiz Mena", 
address: "Blvrd Antonio Ortiz Mena 3403, Quintas del Sol, Campestre-Lomas, 31214 Chihuahua, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 18:00", 
services: ["Terapia individual", "Consulta psicológica"] 
}, 
{ 
id: 2, 
name: "Chihuahua División del Nte", 
address: "Cesar A. Sandino 1306-I, División del Nte. I Etapa, 31064 Chihuahua, Chih.", 
schedule: "24 horas", 
services: ["Emergencias", "Terapia de crisis", "Hospitalización"] 
}, 
{ 
id: 3, 
name: "Chihuahua Zarco", 
address: "Av. Francisco Zarco 3003, Zarco, 31020 Chihuahua, Chih.", 
schedule: "Lunes a Viernes: 10:00 - 19:00", 
services: ["Terapia individual", "Familiar"] 
}, 
{ 
id: 4, 
name: "Juárez", 
address: "Av. de Las Fuentes 1543, Fuentes del Valle, 32500 Juárez, Chih.", 
schedule: "Lunes a Sábado: 9:00 - 20:00", 
services: ["Terapia individual", "Talleres", "Orientación"] 
}, 
{ 
id: 5, 
name: "Aldama", 
address: "Ojinaga 1083, Centro, 32910 Juan Aldama, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 17:00", 
services: ["Terapia comunitaria", "Grupos de apoyo"] 
}, 
{ 
id: 6, 
name: "Camargo", 
address: "Río Urique 223, Río Florido, 33720 Santa Rosalía de Camargo, Chih.", 
schedule: "Lunes a Viernes: 10:00 - 18:00", 
services: ["Terapia individual", "Evaluación psicológica"] 
}, 
{ 
id: 7, 
name: "Casas Grandes", 
address: "Minerva 516, Centro, 31700 Nuevo Casas Grandes, Chih.", 
schedule: "Lunes a Sábado: 9:00 - 19:00", 
services: ["Consulta psicológica", "Acompañamiento"] 
}, 
{ 
id: 8, 
name: "Cuauhtémoc", 
address: "Periférico 220-A, Emiliano Zapata, 31579 Cuauhtémoc, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 18:00", 
services: ["Terapia integral", "Seguimiento"] 
}, 
{ 
id: 9, 
name: "Delicias", 
address: "Av. 6a. Sur 303, Sur 1, 33000 Delicias, Chih.", 
schedule: "Lunes a Viernes: 10:00 - 19:00", 
services: ["Mindfulness", "Terapia cognitiva", "Meditación"] 
}, 
{ 
id: 10, 
name: "Meoqui", 
address: "Esquina con Matamoros, C. Ricardo Salgado 2312, San Francisco, 33130 Pedro Meoqui, Chih.", 
schedule: "Lunes a Viernes: 9:00 - 17:00", 
services: ["Terapia individual", "Familiar", "Grupos"] 
}, 
{ 
id: 11, 
name: "Parral", 
address: "Del Ojito, Centro, 33850 Hidalgo del Parral, Chih.", 
schedule: "Lunes a Sábado: 9:00 - 18:00", 
services: ["Consulta psicológica", "Orientación", "Primera ayuda psicológica"] 
} 
]; 
 
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
 
<div style={dropdownStyles.mapPlaceholder}> 
Mapa de {selectedLocation.name} 
</div> 
</div> 
)} 
</div> 
); 
}; 
 
// Componentes de la página 
const CrisisBanner = () => { 
return ( 
<div style={styles.crisisBanner}> 
�
� ¿Estás en crisis? Llama al: <strong>(614) 194-02-00</strong> - Disponible 24/7 
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
{ id: "lugares", name: "Lugares de Tratamiento" }, 
{ id: "Taller", name: "Taller" }, 
{ id: "trastornos", name: "Trastornos" }, 
{ id: "informacion", name: "Información para externos" }, 
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
case "inicio": 
return ( 
<div> 
<h2 style={styles.sectionTitle}>Bienvenido a Nutrias en Equilibrio</h2> 
<p> 
Este proyecto busca reducir la desinformación y el estigma asociados a los trastornos mentales,  
fomentando la empatía y la comunicación efectiva entre quienes los padecen y su entorno.  
Asimismo, pretende orientar a la población hacia espacios de apoyo profesional y recursos de emergencia,  
fortaleciendo la educación emocional y el bienestar colectivo.  
</p> 
<div style={styles.card}> 
<h3>Acerca de nosotros</h3> 
<p> 
La campaña quiere ayudar a que más personas entiendan qué hacer cuando alguien cercano necesita apoyo 
emocional 
y a que quienes lo viven aprendan a comunicarse, expresarse y pedir ayuda. 
El objetivo es que todos tengamos más herramientas para escucharnos, 
apoyarnos y reconocer que la salud mental importa tanto como la física.  
</p> 
</div> 
</div> 
); 
case "Taller": 
return( 
<div> 
<h2 style={styles.sectionTitle}>Informacion de nuestro taller </h2> 
<div style={styles.card}> 
<h3>De que trata nuestro taller</h3> 
<p>El de nuestro taller es informar y concientizar a las personas acerca de los trastornos mentales 
y sus complicaciones para fomentar el apoyo a quienes padecen de alguno de estos trastornos mentales.</p> 
</div> 
<div style={styles.card}> 
<h3>Actividades de nuestro taller</h3> 
<p>En nuestro taller se encontraran varias actividades para poder saber como controlar tu cuerpo y tu mente 
en caso de una crisis emcional, al igual que enseñaremos que hacer  
para ayudar a una persona que este pasando por una crisis emocional, contamos con varios materiales y un 
peluche que te indica que tanta ansiedad estas sufriendo.</p> 
<ul>Meditación</ul> 
<ul>Respiraciones para tranquilizar</ul> 
<ul>Aprender a tener comunicación efectiva</ul> 
<ul>Uso de materiales anti-estres</ul> 
<ul>Platica informativa</ul> 
<ul>Conclusión grupal</ul> 
</div> 
</div> 
); 
 
 
case "trastornos": 
return ( 
<div> 
<h2 style={styles.sectionTitle}>Información sobre Trastornos</h2> 
<p> 
A continuación encontrarás información breve sobre diferentes trastornos psicológicos. 
</p> 
<div style={styles.card}> 
<h3>Trastorno de ansiedad</h3> 
<p> 
La ansiedad es una reacción de miedo o inseguridad hacia situaciones estresantes. 
Las personas que padecen de un trastorno de ansiedad suelen tener preocupaciones  
excesivas por ciertas situaciones (debido al trabajo, salud, dinero, relaciones personales)  
y estas preocupaciones afectan negativamente la manera en la que estas personas actúan. 
</p> 
</div> 
<div style={styles.card}> 
<h3>Depresión</h3> 
<p> 
La depresión es un trastorno que causa una pérdida de interés y un estado de ánimo más bajo. 
Las personas que padecen de depresión usualmente evitan actividades que antes disfrutaban,  
se alejan de sus relaciones sociales, y también suelen tener una baja autoestima. 
</p> 
</div> 
<div style={styles.card}> 
<h3>Trastornos alimenticios</h3> 
<p> 
Los trastornos alimenticios afectan específicamente al comportamiento  
que se tiene hacia la alimentación como son: la Anorexia, la Bulimia, Trastorno por atracón, etc. 
Los síntomas de la Anorexia son: Miedo a subir de peso, vómito, las personas que padecen anorexia suelen 
hacer ejercicio excesivo. 
Los síntomas de la Bulimia son: Ansiedad por no comer, debilidad física, las personas con bulimia suelen 
purgar lo comido o hacer ejercicio excesivo y sienten culpa después de comer. 
</p> 
</div> 
<div style={styles.card}> 
<h3>TDAH</h3> 
<p> 
El TDAH es un trastorno cuyos síntomas son: dificultad para concentrarse, hiperactividad, incapacidad para 
controlar el propio comportamiento. 
Las personas con TDAH suelen tener dificultades en trabajos escolares y deberes debido a la frecuencia con la 
que se distraen. 
</p> 
</div> 
<div style={styles.card}> 
<h3>Autismo</h3> 
<p> 
El autismo es un trastorno que puede provocar dificultades sociales y de conducta,  
las personas con autismo tienen maneras distintas de comunicación y aprendizaje. 
Algunas características son: evitar el contacto visual, dificultad para relacionarse con otras  
personas y dificultad para entender las emociones y sentimientos de las otras personas. 
</p> 
</div> 
<div style={styles.card}> 
<h3>TOC</h3> 
<p> 
El trastorno obsesivo-compulsivo hace que algunos pensamientos se vuelvan incontrolables y se vuelvan en 
obsesiones. 
El TOC causa un comportamiento compulsivo en las personas donde se forman obsesiones por el orden, la 
limpieza, y estos realizan rituales relacionados con su obsesión. 
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
<h2 style={styles.sectionTitle}>Información para externos</h2> 
<p>Pasos para saber manejar una crisis</p> 
<div style={styles.card}> 
<h3>¿Que es una crisis emocional?</h3> 
<p>Una crisis emocional es un estado en el que una persona se siente desbordada por sus emociones, hasta el 
punto de no poder enfrentarlas de manera efectiva. 
Estas crisis pueden generar sentimientos de desesperanza, miedo, confusión y una pérdida de control sobre la 
propia vida.</p> 
</div> 
<div style={styles.card}> 
<h3>Pasos para manejar una crisis emocional</h3> 
<ul> 
<li><strong>Validacion emocional:</strong>La primera técnica clave para manejar una crisis emocional es 
validar los sentimientos de la persona. 
Las emociones intensas a menudo se ven acompañadas de una sensación de incomprensión</li> 
<li><strong>Tecnicas de respiracion:</strong>Las técnicas de respiración profunda  
y relajación muscular progresiva pueden ayudar a calmar el sistema nervioso y restablecer la sensación de 
control.</li> 
<li><strong>Fomentat en autocuidado:</strong>Durante una crisis emocional, las personas pueden descuidar 
su bienestar físico y mental.  
Promover prácticas de autocuidado es esencial para que el paciente recupere el equilibrio y la resiliencia.</li> 
<li><strong>Reestructuracion cognitiva:</strong>La reestructuración cognitiva es una técnica derivada de la 
terapia cognitivo-conductual (TCC)  
que puede ayudar a las personas a identificar y cambiar los pensamientos negativos o distorsionados que 
están exacerbando su crisis emocional.</li> 
</ul> 
</div> 
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
<h3 style={styles.sectionTitle}>Secciones extras</h3> 
<div style={styles.card}> 
<h4>Líneas de Ayuda</h4> 
<p>📞 Línea de la vida: 800-911-2000</p> 
<p>📞 IMPASS: (614) 194-02-00</p> 
</div> 
<div style={styles.card}> 
<h4>Horarios de Atención</h4> 
<p>Lunes a Viernes: 9:00 - 18:00</p> 
<p>Sábados: 10:00 - 14:00</p> 
</div> 
<div style={styles.card}> 
<h4>Datos generales</h4> 
<p>4,4% de la población mundial padece actualmente un trastorno de ansiedad</p> 
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
