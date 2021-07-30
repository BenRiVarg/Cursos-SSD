//Archivo para editar los quizzes
var numeroPreguntasQuizz=document.getElementById("npQuizz").textContent;
setNumeroPreguntas(numeroPreguntasQuizz);
//console.log(numeroPreguntasQuizzes);
//Proceso especial para envío de imágenes
previsualizarITEdicion();

function editarIT(){
   
    var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoIT");
    
    
    //Clasificación de los elementos enviados para no tener conflictos en la request
    for(i=0;i<cuestionarios.length;i++){
    
    //Se agrega el tipo de pregunta por medio de un elemento hidden
    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoIT";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);
    
    //Variable para diferenciar del proceso de antiguas preguntas de nuevas
    var pivoteProceso=cuestionarios[i].querySelectorAll("p.procesoIT")[0];

    var instrucciones=cuestionarios[i].querySelectorAll("input.instrucciones")[0];

        instrucciones.name="instrucciones"+contador;

       //console.log(instrucciones.value);

    if(!pivoteProceso){
        //Pregunta Nueva
        console.log("Pregunta Nueva");
        //Captura de la imagen
        var imagen = cuestionarios[i].querySelectorAll("input.imgs");
        var valorImagen=imagen[0].files[0].name;
        
            //Creación de un espacio en blanco en un array para enviar el id de la imagen
        var imagenHTML = cuestionarios[i].querySelectorAll("input.imagenrequest");
        imagenHTML[0].name="imagen"+contador;
        imagenHTML[0].value=valorImagen;


        var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
        pregunta[0].name="pregunta"+contador;

        

        var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
        respuesta[0].name="respuesta"+contador;

        contador=contador+1;
    }
    else{
        //Pregunta Antigua
        console.log("Pregunta Antigua");
        //Captura de la imagen
        var imagen = cuestionarios[i].querySelectorAll("input.imgs");

        var pivoteImagen=imagen[0].files[0];
        var imagenHTML = cuestionarios[i].querySelectorAll("input.imagenrequest");
        imagenHTML[0].name="imagen"+contador;
        if(!pivoteImagen){
            //No se ha seleccionado una nueva imagenes
            imagenHTML[0].value="existente";
        }
        else{
            var valorImagen=imagen[0].files[0].name;
            //Creación de un espacio en blanco en un array para enviar el id de la imagen
        imagenHTML[0].value=valorImagen;
    
        }
        
        
    
        
        var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
        pregunta[0].name="pregunta"+contador;
    
        
    
        var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
        respuesta[0].name="respuesta"+contador;
        
        //Gestión de la Antigua Imagen
        var imagenAntigua=cuestionarios[i].querySelectorAll("input.antiguaIMG")[0];
        imagenAntigua.name="antiguaIMG"+contador;

        contador=contador+1;
    }
    
    }
  
    
    
  }


  //Para las preguntas de Imagenes que ya estaban creadas
  function previsualizarITEdicion(){
      var inputImagenes=document.getElementsByClassName("editableIT");
      
      for (var t=0;t<inputImagenes.length;t++){
          
          inputImagenes[t].onchange= function (e) {
            var identificadorIDN=(this.id);
            var identificadorIDN=identificadorIDN.slice(5,6)
            var idpreView="prevIT"+identificadorIDN;
            
            var previewHTML=document.getElementById(idpreView);

            // Creamos el objeto de la clase FileReader
            let reader = new FileReader();

            // Leemos el archivo subido y se lo pasamos a nuestro fileReader
            reader.readAsDataURL(e.target.files[0]);

            // Le decimos que cuando este listo ejecute el código interno
            reader.onload = function () {
               
                image = document.createElement("img");
                image.className="img-fluid";
                image.alt="Imagen Quizz-ebe"
                image.src = reader.result;

                    
                //Si ya hay una imagen
                if(previewHTML.children[0]){
                previewHTML.children[0].remove()
                previewHTML.appendChild(image)
                }
                else{
                previewHTML.appendChild(image);
                }
            
            }
        };
          
        
      }
      
   
    
  }

  function validarITEditada(){
    var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoIT");
     //Clasificación de los elementos enviados para no tener conflictos en la request
     for(i=0;i<cuestionarios.length;i++){
         var cuestionario=cuestionarios[i];
          //Variable para diferenciar del proceso de antiguas preguntas de nuevas
        var pivoteProceso=cuestionario.querySelectorAll("p.procesoIT")[0];

        if(!pivoteProceso){
            //Validación de PreguntaIT Nueva
            var zonaMensaje=cuestionario.parentElement.parentElement.previousElementSibling;
                    console.log(zonaMensaje);
                    var contenedorError=zonaMensaje.querySelectorAll("div.Error")[0];
                    var ErrorImagen=zonaMensaje.querySelectorAll("div.ErrorI")[0];
                    
                //Captura de la imagen
                var imagen = cuestionario.querySelectorAll("input.imgs")[0];
                var valorImagen=imagen.files[0];

                var camposValidacion=[];
                    
                var pregunta = cuestionario.querySelectorAll("input.pregunta")[0];
                camposValidacion.push(pregunta);

                var respuesta = cuestionario.querySelectorAll("input.respuesta")[0];
                camposValidacion.push(respuesta);

                var error=false;

                for(var j=0;j<camposValidacion.length;j++){
                    var valorCampo=camposValidacion[j].value
                    if(valorCampo.length==0){
                    
                    
                    error=true;
                    break;
                    
                    }
                }
                
                if(error && !contenedorError){
                        var strVar="";
                    strVar += "  <div class=\"Error container\">";
                    strVar += "          <div class=\" row justify-content-center\">";
                    strVar += "            <div class=\" fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
                    strVar += "              <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: Faltan Campos por Rellenar<\/p>";
                    strVar += "            <\/div>";
                    strVar += "          <\/div>";
                    strVar += "        <\/div>";
                    zonaMensaje.insertAdjacentHTML("afterbegin",strVar);  
                }
                
                console.log(!error );
                console.log(contenedorError );

                if(!error&& contenedorError){
                    contenedorError.remove()
                }
                if(!valorImagen && !ErrorImagen){
                    var strVar="";
                strVar += "<div class=\" ErrorI container\">";
                strVar += "          <div class=\" row justify-content-center mb-3\">";
                strVar += "            <div class=\"Error fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
                strVar += "              <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: No has seleccionado una Imagen<\/p>";
                strVar += "            <\/div>";
                strVar += "          <\/div>";
                strVar += "        <\/div>";
                    zonaMensaje.insertAdjacentHTML("beforeend",strVar);
                }
                
                if(valorImagen && ErrorImagen){
                    ErrorImagen.remove();
                }
        }else{
            //Validación de PreguntaIT Existente

            var zonaMensaje=cuestionario.parentElement.parentElement.previousElementSibling;
            var contenedorError=zonaMensaje.querySelectorAll("div.Error")[0];

            var camposValidacion=[];
    
            var pregunta = cuestionario.querySelectorAll("input.pregunta")[0];
            camposValidacion.push(pregunta);
          
            var respuesta = cuestionario.querySelectorAll("input.respuesta")[0];
            camposValidacion.push(respuesta);
          
            var error=false;

            for(var j=0;j<camposValidacion.length;j++){
                var valorCampo=camposValidacion[j].value
                if(valorCampo.length==0){
                  
                
                  error=true;
                  break;
                
                }
              }

            if(error && !contenedorError){
                var strVar="";
            strVar += "  <div class=\"Error container\">";
            strVar += "          <div class=\" row justify-content-center\">";
            strVar += "            <div class=\" fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
            strVar += "              <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: Faltan Campos por Rellenar<\/p>";
            strVar += "            <\/div>";
            strVar += "          <\/div>";
            strVar += "        <\/div>";
            zonaMensaje.insertAdjacentHTML("afterbegin",strVar);  
          }
        
        
          if(!error&& contenedorError){
            contenedorError.remove()
          }

        }
    }
  }
function envioQuizzEditado(){
 
     //creación e inserción de un elemento con el número de preguntas del cuestionario
    var numeroPreguntas=document.getElementsByClassName("cuestionario").length;
    var numeroHTML=document.createElement("INPUT");
     numeroHTML.type = "hidden";
     numeroHTML.name="numeroPreguntas";
     numeroHTML.value = numeroPreguntas;
     
     envioPreguntaAbierta();
     envioPreguntaRelacional();
     envioPreguntaOM();
     envioPreguntaMate();
     editarIT();

     insertor.appendChild(numeroHTML);
     var formulario=document.getElementById("formularioQuizz");
     formulario.submit();
}

function editarQuizz(){
    validarPreguntaRelacional();
    validarPreguntaOM();
    validarPreguntaAbierta();
    validarPreguntaMate();
    validarITEditada();

    /*
    var validacion=validaciones();
   
    var errores=document.getElementsByClassName("Error")[0];
    var erroresRespuesta=document.getElementsByClassName("ErrorR")[0];
    var erroresImagen=document.getElementsByClassName("ErrorI")[0];
    
    if(errores ||erroresRespuesta || erroresImagen||validacion.error){
      //mensaje(validacion.str);
    }
    else{*/
     
      envioQuizzEditado();
      var formulario=document.getElementById("formularioQuizz");
        document.getElementById("malla").style.display="block";
        document.getElementById("msgE").style.display="block";
        setTimeout(function () {
          formulario.submit();
      }, 1000);
    //}

}