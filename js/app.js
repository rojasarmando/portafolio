var app = angular.module('portafolio',[])

app.controller('principal', ( $scope , $rootScope  )=>{
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


app.controller('home', ($scope, $rootScope) =>{

    // Por Defecto Español
   $scope.titulo = {
       'es' : '¡Hola!' ,
       'in' : 'Hi!'
   }


})