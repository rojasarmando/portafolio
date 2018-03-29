$(document).ready(function() {
	
	

	localStorage['idioma'] = 'es'

	// variable array para el texto
	
	let texto = [

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