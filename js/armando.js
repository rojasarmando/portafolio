$(document).ready(function() {
	
	

	localStorage['idioma'] = 'es'

	// variable array para el texto
	
	let texto = [

		{
			'id' : '#unPocoSobreMi',
			'es' : 'Mi nombre es Armando Rojas, tengo 20 años de edad, soy Venezolano viviendo actualmente en un pueblito llamada Turén ubicado en el estado Portuguesa, estudio ingenieria de sistemas donde actualmente curso el 7mo semestre de la carrera, a lo largo de mis 4 años en la universidad he aprendido diversos lenguajes de programacion y tecnologias para el desarrollo de aplicaciones tanto entorno web como para dispositivos moviles, donde puedo mencionar.',
			'en' : 'My name is Armando Rojas, I am 20 years old, I am Venezuelan currently living in a small town called Turén located in the Portuguese state, I study systems engineering where I am currently studying the 7th semester of the career, during my 4 years in the university I have learned different programming languages ​​and technologies for the development of applications both web environment and mobile devices, where I can mention. '

		},
		{
			'id' : '#unPocoSobreMi2',
			'es' : 'Tengo conocimientos avanzados en Base de Datos, Redes, Mantenimiento y Reparacion de equipos, Seguridad Informatica y organizacion de un equipo de trabajo, las cuales las adquiri durante mis 4 años en la universidad.',
			'en' : 'I have advanced knowledge in Database, Networks, Maintenance and Repair of equipment, Computer Security and organization of a work team, which I acquired during my 4 years in the university.'
		},
		{
			'id' : '#unPocoSobreMi3',
			'es' : "Comenze en este mundo tan maravilloso del desarrollo de aplicacion en 2015, con mi primer lenguaje de programacion, el cual le tengo mucho cariño, aunque muchos lo desprecien para mi fue de gran ayuda el cual es Turbo Pascal 7, no su version FREE sino la original, aquella que posee un editor de texto por defecto con un fondo azul y letras amarillas, mi primera linea de codigo fue el tipico hola mundo - writeln('Hola Mundo xD'); - mi proyecto final de clases aunque era en consola decide hacer lo mas parecido a un programa de escritorio, con poco conocimiento y creatividad logre hacer un pequeño sistema de factura, con esa gran diferencia al resto de los equipos ya que era el unico con colores y un menu que podia moverse con las flechas del teclado, el codigo del proyecto esta en mi cuenta github disponible para quien desee verlo o usarlo. Para mitad del año 2015 comenzo mi curiosidad por la forma como realmente se programa, como llegar a ser un programador, es por ello que inicie a aprender lenguaje C, luego de pasar practicando dicho lenguaje inicie con HTML con cursos de CodeAcademy son gratuitos y las clases son muy dinamicas, aprendi los fundamentos de HTML5 (HTML, CSS , JS). Posteriormente comenzo mi curiosidad por el tema de seguridad, los grandes hackers, es por ello que inicio mi investigacion hacerca de BAT (archivos por lotes ejecutables).",
			'en' : "I started in this wonderful world of application development in 2015, with my first programming language, which I'm very fond of, although many people despise it for me it was a great help, which is Turbo Pascal 7, not its FREE version but the original, one that has a default text editor with a blue background and yellow letters, my first line of code was the typical hello world - writeln ('Hello World xD'); - my final class project, even though it was on the console, decided to do the closest thing to a desktop program, with little knowledge and creativity I managed to make a small invoice system, with that big difference to the rest of the equipment since it was the only one with colors and a menu that could be moved with the arrow keys, the project code is in my github account available for those who want to see it or use it. For half of 2015 I started my curiosity about how to really program, how to become a programmer, that is why I started to learn C language, after practicing that language I started with HTML with CodeAcademy courses and they are free. classes are very dynamic, I learned the basics of HTML5 (HTML, CSS, JS). Later I started my curiosity about the security issue, the big hackers, that is why I start my research about BAT (executable batch files)."
		},
		{
			'id': '#unPocoSobreMi4',
			'es' : 'Por otra parte en la universidad comenzo mi curiosidad por sistemas operativos basados en LINUX, me agrada aprender los comandos en consolas, es por ello que aprendi a usar BASH. Por otra parte me agrado la simplicidad al momento de usar JS, pero comprendi sus limitantes, es por eso que decidi aprender PYTHON, el cual me encanto tenia la simplicidad de JS pero teniendo muchas caracteristicas similares al lenguaje C, aparte de un monton de librerias que posee, y asi sucevimante fue con los otros lenguajes y frameworks, mi curiosidad por trabajar con una nueva tecnologia, actualmente soy estudiante universitario de dia, y de noche soy Estudiante de Platzi.',
			'en' : "On the other hand in the university I started my curiosity about LINUX based operating systems, I like to learn the commands in consoles, that is why I learned to use BASH. On the other hand I liked the simplicity at the time of using JS, but I understood its limitations, that's why I decided to learn PYTHON, which I loved had the simplicity of JS but having many characteristics similar to C language, apart from a lot of libraries I have, and so sucevimante was with the other languages ​​and frameworks, my curiosity to work with a new technology, I am currently a university student day, and at night I am a student of Platzi."
		},

		{
			'id' : '#head',
			'es' : "¡Hola! mi nombre es Armando Rojas",
			'en' : "Hi! mi name is Armando Rojas"
		},
		{
			'id' : '#head2',
			'es' : "Soy un estudiante de Ingenieria de Sistemas",
			'en' : "I'm a student of systems engineering"
		},
		{
			'id' : '#botonIdioma',
			'es' : "Change to English",
			'en' : "Cambiar a Español"
		},
		{
			'id' : '#textoAyuda',
			'es' : "Click aquí para cambiar de idioma",
			'en' : "Click here to change the language"
		}
		,
		{
			'id' : '#datosBasicos',
			'es' : "Información básica",
			'en' : "Basic informatione"
		}
		,
		{
			'id' : '#pais',
			'es' : "Pais",
			'en' : "Country"
		},
		{
			'id' : '#nombre',
			'es' : "Nombre",
			'en' : "Name"
		}
	
	]




	

 
	// español = en
	// ingles = es

	/*Cambair el head*/


	$("#botonIdioma").idiomas(texto)




	

	


});



(function($){

	

	$.fn.extend({
		
		idiomas: function(texto){

			return this.each(function() {
				$(this).click(function() {

					if( localStorage['idioma'] == 'es' ) { 
						
						
						localStorage.clear() 
						localStorage['idioma'] = 'en' 
						
					}
					else {

						localStorage.clear() 
						localStorage['idioma'] = 'es'
	
					}

					for (let i = 0; i <texto.length; i++) 

	   					$(texto[i].id).fadeOut('slow', () => {

							$(texto[i].id)
								.html(texto[i][localStorage.idioma])
								.fadeIn('slow', () => {})
						})

   					
  				 })
			})
		}

		//------------------------------------


	});
})(jQuery);