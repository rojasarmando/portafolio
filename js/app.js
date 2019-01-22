var app = angular.module('portafolio',[])

app.controller('principal', ( $scope )=>{

 
    $scope.titulo = 'ejemplo'
})


app.controller('menu', ($scope) =>{



    $scope.home = "Armando Rojas"; 

    // Botonera 
    $scope.botonera = [
        {'titulo' : 'Conocimiento' , ref : '#services'   }, 
        {'titulo' : 'Portafolio' , ref : '#services'   }, 
        {'titulo' : 'Curriculum' , ref : '#services'   }, 
        {'titulo' : 'Change to English'   }, 
    ]
})