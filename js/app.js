var app = angular.module('portafolio',[])

app.controller('principal', ( $rootScope  )=>{
     // Por Defecto Español
    $rootScope.idioma = 'es'


})

app.controller('menu', ($scope, $rootScope) =>{
   
    $scope.home = "Armando Rojas"; 
    
    $scope.btnCambiarIdioma = {
        'es' : "Change to English" , 
        'in' : "Cambiar a Español"
    }

    $scope.botonera = [
        { "titulo" : { 'es' : 'Conocimiento' , 'in' : 'Ni puta Idea' }   }, 
        { "titulo" : { 'es' : 'Portfolio   ' , 'in' : 'Ni puta Idea' }   }, 
        { "titulo" : { 'es' : 'Curriculum'   , 'in' : 'Ni puta Idea' }   }
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
    // Por Defecto Español
    $scope.titulo = {
        'es' : 'Mi Conocimiento' ,
        'in' : 'My ... '
    };

    // Service
    $http.get('./views/conocimiento.json').then(function(res){ 
        $scope.arrayConocimiento = angular.fromJson(res.data)
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
        { es: "Version Corta"    , in: "No Se"  },
        { es: "Version Completa" , in: "No Se"  },
        { es: "Imprimir"         , in: "No Se"  }
        ]

    
})





