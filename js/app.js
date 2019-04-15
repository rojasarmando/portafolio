var app = angular.module('portafolio',[])

app.controller('principal', ( $rootScope  )=>{
     // Por Defecto Español
    $rootScope.idioma = 'es'
    $rootScope.principal = "Armando Rojas - 2019"

    // fecha 
    let date = new Date(); 
  
    if( parseInt(date.getFullYear()) > 2018 )  
        $rootScope.inicio = "Armando Rojas - "  + date.getFullYear()

      


})

app.controller('menu', ($scope, $rootScope) =>{
   
    $scope.home = "Armando Rojas"; 
    
    $scope.btnCambiarIdioma = {
        'es' : "Change to English" , 
        'in' : "Cambiar a Español"
    }

    $scope.botonera = [
        { "titulo" : { 'es' : 'Conocimiento' , 'in' : 'Knowledge' }   }, 
        { "titulo" : { 'es' : 'Portafolio   ' , 'in' : 'Portfolio' }   }, 
        { "titulo" : { 'es' : 'Curriculum'   , 'in' : 'Curriculum' }   },
        { "titulo" : { 'es' : 'Cursos'   , 'in' : 'Courses' }   }
    ]

    $scope.cambiarIdioma = () =>{
        if($rootScope.idioma == 'es') $rootScope.idioma = 'in'
        else $rootScope.idioma = 'es'
    }
})


app.controller('home', ($scope ) =>{

    // Por Defecto Español
   $scope.titulo = {
       'es' : '¡Hola!' ,
       'in' : 'Hi!'
   };
   $scope.subTitulo = {
    'es' : [
        ' Mi nombre es Armando Rojas', 
        'y Soy Desarrollador Backend'
    ] ,
    'in' : [
        ' My name is Armando Rojas', 
        'and I am Developer'
    ] ,
   };
})


app.controller('conocimiento', ( $scope , $http )=>{
 
    // Service
    $http.get('./views/conocimiento.json').then(function(res){ 
        $scope.arrayConocimiento = angular.fromJson(res.data)
    });


    
})

app.controller('cursos', ( $scope , $http )=>{
  

    // Service
    $http.get('./views/portafolio.json').then(function(res){ 
        $scope.arrayPortafolio = angular.fromJson(res.data)
    });


    
})

app.controller('portafolio', ( $scope , $http )=>{
    // Por Defecto Español
    $scope.titulo = {
        'es' : 'Mi Conocimiento' ,
        'in' : 'My ... '
    };

    // Service
    $http.get('./views/portafolio.json').then(function(res){ 
        $scope.arrayPortafolio = angular.fromJson(res.data)
    });


    
})


app.controller('descarga', $scope  =>{
    // Por Defecto Español
    $scope.titulo = {
        'es' : 'Descarga Mi Curriculum' ,
        'in' : 'Download My Curriculum '
    };

    // Service
    $scope.botonera = [
        { es: "Descargar"         , in:  "Download" , link: "img/cv2019.pdf" }
        ]

    
})





