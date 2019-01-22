var app = angular.module('portafolio',[])

app.controller('principal', ( $rootScope  )=>{
     // Por Defecto Español
    $rootScope.idioma = 'es'


})

app.controller('menu', ($scope, $rootScope) =>{
   
    $scope.home = "Armando Rojas"; 
    // Botonera 
    $scope.botonera = [
        {'titulo' : 'Conocimiento' , ref : '#services'   }, 
        {'titulo' : 'Portafolio' , ref : '#services'   }, 
        {'titulo' : 'Curriculum' , ref : '#services'   }, 
        {'titulo' : 'Change to English'   }, 
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
    'es' : ' Mi nombre es Armando Rojas, Soy Ingeniero de Sistemas,' ,
    'in' : ' My name is Armando Rojas, I am Ingeniero de Sistemas,'
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
        console.log($scope.arrayConocimiento)
    });


    
})





