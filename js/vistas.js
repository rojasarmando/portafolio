$(document).ready(()=>{
    
    loadComponent("conocimiento")

    
})



var loadComponent = (tag) =>{

    $.get(`views/${tag}.view.html`).then( rsp =>{
        $(`#${tag}`).html(rsp)
    })
}



var conocimientoComponent = data =>{

   let template = `<div class="col-lg-3 col-md-6 text-center">
    <div class="service-box mt-5 mx-auto">
        <i class="fa fa-4x fa-:icono: text-primary mb-3 sr-icons"></i>
         <h3 class="mb-3"> :titulo: </h3>  
        </div>
        </div>`;

    let resultado = "" ;
}