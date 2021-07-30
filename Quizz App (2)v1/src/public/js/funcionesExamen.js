//Configuración para detener el Quizz
var myCarousel = document.querySelector('#carouselExampleControlsNoTouching');
    var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false,
  pause: true
    });

    var formulario=document.getElementById("quizz");

//Variable para enviar los datos que un alumno contesta en un lienzo Drag por la request
var arrayLR=[];


function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume=0.3;
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }

  this.reload= function(){
    this.sound.load();
  }
} 

matematicas();
contadorItemsMultiples();
matematicas();
contadorItemsMultiples();

//----------Empiezan Funciones de Mate-----//
function matematicas(){
 var preguntasMate=document.getElementsByClassName("mate");
 var identificadoresMate=document.querySelectorAll("input.tipoMate");
 var strVar="";


     
 //Busqueda de los espacios para poner preguntas de matemáticas
 for(i=0;i<preguntasMate.length;i++){
       var pregunta=preguntasMate[i].textContent;
       //variable para rellenar los inputs y conocer si el resultado debe ser en fracciones o enteros
       
     
         //Eliminación de todos los espacios en blanco
       pregunta=pregunta.replace(/\s+/g, ''); 
       //limipiamos la variable
       strVar="";
       //Proceso sin fracciones
       if(pregunta.search("_")==-1){
           //Conversión de la expresión a HTML
           for(j=0;j<pregunta.length;j++){
                 var caracter=pregunta.slice(j,j+1);
                   if (Number.isInteger(parseInt(caracter))){
                       strVar += "  <div class=\"col-1 py-3\"  >";
                       strVar += "            <h1 class=\"text-center text-dark\">"+caracter+"<\/h1>";
                       strVar += "          <\/div>";
                   }
                   else{
                       strVar += "<div class=\"col-1 align-middle py-3\"  >";
                       strVar += "            <h1 class=\"text-center text-dark \">"+caracter+"<\/h1> ";
                       strVar += "          <\/div>";
                   }
             }

             //Añadir elementos para enviar respuesta
             strVar += "    <div class=\"col-1 py-3\"  >";
             strVar += "                <h1 class=\"text-center text-dark \">=<\/h1> ";
             strVar += "              <\/div>";
             strVar += "              <div class=\"col-1 pt-4\"  >";
             strVar += "                  <div class=\"pt-1 \">";
             strVar += "                    <input type=\"number\" autocomplete=\"off\"  class=\"alumnoResponde\" pt-2\">";
             strVar += "                  <\/div >";
             strVar += "                  ";
             strVar += "              <\/div>";
             strVar += "            <\/div>  ";
             preguntasMate[i].parentElement.insertAdjacentHTML("beforeend",strVar);
             
            identificadoresMate[i].value="entero"
             //preguntasMate[i].querySelectorAll("input.tipoMate")[0].value="entera"
            // preguntasMate[i].remove();
       }//if
       else{//Proceso con Fracciones
        console.log(pregunta);
        for(j=0;j<pregunta.length;j++){
                var caracter=pregunta.slice(j,j+1);
                console.log("Iteración: "+j);
                console.log("Caracter I: "+caracter)
                if (Number.isInteger(parseInt(caracter))){
                    var posibleFraccion=fraccion(caracter,pregunta,j);
                    if(posibleFraccion.esFraccion){
                        
                        strVar += "   <div class=\"col-1\"  >";
                        strVar += "              <h1 class=\"text-center text-dark\">"+posibleFraccion.numerador+"<\/h1>";
                        strVar += "               <h1 class=\"border-top border-dark text-center text-center text-dark\">"+posibleFraccion.denominador+"<\/h1>";
                        strVar += "            <\/div>";
     
                       
                        j=posibleFraccion.iteracion;
                    }
                    else{
                        //Impresión de Numero Entero
                        strVar += "  <div class=\"col-1 py-4\"  >";
                        strVar += "            <h1 class=\"text-center text-dark\">"+caracter+"<\/h1>";
                        strVar += "          <\/div>";
                       
                    }
                   
                
                }
                   //Operandos
                   else{
                    if (!Number.isInteger(parseInt(caracter))){
                    strVar += " <div class=\"col-1 \"  >";
                    strVar += "              <h1 class=\"text-center text-dark pt-4\">"+caracter+"<\/h1> ";
                    strVar += "            <\/div>";
                    }
                  }

                  
         }
           //Añadir elementos para enviar respuesta
           strVar += "  <div class=\"col-1 \"  >";
           strVar += "              <h1 class=\"text-center text-dark pt-4\">=<\/h1> ";
           strVar += "            <\/div>";
           strVar += "            <div class=\"col-3\"  >";
           strVar += "                <div class=\"pt-3 \">";
           strVar += "                  <input type=\"number\" autocomplete=\"off\" class=\"numerador\" name=\"\" id=\"\" class=\" pt-2\" min=\"0\">";
           strVar += "                <\/div >";
           strVar += "                <div class=\"pt-1\">";
           strVar += "                  <input type=\"number\" autocomplete=\"off\"  class=\"denominador\" name=\"\" id=\"\" class=\" pt-2\" min=\"0\">";
           strVar += "                <\/div>";
           strVar += "            <\/div>";

         preguntasMate[i].parentElement.insertAdjacentHTML("beforeend",strVar);
                 identificadoresMate[i].value="fraccion";
       
       }
   }//for preguntas
   
   //Removemos todos los <P> para que no sea confuso
   
  var destructor=preguntasMate.length;
   for(var i=0;i<destructor;i++){
    preguntasMate[0].remove();
   }
  
}

  
  function fraccion(numero,expresion,iteracion){
    var resultado={
      numerador: 0,
      denominador:0,
      iteracion:0,
      esFraccion: false
    };
   
    var operando=expresion.slice(iteracion+1,iteracion+2);
  
    console.log("Valor recibido por la Función Fracción : "+operando);
    //Si el próximo espacio en el string es guion bajo convertimos a fracción
    if(operando=="_"){
      resultado.esFraccion=true;
      console.log("Debe Convertirse a fracción")
      var denominador=expresion.slice(iteracion+2,iteracion+3);
      resultado.denominador=denominador;
      resultado.iteracion=iteracion+2;
      resultado.numerador=numero;
    }
    else{ //Devolvemos los mismos datos que nos fueron dados en caso negativo
     resultado.numerador=numero;
     resultado.iteracion=iteracion; 
    }
  
    
  
     return resultado
  }


//-----------Terminan Funciones de Mate




function contadorItemsMultiples(){
        
    //Buscamos todos aquellos elementos que tengan más de una respuesta
    var cuestionariosMultiples=document.getElementsByClassName("contadorItems");

    for(var i=0;i<cuestionariosMultiples.length;i++){
        //Separamos el elemento a procesar
        var claveI=cuestionariosMultiples[i].value;
    
        var selectorI="items"+claveI;

        //Conseguimos el elemento que contiene los items
        var itemsCuestionario=document.getElementById(selectorI);

        //Contamos cuantos items tiene ese cuestionario
        var contadorItems=itemsCuestionario.querySelectorAll(".reactivo").length;

        //Y lo reasignamos para que pueda ser leído por la request en el cuestionario N
        cuestionariosMultiples[i].value=contadorItems;
    }
}

//Función para renombrar o crear  los inputs de los alumnos para que sean leídos por la request
function envioRespuestasMate(){
    var identificadoresMate=document.querySelectorAll("input.tipoMate");


    
    for(var i=0;i<identificadoresMate.length;i++){
        //Localización de la pregunta  donde vamos a inyectar las respuestas del alumno
        var preguntaMate=identificadoresMate[i].parentElement;
      //  console.log(preguntaMate.value);

        if(identificadoresMate[i].value=="entero"){
            var respuestaAlumno
           
             var respuestaAlumnoHTML=preguntaMate.querySelectorAll("input.alumnoResponde");
            respuestaAlumnoHTML[0].name="respuesta"+identificadoresMate[i].id;
            respuestaAlumnoHTML[0].value=parseInt(respuestaAlumnoHTML[0].value).toFixed(3);
            console.log(respuestaAlumnoHTML[0].value);
            //respuestaAlumnoHTML[0].value=(respuestaAlumnoHTML[0].value).toFixed(3);
        }
        else{
            
           
            var numeradorAlumno=preguntaMate.querySelectorAll("input.numerador");
            var denominadorAlumno=preguntaMate.querySelectorAll("input.denominador");

            var respuestaAlumno=(numeradorAlumno[0].value/denominadorAlumno[0].value).toFixed(3);
            

            var strVar="";
            strVar += " <input type=\"hidden\" autocomplete=\"off\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+respuestaAlumno+"\">";
            strVar += " <input type=\"hidden\" autocomplete=\"off\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+numeradorAlumno[0].value+"\">";
            strVar += " <input type=\"hidden\" autocomplete=\"off\" name=\"respuesta"+identificadoresMate[i].id+"\" value=\""+denominadorAlumno[0].value+"\">";
            preguntaMate.insertAdjacentHTML("beforeend",strVar);
        }
    }
}

/*--------------Funciones Pregunta Drag--------------*/


//-------------Sonidos-------------//

var  drag=new sound("/sonidos/drag.mp3");
drag.sound.playbackRate=2;
var drop=new sound("/sonidos/drop.mp3");
drag.sound.playbackRate=2;
var rechazo=new sound("/sonidos/rechazoDrag.mp3");

//--------------------------------
//Variable para reconocer el contenedor de palabras del que se están sacando los arrastrables
var contenedorPalabras

var FuncionesPD = {
  drop : function (e,itemDrop) {
    
    var lienzoID=itemDrop.parentElement.id;
    var lienzo=Number.parseInt(lienzoID.substr((lienzoID.length-1),lienzoID.length));

    //la variable el es el arrastrable que se mueve
    var el = document.getElementById(e.dataTransfer.getData('Text'));
    //console.log(lienzo);
    //console.log(el);

    if (el.parentElement.className!="reactivoDrop"){
      
      //El arrastrable se mueve de su casilla original a una casilla limpia
      if(itemDrop.children[0].id.length==0){
        //console.log(lienzo);
         //Copia de todos los elementos que se soltarán
        itemDrop.children[0].innerHTML=el.innerHTML;
        itemDrop.children[0].id=el.id;

        validarRespuesta(lienzo,el,itemDrop,false);
        el.remove();
        drop.stop();
        drop.reload();
        drop.play();
      }
      else{ //El arrastrable, va a una casilla ocupada
        validarRespuesta(lienzo,el,itemDrop,true);
        sobreEscrituraArrastrable(el,itemDrop);
        rechazo.stop();
        rechazo.reload();
        rechazo.play();
      }
      }
      else{  //El arrastrable se mueve de una casillaDrop a otra casilla Drop Limpia
        if(itemDrop.children[0].id.length==0){
          validarRespuesta(lienzo,el,itemDrop,true);
          trasladoArrastrable(el,itemDrop);
          drop.stop();
          drop.reload();
          drop.play();
        }
        else{
          //Sobreescritura: un Elemento arrastrable posicionado en un reactivo cae sobre una casilla ocupada
          console.log("caso 2")
          validarRespuesta(lienzo,el,itemDrop,true);
          sobreEscrituraArrastrable(el,itemDrop);
          rechazo.stop();
          rechazo.reload();
          rechazo.play();
        }
       
        
      }
     
    
    activarItemDrag(itemDrop.children[0]);
  }
  
};

//Función para encontrar la casilla original del contenedor de Palabras en una pregunta Drag en especifico
function buscarCP(obj){
  //buscamos alguno de los dos posibles ids que contienen el valor de la iteración del lienzo
  while(true){
    var criterio1=obj.id.search("contPal")!=-1;//si en su ID encuentra conPal
    var criterio2=obj.id.search("lienzo")!=-1;//si en su ID encuentra lienzo
    if(criterio1 ||criterio2){
      break;
    }
    else{
      obj=obj.parentElement;
    }
    
  }
  //Reconstruimos el id
  var iteracionLienzo=obj.id.substr((obj.id.length-1),obj.id.length);
  var idCP="contPal"+iteracionLienzo;

  //Y asignamos el contenedorPalabras correcto
   contenedorPalabras=document.getElementById(idCP);

}

function activarDragQuizz(){
  var i=0;
  var arrastrables=document.querySelectorAll(".elementoDrag");
  for(i;i<arrastrables.length;i++){
      var elemento=arrastrables[i];
      /*elemento.setAttribute('id', ("itemDragQuizz"+contadorDrag));*/
    activarItemDrag(elemento);


  }
  
}
function activarItemDrag(obj){
    
        
  obj.setAttribute('draggable', 'true');

      obj.addEventListener("dragstart", function(event) {
        // The dataTransfer.setData() method sets the data type and the value of the dragged data
        event.dataTransfer.setData("Text", event.target.id);

          drag.stop();
          drag.reload();
          drag.play();
          buscarCP(this);
          //TODO fails on desktop safari because drag is immediately aborted
    //                this.style.display = "none";

          console.log('setting data: ' + this.id);

          event.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
        
      });
  /*
  addEvent(obj, 'dragstart', function (e) {
     // console.log('dragstart');
      buscarCP(this);
     // contenedorPalabras=this.parentElement

      e.dataTransfer.effectAllowed = 'copy';

      //TODO fails on desktop safari because drag is immediately aborted
//                this.style.display = "none";

      //console.log('setting data: ' + this.id);

      e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
  });
  */


}

function activarItemsDrop(){
  var i=0;
  var reactivosDrop=document.getElementsByClassName("reactivoDrop");

  
  for(i;i<reactivosDrop.length;i++){
  var reactivo=reactivosDrop[i];
  
  //
  


  reactivo.addEventListener("drop", function(event) {
    //console.log(this);
    event.preventDefault();
    event.stopPropagation();

    
    FuncionesPD.drop(event,this);
  });
/*
  addEvent(reactivo, 'ondrop', function (e) {
    e.preventDefault();
    e.stopPropagation(); // stop it here to prevent it bubble up

});
*/
  reactivo.addEventListener("dragenter", function(event) {
    event.preventDefault();
    event.stopPropagation();
  });
  /*
  addEvent(reactivo, 'dragenter', function (e) {

      e.preventDefault();
      e.stopPropagation(); // stop it here to prevent it bubble up

  });
  */
  reactivo.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  reactivo.addEventListener("dragover", function(event) {
    event.preventDefault();
    event.stopPropagation();
  });
  /*
  addEvent(reactivo, 'dragover', function (e) {

      e.preventDefault(); // allows us to drop
      e.stopPropagation(); // stop it here to prevent it bubble up

  });
  */

  /*
  addEvent(reactivo, 'dragexit', function (e) {
      e.preventDefault();
      e.stopPropagation(); // stop it here to prevent it bubble up

      //bin.classList.remove('in');
  });
  */

   
 reactivo.addEventListener("dragleave", function(event) {
  event.preventDefault();
  event.stopPropagation();
});
  
  /*
  addEvent(reactivo, 'dragleave', function (e) {
      e.preventDefault();
      e.stopPropagation(); // stop it here to prevent it bubble up

  });
  */

  
  }
}
//Función para dar soporte a los elemntos que enviarán a la request lo que contestó el alumno por lienzo
function backLienzo(){
  /*--BackLienzo controla los elementos que se envían por la request de la
  pregunta Drag 
   manipula la variable arrayLR que tiene en sus espacios un conjunto de objetos
   que tienen la iteración de la pregunta y las respuestas para esa iteración (implicitamente vinculado al cuetionario que contesta)
  
  ---*/

  var lienzos=document.getElementsByClassName("replica");

  

  var objLienzo={iteracion:0,
                 respuestasA: []}

  for(var l=0;l<lienzos.length;l++){
    var lienzoID=lienzos[l].id;
    iteracion=Number.parseInt(lienzoID.slice((lienzoID.length-1),lienzoID.length));

    var objLienzo={iteracion:iteracion,
                  respuestasA: []};
    arrayLR.push(objLienzo);
  }
}
//Función para procesar como se comportan los elementos cuando caen
//e es el evento
//ItemDrop es el elemento en el que va a caer un arrastrable


function trasladoArrastrable(el,itemDrop){
  //Copia de todos los elementos que se soltarán
  itemDrop.children[0].innerHTML=el.innerHTML;
  itemDrop.children[0].id=el.id;

  //Capatura del antiguo  reactivo
  antiguoContenedor=el.parentElement;
  //Destrucción del antiguo Elemento
  el.remove();
  
  if(antiguoContenedor.className!="contenedorPalabras"){
  //Inserción de un elemento Limpio
  var strVar="";
  strVar += "<div class=\"contenidoDrop\"><\/div>";
  antiguoContenedor.insertAdjacentHTML("afterbegin",strVar);
  }
}

function sobreEscrituraArrastrable(el,itemDrop){
  //Sobreescritura: un Elemento arrastrable cae sobre una casilla ocupada
 // console.log("Sobreescritura")
  var arrastrableSobrescrito=itemDrop.children[0];
  
  //Reconstrucción del elemento para volver al cuadro original
  var strVar="";
  
  strVar += " <div id=\""+arrastrableSobrescrito.id+"\"";
strVar += "class=\"text-light  text-center respuesta-reactivo elementoDrag border border-light\"";
strVar += "style=\"width: 140px; margin: 0 auto;\">";
strVar += "   <p class=\"fw-bold\" style=\"font-size: 22px;\">";
strVar += ""+arrastrableSobrescrito.textContent+"";
strVar += " <\/p>";
strVar += "   <\/div>";

  contenedorPalabras.insertAdjacentHTML("afterbegin",strVar);
  activarDragQuizz();

  trasladoArrastrable(el,itemDrop);
}
//Función para construir los elementos que se van a enviar por la request
function validarRespuesta(lienzo,el,itemDrop,opcion){
    /*--Opcion: 
    false Solo se va a Escribir o sobreEscribir
    true Se deben desvincular elementos
    */
 
      console.log("validarRespuesta");
      console.log("___________________");

      //Quitar Espacios en blanco
      var contenido=(el.textContent).replace(/^\s+|\s+$/gm,'');
      var respuesta = {
        id_respuesta: el.id,
        contenido: contenido,
        id_pregunta: itemDrop.id
      }

      if(opcion){
        desvincular(lienzo,respuesta.id_respuesta);
      }
      BuscarRespuesta(lienzo,respuesta.id_pregunta, respuesta);


  console.log(arrayLR);
  
}

function BuscarRespuesta(lienzo,id_buscado, respuesta) {
  console.log("FBuscarRespuesta");
  console.log("__________")
  var l;
  var x;
  console.log(lienzo);
  console.log(arrayLR);
  //Busqueda del espacio en arrayLR que le corresponde a la itreacion =lienzo
  for(l in arrayLR){
          //Si encuentra la iteracion
          if(arrayLR[l].iteracion==lienzo){
            console.log("iteracion Encontrada");
            var respuestasObjeto=arrayLR[l].respuestasA;
            console.log(id_buscado);
            //console.log(respuestasObjeto);
            var x;
            if(respuestasObjeto.length==0){
              console.log("Primera Inserción")
              arrayLR[l].respuestasA.push(respuesta);
            }
            else{

                for (x in respuestasObjeto) {
                      console.log(x);
                      console.log(respuestasObjeto.length);
                      var criterio1=id_buscado == respuestasObjeto[x].id_pregunta;
                      var criterio2= x==(respuestasObjeto.length-1);
                      console.log("_______________");
                      console.log(respuestasObjeto[x].id_pregunta);
                      console.log("_______________");
                      if (criterio1) {
                        resultado=true
                        console.log("Sobreescribiendo")
                        arrayLR[l].respuestasA[x]=respuesta
                        break;
                      }
                      console.log(!criterio1);
                      console.log(criterio2);
                      if(!criterio1 && criterio2){
                        console.log("Escribiendo");
                         arrayLR[l].respuestasA.push(respuesta);
                      }

                  }
                  /*
                  console.log(x);
                  console.log(x==respuestasObjeto.length)
                  if(x==respuestasObjeto.length){
                    console.log("Escribiendo");
                    arrayLR[l].respuestasA.push(respuesta);
                  }
                  */
                  //break;
             }
             console.log(arrayLR[l]);
             break;
        }
       

    }
   
  }

  //Función para destruir elementos del objeto arrayLR cuando ya estaban asignados
  function desvincular(lienzo,id_buscado){
    var l;
  var x;
  //Busqueda del espacio en arrayLR que le corresponde a la itreacion =lienzo
  for(l in arrayLR){
            //Si encuentra la iteracion
            if(arrayLR[l].iteracion==lienzo){
              var respuestasObjeto=arrayLR[l].respuestasA;
            
                for (x in respuestasObjeto) {
                  if(respuestasObjeto[x].id_respuesta==id_buscado){
                     respuestasObjeto[x].id_respuesta="";
                     respuestasObjeto[x].contenido="";
                    //var resultado=respuestasObjeto[x].id_respuesta
                    break;
                  }
                }
                console.log("desvinculado"+id_buscado);
                //console.log(resultado);
                break;
          }
        }
  }

function enviarRespuestasDrag(datosRequest){
  console.log(arrayLR);

  console.log("Envío")
  console.log("_____________")
  for(x in arrayLR){
    var claveRespuesta="respuesta"+arrayLR[x].iteracion;
    var respuesta=JSON.stringify(arrayLR[x].respuestasA);
    datosRequest.append(claveRespuesta,respuesta);
  }
}
/*--------------Terminan funciones Pregunta Drag--------------*/
/*
//Función para detectar ids y contenido de lo que cae en un reactivo
function activarReactivo(){
    $(".reactivo").droppable({
      drop: function (event, ui) {
    
        console.log("Detectando ID");
        elemento=ui.draggable;
        elemento=elemento[0];
        event.stopPropagation();
        
    
        var respuesta={
          id_respuesta: elemento.id,
          contenido:elemento.textContent,
          id_pregunta:this.id
        }
    
       if(!BuscarRespuesta(respuesta.id_pregunta,respuesta)){
           respuestasAlumnoD.push(respuesta);
       }
        console.log(respuestasAlumnoD);
       
    
      }
    });
    }

    function BuscarRespuesta(id_buscado,respuesta){
        var resultado=false
        for(x in respuestasAlumnoD){
            if(id_buscado==respuestasAlumnoD[x].id_pregunta){
                console.log("Sobreescribiendo")
                respuestasAlumnoD[x]=respuesta
                resultado= true
            }
        }
        return resultado;
    }
    */
    /*
    arrastrable();
    function arrastrable() {
        $(".elementoDrag").draggable({
          revert: "invalid",
          cursor: "move",
        });
      }
      */

function tomarTiempo(){
   var tiempo=document.getElementById("cronometro").textContent;
   var strVar="";
    strVar += "<input type=\"hidden\" name=\"tiempo\" value=\""+tiempo+"\">";
   formulario.insertAdjacentHTML("beforeend",strVar);
}

function enviarQuizz(){
  
  //console.log(formulario);
  envioRespuestasMate();
  tomarTiempo();
  //console.log(formulario);
  
  var datosEnvio=new FormData(document.getElementById("quizz"));
   var prueba=datosEnvio.getAll('cuestionario0');
  console.log(prueba);
  
  enviarRespuestasDrag(datosEnvio);
  var request = new XMLHttpRequest();
  request.open("POST", "/alumnos/correccion");
  request.send(datosEnvio);
  
 /*
 const data = new FormData(document.getElementById('quizz'));
fetch('/editores/troll', {
   method: 'POST',
   body: data
}).then(function(response) {
  if(response.ok) {
      return response.text()
  } else {
      throw "Error en la llamada Ajax";
  }

});

*/
  
  request.onreadystatechange = function (aEvt) {
    if (request.readyState == 4) {
       if(request.status == 200){
        console.log(JSON.parse(request.responseText));
        
        //ID de la nueva Revisión
        var nuevoRID=JSON.parse(request.responseText);
        var link="/alumnos/revision/"+nuevoRID;
        //console.log(link)
        window.location.replace(link);
        
       }
       else
        {console.log("No se ha recibido nada");}
    }
  };
  

}
    
