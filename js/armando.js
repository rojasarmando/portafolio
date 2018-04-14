$(document).ready(function() {
	
	

	localStorage['idioma'] = 'es'

	// variable array para el texto
	
	let texto = [

		{
			'id' : '#unPocoSobreMi',
			'es' : 'Mi nombre es Armando Rojas, tengo 20 años de edad, soy venezolano, estudio ingeniería de sistemas donde actualmente curso el 7mo semestre de la carrera, tengo conocimiento acerca de Turbo Pascal',
			'en' : 'My name is Armando Rojas, I am 20 years old, I am Venezuelan, I study systems engineering where I am currently studying the 7th semester of the race, I have knowledge about '
		},
		{
			'id' : '#unPocoSobreMi2',
			'es' : 'Tengo conocimientos acerca de Base de Datos, Redes, Mantenimiento y Reparación de Equipos, y Seguridad Informática.',
			'en' : 'I have knowledge about Database, Networks, Maintenance and Repair of Equipment, and Computer Security.'
		},
		{
			'id' : '#unPocoSobreMi3',
			'es' : 'Inicie en 2015, mi primer lenguaje de programación fue Turbo Pascal, donde mi proyecto final de clases, aunque era en consola, decidí hacer lo más parecido a un programa de escritorio, con poco conocimiento y creatividad, logré hacer un pequeño sistema de facturación, con esa gran diferencia al resto de los equipos que es el único con colores y un menú que se puede mover con el teclado, el código del proyecto está en mi cuenta github disponible para quien desee  verlo o usarlo. Para mitad del año 2015, comenzo mi curiosidad por otros lenguajes, es por ello que decidi a aprender lenguaje C, y luego inicié con HTML con cursos de CodeAcademy donde aprendí los fundamentos de HTML5 (HTML, CSS, JS).',
			'en' : 'Start in 2015, my first programming language was Turbo Pascal, where my final project of classes, although it was in console, I decided to do the closest thing to a desktop program, with little knowledge and creativity, I managed to make a small billing system, with that great difference to the rest of the equipment that is the only one with colors and a menu that can be moved with the keyboard, the code of the project is in my github account available for those who want to see it or use it. For half of 2015, I started my curiosity for other languages, that is why I decided to learn C language, and then I started with HTML with CodeAcademy courses where I learned the basics of HTML5 (HTML, CSS, JS).'
		},
		{
			'id': '#unPocoSobreMi4',
			'es' : 'Tambien surgio mi curiosidad por sistemas operativos basados en LINUX, es por ello que aprendi un poco sobre el uso del terminal. En aquel momento mientras revisaba foros, encontre uno acerca de python, donde mencionaba las grandes cosas que se hicieron en este lenguaje y su sintaxis limpia, es por eso que decidi aprender PYTHON, y asi sucevimante ha sido a lo largo de mi carrera, mi curiosidad por aprender cosas nuevas, donde actualmente realizo cursos en Platzi.',
		
			'en' : "I was also curious about operating systems based in LINUX, that is why I learned a little about the use of the terminal. At that time while reviewing forums, I found one about python, where I mentioned the great things that were done in this language and its clean syntax, that's why I decided to learn PYTHON, and that has been so throughout my career, my curiosity to learn new things, where I currently do courses in Platzi."
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
		},
		{
			'id' : '#cedula',
			'es' : 'Cédula',
			'en' : 'Identification Card'
		},
		{
			'id' : '#edad',
			'es' : 'Edad',
			'en' : 'Age'
		},
		{
			'id' : '#telefono',
			'es' : 'Teléfono',
			'en' : 'Phone'
		},
		{
			'id' : '#datosBasicos',
			'es' : 'Información básica',
			'en' : 'Basic information'
		}
		,
		{
			'id' : '#acercaDemi',
			'es' : 'Acerca de mi',
			'en' : 'About me'
		},
		{
			'id' : '.btn1',
			'es' : 'Presentación',
			'en' : 'Presentation'
		}
	
	
	]




	

 
	// español = en
	// ingles = es

	/*Cambair el head*/


	$("#botonIdioma").idiomas(texto)




	$(document).scroll(function(event) {

		let posicion = $(document).scrollTop();

		if ($(document).scrollTop() == 0 ){

			
			$("#menu2").addClass('invisible')
			$("#menu").removeClass('invisible')

		}
		else if ($(document).scrollTop() > 100 ){

			$("#menu").addClass('invisible')
			$("#menu2").removeClass('invisible')

		} 
	});

	


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