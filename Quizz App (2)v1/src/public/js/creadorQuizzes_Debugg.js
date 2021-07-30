//--------JS PARA LA INYECCIÓN DE PREGUNTAS EN EL DOM DE EDITORES/CREAR Y EL PROCESAMIENTO PARA SU ENVÍO----------//



//Variable para hacer la inserción de elementos dentro del cuertpo del HTML
var insertor=document.getElementById("insercion");
//Variable global para "enumerar" todas las preguntas,respuestas y tipo  de un cuestionario para la request
var contador=1;
//Variable para elementos que deben ser Previsualiados
var contadorPreV=1;
var errores;
//
//---Variables para la pregunta Drag--//
var objetosDrag=[];
var contadorid = 0 ;
var numeracionPregunta=1;
var lienzo={
            id:0,
            img:[],
            pregunta:[],
            respuesta:[],
            flecha:[]


            }
            //Simulación de un solo lienzo
objetosDrag[0]=lienzo;
//Variable global para dar ids que nunca se repitan para los elementos de las Preguntas Drag
var contadorIDrag=0;
//Variable exclusiva para los ids de los lienzos
var idLienzo=0
//-------------------------------------//
//Función para nombrar los tipos de preguntas, y agregarles un contador para que no se pierdan en la request
function contadorTipo(){
    tipo="tipo"+contador;

     //Creación de un elemento hidden para registrar el tipo de pregunta
     var tipoHTML=document.createElement("INPUT");
     
     tipoHTML.type="hidden";
     tipoHTML.name=tipo;
    return tipoHTML;
}


//Función para crear las preguntas abiertas en el cuerpo del HTML
function preguntaAbierta(){

  contadorid++;

var strVar="";
strVar += "   <div id=\"preg"+(contadorid)+"\" class=\"tipoT cuestionario cuestionario  justify-content-center mt-5 pt-5 nivel-Superior\">";
strVar += "      <div class=\"container contenedorErrores\">";
strVar += "      <\/div>";
strVar += "      <div class=\"row text-center\">";
strVar += "        <div class=\"col-12\">";
strVar += "          <div class=\"rounded-pill\">";
strVar += "            <a class=\"position-absolute top-0 start-0 translate-middle bg-primary rounded-pill text-light shadow border-1\"";
strVar += "              style=\"width: 3rem; height:3rem; margin-left: 210px;\">";
strVar += "              <p class=\"fs-4\" style=\"padding-top: 4px;\">"+numeracionPregunta+"<\/p>";
strVar += "            <\/a>";
strVar += "          <\/div>";
strVar += "          <div class=\"text-center mb-5 mt-5\">";
strVar += "            <h3>Pregunta Abierta<\/h3>";
strVar += "            <h4 class=\"text-primary\">Intrucciones<\/h4>";
strVar += "            <p class=\"fs-5 justify-content-center text\">Escribe la pregunta y la respuesta que quieras que tenga.<\/p>";
strVar += "          <\/div>";
strVar += "               <div class=\"col-md-7 mb-4 text-center mx-auto\">";
strVar += "                <label for=\"formGroupExampleInput\" class=\"form-label\">Instrucciones para el Alumno<\/label>";
strVar += "                <input type=\"text\" class=\"form-control instrucciones\" placeholder=\"Instrucciones para el alumno\" value=\"Responde lo que se te solicita\">";
strVar += "              <\/div>";
strVar += "          <div class=\"col-md-7\" style=\"margin: 0 auto;\">";
strVar += "            <label for=\"formGroupExampleInput\" class=\"form-label\">Pregunta<\/label>";
strVar += "            <input type=\"text\" class=\"form-control pregunta\" placeholder=\"Escriba la pregunta\">";
strVar += "          <\/div>";
strVar += "          <div class=\"col-md-7\" style=\"margin: 0 auto;\">";
strVar += "            <label for=\"formGroupExampleInput2\" class=\"form-label\">Respuesta<\/label>";
strVar += "            <input type=\"text\" class=\"form-control respuesta \" placeholder=\"Escriba la respuesta\">";
strVar += "";
strVar += "";
strVar += "          <\/div>";
strVar += "          <div class=\"editar col-md-7\" role=\"group\" aria-label=\"Basic mixed styles example\" style=\"margin: 0 auto;\">";
strVar += "            <br>";
strVar += "            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
strVar += "          <\/div>";
strVar += "";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "";
strVar += "    <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);

  
numeracionPregunta++;
       
} 

// Color del Body//

function colorido(){
    var colores = document.getElementById("color");
    var fondo = document.getElementsByClassName("examen");
    if(colores.value=="1"){
      fondo.backgroundColor = "#CE002B";
    } else if (colores.value=="2"){
      fondo.backgroundColor = "#C4A61C";
    } else if (colores.value == "3"){
      fondo.backgroundColor = "#A06600";
    }
  }



//pregunta arrastrable//
//---------Comienzan Funciones Drag--------//

//Función para que las preguntas drag encuentren su propio contenedor y puedan encontrar su lienzo
function buscarLienzo(obj){
  var clase=obj.className;
  //cuando encuentre esta clase, significa que encontró su contenedor superior
  var criterio=clase.search("tipoAr")
  while(criterio==-1){
     obj=obj.parentElement;
     clase=obj.className;
     criterio=clase.search("tipoAr")
  }

  var lienzo=obj.querySelector("div.lienzo");

  var resultado={
    contenedor: obj,
    lienzo:lienzo
  }
  return resultado
}
function palabras(obj) {
  var preguntaContenedora=buscarLienzo(obj);
  var contenedor=preguntaContenedora.contenedor;
  var lienzo= preguntaContenedora.lienzo;
  var inputCantidad = contenedor.querySelector("input.palabrasCNT");
  var palabra=inputCantidad.value;
  //Si el usuario no ha especificado Cantidad
  if(palabra.length==0){

    var PlaceHolder=inputCantidad.placeholder;
    inputCantidad.placeholder="Define las palabras a Insertar"
     inputCantidad.style.borderColor="red";

  setTimeout(function () {
    inputCantidad.placeholder=PlaceHolder;
    inputCantidad.style.borderColor="black";
}, 3000);
  }
  else{   //Creación de las palabras de acuerdo al input
     var strVar = "";
      var palabraPartida = palabra.split(" ");
      /* el ciclo for lo utilizo para saber cuantas son las veces que va a inyectar la etiqueta con la palabra */
    for (var i = 0; i < palabraPartida.length; i++) {
      var id="drag"+contadorIDrag;
      strVar += '<div id=\"'+id+'\" class=\"palabraDrag  fw-bold text-center elementoDrag\" style=\"width:100px;\">';
      strVar += "" + palabraPartida[i] + " </div>";

      contadorIDrag++;
    }
    //var espacioLienzo=document.getElementById("lienzo0").children[0];//.innerHTML = strVar;
    lienzo.insertAdjacentHTML("afterBegin",strVar);   

    arrastrable();
  }
}

/*
function comprobarDrag(event) {
  var arr = [];
  var countOfItems = 0;

  $("#drag1, #drag2, #drag3, #drag4").draggable({
    revert: "invalid",
    cursor: "move",
  });


  $("#cuadro1, #cuadro2, #cuadro3, #cuadro4").droppable({
    greedy: true,
    drop: function (event, ui) {
      var div = event.target.id;
      var element = ui.draggable.attr("id");
      arr.push({
        key: div,
        val: element,
      });
      $("#" + element).addClass("someclass");
      //if div with class name 'someclass' is greater than the required no of div
      if ($("div.someclass").length > countOfItems) {
        document.getElementById("tituloR").innerHTML = "Respuestas:";
     
        $.each(arr, function (i, obj) {
          if (obj.val == "drag1" && obj.key == "cuadro1") {
            document.getElementById("demo").innerHTML = "¡Correcto!";
          } else if (obj.val == "drag2" && obj.key == "cuadro2") {
            document.getElementById("demo2").innerHTML = "¡Correcto!";
          } else if (obj.val == "drag3" && obj.key == "cuadro3") {
            document.getElementById("demo3").innerHTML = "¡Correcto!";
          } else if (obj.val == "drag4" && obj.key == "cuadro4") {
            document.getElementById("demo4").innerHTML = "¡Correcto!";
          } else {
            if (obj.val == "drag1" && obj.key != "cuadro1") {
              document.getElementById("demo").innerHTML = "¡Incorrecto!";
            } else if (obj.val == "drag2" && obj.key != "cuadro2") {
              document.getElementById("demo2").innerHTML = "¡Incorrecto!";
            } else if (obj.val == "drag3" && obj.key != "cuadro3") {
              document.getElementById("demo3").innerHTML = "¡Incorrecto!";
            } else if (obj.val == "drag4" && obj.key != "cuadro4") {
              document.getElementById("demo4").innerHTML = "¡Incorrecto!";
            }
          }

          var demo = document.getElementById("demo").innerHTML;
          var demo2 = document.getElementById("demo2").innerHTML;
          var demo3 = document.getElementById("demo3").innerHTML;
          var demo4 = document.getElementById("demo4").innerHTML;

          if (
            demo == "¡Correcto!" &&
            demo2 == "¡Correcto!" &&
            demo3 == "¡Correcto!" &&
            demo4 == "¡Correcto!"
          ) {
            document.getElementById("demo5").innerHTML =
              "¡Todas las respuestas son correctas!";
          } else if (
            demo == "¡Incorrecto!" &&
            demo2 == "¡Incorrecto!" &&
            demo3 == "¡Incorrecto!" &&
            demo4 == "¡Incorrecto!"
          ) {
            document.getElementById("demo5").innerHTML =
              "¡Todas las respuestas son incorrectas!";
          } else {
            document.getElementById("demo5").innerHTML = " ";
          }
        });

       
      }
    },
  });
}
*/
//Función para dar la funcionalidad Drag a cada Elemento
function arrastrable() {
  $(".elementoDrag").draggable({
    revert: "invalid",
    cursor: "move",
  });
}

//Función para crear los cuadros reactivos. Parametro de entrada obj botón para crear los recuadros
function cuadros(obj) {
  var preguntaContenedora=buscarLienzo(obj);
  
  var contenedor=preguntaContenedora.contenedor;
  var lienzo= preguntaContenedora.lienzo;
  var inputCantidad = contenedor.querySelector("input.caRe")//.value;//document.querySelector("#caRe").value;
  
  var cantidad=inputCantidad.value;
  //Si el usuario no ha especificado Cantidad
  if(cantidad.length==0){

    var PlaceHolder=inputCantidad.placeholder;
    inputCantidad.placeholder="Selecciona una Cantidad"
     inputCantidad.style.borderColor="red";

  setTimeout(function () {
    inputCantidad.placeholder=PlaceHolder;
    inputCantidad.style.borderColor="black";
}, 3000);
  }
  else{
    var idRecuadro;
    for (var i = 0; i < cantidad; i++) {
      idRecuadro="reactivo"+contadorIDrag;
      var strVar = '  <div id=\"'+idRecuadro+'\" class=\" recuadro elementoDrag reactivo\"><\/div>';
      lienzo.insertAdjacentHTML("afterBegin", strVar);
     // lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
      contadorIDrag++;
    }
    arrastrable();
    activarReactivo();
  }
  
}

function flechaAbajo(obj){
  var preguntaContenedora=buscarLienzo(obj);
  
  var contenedor=preguntaContenedora.contenedor;
  var lienzo= preguntaContenedora.lienzo;
  var inputCantidad = contenedor.querySelector("input.caFle")//.value;//document.querySelector("#caRe").value;
  
  var cantidad=inputCantidad.value;
  //Si el usuario no ha especificado Cantidad
  if(cantidad.length==0){

    var PlaceHolder=inputCantidad.placeholder;
    inputCantidad.placeholder="Selecciona una Cantidad"
     inputCantidad.style.borderColor="red";

  setTimeout(function () {
    inputCantidad.placeholder=PlaceHolder;
    inputCantidad.style.borderColor="black";
}, 3000);
  }
  else{//Inserción de flechas según el input
    var strVar="";
    for (var i = 0; i < cantidad; i++) {
      strVar += '<img class="flecha arriba elementoDrag" id="fdo"'+contadorIDrag+'" src="/img/flechav.png" alt="">';
      contadorIDrag++
    }
    lienzo.insertAdjacentHTML("afterBegin", strVar);
    arrastrable();
  }
}

function flechaHoDerecha(obj) {
  var preguntaContenedora=buscarLienzo(obj);
  
  var contenedor=preguntaContenedora.contenedor;
  var lienzo= preguntaContenedora.lienzo;
  var inputCantidad = contenedor.querySelector("input.caFle")//.value;//document.querySelector("#caRe").value;
  
  var cantidad=inputCantidad.value;
  //Si el usuario no ha especificado Cantidad
  if(cantidad.length==0){

    var PlaceHolder=inputCantidad.placeholder;
    inputCantidad.placeholder="Selecciona una Cantidad"
     inputCantidad.style.borderColor="red";

  setTimeout(function () {
    inputCantidad.placeholder=PlaceHolder;
    inputCantidad.style.borderColor="black";
}, 3000);
  }
  else{//Inserción de flechas según el input
    var strVar="";
    for (var i = 0; i < cantidad; i++) {
      strVar += '<img class=" flecha hor elementoDrag" id="fid'+contadorIDrag+'"src="/img/flechah.png" alt="">';
      contadorIDrag++
     
    }
    lienzo.insertAdjacentHTML("afterBegin", strVar);
    arrastrable();
  }
}
/*
function flechaHoIzquierda() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar += '<img class="flecha imagenes elementoDrag" id="fdi"'+contadorIDrag+'" src="/img/flechaHoIz.png" alt="">';
    contadorIDrag++
  }
  var lienzo=document.getElementById("lienzo0");
  lienzo.insertAdjacentHTML("beforeend", strVar);
  //lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
  
}
*/
function flechaDiaDerecha(obj) {
  var preguntaContenedora=buscarLienzo(obj);
  
  var contenedor=preguntaContenedora.contenedor;
  var lienzo= preguntaContenedora.lienzo;
  var inputCantidad = contenedor.querySelector("input.caFle")//.value;//document.querySelector("#caRe").value;
  
  var cantidad=inputCantidad.value;
  //Si el usuario no ha especificado Cantidad
  if(cantidad.length==0){

    var PlaceHolder=inputCantidad.placeholder;
    inputCantidad.placeholder="Selecciona una Cantidad"
     inputCantidad.style.borderColor="red";

  setTimeout(function () {
    inputCantidad.placeholder=PlaceHolder;
    inputCantidad.style.borderColor="black";
}, 3000);
  }
  else{//Inserción de flechas según el input
    var strVar="";
    for (var i = 0; i < cantidad; i++) {
      strVar +=
        '<img class="flecha diagonal elementoDrag" id="fsd'+contadorIDrag+'" src="/img/diagonalderinvertida2.png" width="90px;" alt="">';
      contadorIDrag++
      } 
    lienzo.insertAdjacentHTML("afterBegin", strVar);
    arrastrable();
  }
}

/*
function flechaDiaIzquierda() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar +=
      '<img class="flecha diagonal elementoDrag" id="fsi'+contadorIDrag+'" src="/img/flechadigaiz.png" alt="">';
      contadorIDrag++;
    }

  var lienzo=document.getElementById("lienzo0");
  lienzo.insertAdjacentHTML("beforeend", strVar);
  //lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
}
*/
function flechaDiaDerechaInv(obj) {
  var preguntaContenedora=buscarLienzo(obj);
  
  var contenedor=preguntaContenedora.contenedor;
  var lienzo= preguntaContenedora.lienzo;
  var inputCantidad = contenedor.querySelector("input.caFle")//.value;//document.querySelector("#caRe").value;
  
  var cantidad=inputCantidad.value;
  //Si el usuario no ha especificado Cantidad
  if(cantidad.length==0){

    var PlaceHolder=inputCantidad.placeholder;
    inputCantidad.placeholder="Selecciona una Cantidad"
     inputCantidad.style.borderColor="red";

  setTimeout(function () {
    inputCantidad.placeholder=PlaceHolder;
    inputCantidad.style.borderColor="black";
}, 3000);
  }
  else{//Inserción de flechas según el input
    var strVar="";
    for (var i = 0; i < cantidad; i++) {
      strVar +=
        '<img class="flecha diagonal elementoDrag" id="fad'+contadorIDrag+'" src="/img/diagonalderinvertida.png" alt="">';
        contadorIDrag++;
      }
    lienzo.insertAdjacentHTML("afterBegin", strVar);
    arrastrable();
  }
}
/*
function flechaDiaIzquierdaInv() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar +=
      '<img class="flecha diagonal elementoDrag" id="fai'+contadorIDrag+'" src="/img/diagonalizinvertida.png" alt="">';
    contadorIDrag++;
    }

  var lienzo=document.getElementById("lienzo0");
  lienzo.insertAdjacentHTML("beforeend", strVar);
  //lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
}
*/

ActivarLienzo();
function ActivarLienzo(){
  //Eventos ligados a clase lienzo
  $(".lienzo").droppable({
    drop: function (event, ui) {
     
      elemento=ui.draggable;
      event.stopPropagation();
      //Obtenemos las coordenadas el elemento que se mueve en el lienzo
      var posicionelemento=elemento.position();
      coordenadatop =posicionelemento.top;
      coordenadaleft=posicionelemento.left;

      var objetoHTML=elemento[0];
      var datos={
        
        operacion: "reposicion",
        coordenadas:
          {id: objetoHTML.id,
            top: coordenadatop,
            left: coordenadaleft
          }
      }
      //console.log(datos);
      //Revisamos la clase que tiene el objeto que se mueve para guardarlo de cierta manera
      var strCriterio=objetoHTML.className
     // console.log(strCriterio);
      if(strCriterio.search("recuadro")!=-1){
        datos.tipoElemento="recuadro";
      }
      else if(strCriterio.search("flecha")!=-1){
        datos.tipoElemento="flecha";
        
      }
      var strlienzo=this.id;
      var LienzoID=Number.parseInt(strlienzo.slice((strlienzo.length-1),(strlienzo.length)));
      
      construirObjLienzo(LienzoID,datos);

    }
  });
}

function activarReactivo(){
$(".reactivo").droppable({
  drop: function (event, ui) {

    console.log("Detectando ID");
    elemento=ui.draggable;
    elemento=elemento[0];
    event.stopPropagation();
    //Variable para detectar el id del lienzo al que pertenece el elemento 
    var strlienzo=this.parentElement.id;
    //console.log(strlienzo);
    
    //Variable para llamar al espacio del objeto del lienzo
    var lienzoID=Number.parseInt(strlienzo.slice((strlienzo.length-1),(strlienzo.length)));

    

    
    
    var pregunta={
      id:this.id
    }

    var respuesta={
      id_respuesta: elemento.id,
      contenido:elemento.textContent,
      id_pregunta:this.id
    }

    var datos={
      operacion: "preg-res",
      pregunta: pregunta,
      respuesta: respuesta,
    }

    construirObjLienzo(lienzoID,datos)
    
  }
});
}


function construirObjLienzo(lienzoID,datos){
  
  var objLienzo=objetosDrag[lienzoID];
  var operacion=datos.operacion;
  switch(operacion){
    case "preg-res":
      
      var x;

      //Si ya existe el elemento
      var preguntaExistente
      for(x in objLienzo.pregunta){
        var preguntaI=objLienzo.pregunta[x]
        if((preguntaI.id)&&(datos.pregunta.id==preguntaI.id)){
            preguntaExistente=preguntaI;
            break;
        }
      }
      if (preguntaExistente){
        //SobreEscritura de Datos
        console.log("Sobreescribiendo");
        objLienzo.respuesta[x]=datos.respuesta;
      }
      else{
        //Escritura de Datos
        objLienzo.pregunta.push(datos.pregunta);
        objLienzo.respuesta.push(datos.respuesta);
      }
      
      break;

      case "reposicion":
        
        
          var criterio=datos.tipoElemento;
          console.log("criterio")
          console.log(criterio);
          switch(criterio){
          case "recuadro":
            var preguntaExistente
            for(x in objLienzo.pregunta){
                var preguntaI=objLienzo.pregunta[x]
                if((preguntaI.id)&&(datos.coordenadas.id==preguntaI.id)){
                    preguntaExistente=preguntaI;
                    break;
                }
              }

              console.log(preguntaExistente);
              if (preguntaExistente){
                //SobreEscritura de Datos
                console.log("Reposicionando");
                objLienzo.pregunta[x].top=datos.coordenadas.top;
                objLienzo.pregunta[x].left=datos.coordenadas.left;
              }
              else{
                //Escritura de Datos
                objLienzo.pregunta.push(datos.coordenadas);
              }
              
          break 
          case "flecha":
            var flechaExistente
            for(x in objLienzo.flecha){
                var flechaI=objLienzo.flecha[x]
                if((flechaI.id)&&(datos.coordenadas.id==flechaI.id)){
                    flechaExistente=flechaI;
                    break;
                }
              }

              
              if (flechaExistente){
                //SobreEscritura de Datos
                console.log("Reposicionando");
                objLienzo.flecha[x].top=datos.coordenadas.top;
                objLienzo.flecha[x].left=datos.coordenadas.left;
              }
              else{
                //Escritura de Datos
                objLienzo.flecha.push(datos.coordenadas);
              }
              
          break
          case "img":
            console.log("entra");
            var imgExistente=objLienzo.img[0];
              
              if (imgExistente){
                //SobreEscritura de Datos
                console.log("Nuevas coordenadas img");
                objLienzo.img[0].top=datos.coordenadas.top;
                objLienzo.img[0].left=datos.coordenadas.left;
              }
              else{
                //Escritura de Datos
                objLienzo.img.push(datos.coordenadas);
              }
              
          break   
          }
      break;
  }

  console.log(objLienzo);
  
}
previsualizarDraw()
//Función para crear las funciones preview
function previsualizarDraw(){
    
   var filesDrag= document.getElementsByClassName("L-file");

   for(var f=0;f<filesDrag.length;f++){
     var objHTML=filesDrag[f];
      objHTML.onchange = function (e) {
        var preguntaContenedora=buscarLienzo(this);
        var lienzo=preguntaContenedora.lienzo;
        let reader = new FileReader();

        // Leemos el archivo subido y se lo pasamos a nuestro fileReader
        reader.readAsDataURL(e.target.files[0]);

            // Le decimos que cuando este listo ejecute el código interno
            reader.onload = function () {
              let preview = lienzo.querySelector("div.contenedorIMG2");
              ///// Espacio para replica Debugg
              var espacioReplica=document.getElementById("replica");
              console.log(espacioReplica);
              //
                image = document.createElement("IMG");
              image.src = reader.result;
              image.className="img-PLienzo img-fluid";
              image.id="image"+contadorIDrag;
              /*
                    var datos={
                      tipoElemento: "img",
                      operacion: "reposicion",
                      
                      coordenadas:
                        { id: image.id,
                         
                        }
                        
                    }
              //Obtención del valor del lienzo en el cual se guardaraá la información
              var idLienzo=Number.parseInt(lienzo.id.substr((lienzo.id.length-1),lienzo.id.length));

              construirObjLienzo(idLienzo,datos);
               --------------------- No necesita enviar sus datos---------------------
              */
              //Si ya hay una imagen
              if(preview.children[0]){
                preview.children[0].remove()
                preview.appendChild(image)
              }
             
              else{
                preview.children[0].appendChild(images);
              }
              var clon=image.cloneNode(false);
              if(espacioReplica.children[0]){
                espacioReplica.children[0].remove()
                espacioReplica.appendChild(clon)
              }
              else{
                espacioReplica.children[0].appendChild(clon);
              }
              contadorIDrag++;
          }
      }
  }
        
}

//----Terminan funciones Drag--------//

      function preguntaArrastrar() {
        contadorid++;
        var strVar="";
        strVar += "<div id=\"preg1"+(contadorid)+"\" class=\"tipoAr cuestionario justify-content-center mt-5 pt-5 nivel-Superior\">";
        strVar += "    <div class=\" mt-3\">";
        strVar += "      <div class=\"text-center mb-5 mt-5\">";
        strVar += "        <h3>Pregunta Arrastrable<\/h3>";
        strVar += "        <h4 class=\"text-primary\">Intrucciones<\/h4>";
        strVar += "        <p class=\"fs-5 justify-content-center text\">Coloca cada elemento que se te solicita abajo y lo podrás visualizar e";
        strVar += "          ir armando en el recuadro azul de la derecha.<\/p>";
        strVar += "      <\/div>";
        strVar += "      <div class=\"col-md-7 mb-4 text-center mx-auto\"> <label for=\"formGroupExampleInput\" class=\"form-label\">Instrucciones";
        strVar += "          para el Alumno<\/label> <input type=\"text\" class=\"form-control instrucciones\"";
        strVar += "          placeholder=\"Instrucciones para el alumno\" value=\"Responde lo que se te solicita\"> <\/div>";
        strVar += "      <div class=\"row responsivePG\">";
        strVar += "        <div class=\"col-xs-12 col-lg-5 col-md-4 col-sm-12\">";
        strVar += "          <div class=\"rounded-pill\"> <a";
        strVar += "              class=\"position-absolute top-0 start-0 translate-middle bg-primary rounded-pill text-light shadow border-1\"";
        strVar += "              style=\"width: 3rem; height:3rem; margin-left: 10px;\">";
        strVar += "              <p class=\"fs-4\" style=\"padding-top: 4px; padding-left: 17px;\">"+numeracionPregunta+"<\/p>";
        strVar += "            <\/a> <\/div>";
        strVar += "          <div class=\"mt-5\">";
        strVar += "            <h4 class=\"text-center mb-4\">Busca la imagen que quieras agregar:<\/h4> <input  type=\"file\"";
        strVar += "              class=\"form-control imgs L-file\" accept=\"image\/*\" name=\"imgs\">";
        strVar += "            <div class=\"mt-3 text-center\">";
        strVar += "              <h4 class=\"text-dark mb-3\">Coloca la cantidad de recuadros:<\/h4>";
        strVar += "              <div class=\"mb-3\"> <input  type=\"number\" placeholder=\"Cantidad:\" class=\"form-control caRe\" min=\"0\"> <\/div>";
        strVar += "              <button type=\"button\" class=\"btn btn-primary fw-bold\" onclick=\"cuadros(this)\">Crear<\/button>";
        strVar += "            <\/div>";
        strVar += "            <h4 class=\"text-dark mb-3 mt-3\">Escribe las palabras que quieras agregar:<\/h4>";
        strVar += "            <div class=\"mb-3 text-center\"> <input type=\"text\" placeholder=\"Coloca las palabras:\"";
        strVar += "                class=\"form-control palabrasCNT\"> <button type=\"button\" class=\"btn btn-primary fw-bold mt-3\"";
        strVar += "                onclick=\"palabras(this)\">Crear<\/button> <\/div>";
        strVar += "            <div class=\"mt-2 text-center\">";
        strVar += "              <h4 class=\"text-dark mb-3\">Coloca la cantidad de flechas:<\/h4>";
        strVar += "              <div class=\"mb-3\"> <input  type=\"number\" placeholder=\"Cantidad:\" class=\"form-control caFle\"> <\/div>";
        strVar += "              <h4 class=\"text-dark mb-3\">Tipos de flecha:<\/h4> <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\"";
        strVar += "                onclick=\"flechaHoDerecha(this)\"><img src=\"\/img\/flechas\/flechaDerecha.png\" style=\"width: 40px !important;\"";
        strVar += "                  alt=\"Flecha derecha\" height=\"25px;\"><\/button> <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\"";
        strVar += "                onclick=\"flechaDiaDerecha(this)\"><img src=\"\/img\/flechas\/lateralderechaarriba.png\"";
        strVar += "                  style=\"width: 28px !important;\" alt=\"lateral derecha arriba\" height=\"34px;\"><\/button> <button";
        strVar += "                type=\"button\" class=\"btn btn-primary fw-bold mb-3\" onclick=\"flechaAbajo(this)\"><img";
        strVar += "                  src=\"\/img\/flechas\/flechaAbajo.png\" style=\"width: 20px !important;\" alt=\"Flecha abajo\"";
        strVar += "                  height=\"34px;\"><\/button> <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\"";
        strVar += "                onclick=\"flechaDiaDerechaInv(this)\"><img src=\"\/img\/flechas\/lateralderechaabajo.png\"";
        strVar += "                  style=\"width: 30px !important;\" alt=\"Lateral derecha abajo\" height=\"30px;\"><\/button>";
        strVar += "            <\/div>";
        strVar += "          <\/div> ";
        strVar += "        <\/div> <!-- Comienza Lienzo -->";
        strVar += "        <div class=\"col-xs-12 col-lg-5 col-md-6 col-sm-12 pl-3\"><button type=\"button\" class=\"btn btn-danger\">Eliminar";
        strVar += "            elementos del lienzo<\/button>";
        strVar += "          <div class=\"lienzo shadow mt-3 mb-5 \" id=\"lienzo"+idLienzo+"\">";
        strVar += "            <div class=\"contenedorIMG2\">";
        strVar += "            <!-- <img src=\"\/img\/noche.jpg\" class=\"img-PLienzo img-fluid\" >--> ";
        strVar += "              <img src=\"\/img\/hapy.jpeg\" class=\"img-PLienzo img-fluid\" >";
        strVar += "            <\/div>";
        strVar += "            <!--<div class=\"col-12 container\"> <\/div>-->";
        strVar += "          <\/div>";
        strVar += "        <\/div> <!-- Termina Lienzo -->";
        strVar += "      <\/div>";
        strVar += "      <div class=\"editar text-center\" role=\"group\" aria-label=\"Basic mixed styles example\" float=\"left\" align=\"left\"> <br>";
        strVar += "        <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button> <\/div>";
        strVar += "    <\/div>";
        strVar += "  <\/div>";
        
        
      insertor.insertAdjacentHTML("beforeend",strVar);   

      previsualizarDraw();
      ActivarLienzo();

      //Creación de la plataforma para dar soporte al lienzo
      objetosDrag.push(lienzo);
      idLienzo++;
      numeracionPregunta++
      }

      function preguntaRelacional(){
        contadorid++;
        
      
      
        var strVar="";
      strVar += "<div id=\"preg"+(contadorid)+"\" class=\"tipoR cuestionario cuestionario mt-5 pt-5 container nivel-Superior\">";
      strVar += "      <div class=\"contenedorErrores\">";
      strVar += "      <\/div>";
      strVar += "      <div class=\"row text-center\">";
      strVar += "        <div class=\"col-12 col-md-12 col-lg-7\">";
      strVar += "          <div class=\"rounded-pill\">";
      strVar += "            <a class=\"position-absolute top-0 start-0 translate-middle bg-primary rounded-pill text-light shadow border-1\"";
      strVar += "              style=\"width: 3rem; height:3rem;\">";
      strVar += "              <p class=\"fs-4\" style=\"padding-top: 4px;\">"+numeracionPregunta+"<\/p>";
      strVar += "            <\/a>";
      strVar += "          <\/div>";
      strVar += "          <div class=\"contenedorItem row justify-content-center mb-3\">";
      strVar += "              <div class=\"mb-4\">";
      strVar += "                <h3 class=\"text-center\">Pregunta Relacional<\/h3>";
      strVar += "              <\/div>";
      strVar += "               <div class=\"mb-4 text-center mx-auto\">";
      strVar += "                <label for=\"formGroupExampleInput\" class=\"form-label\">Instrucciones para el Alumno<\/label>";
      strVar += "                <input type=\"text\" class=\"form-control instrucciones\" placeholder=\"Instrucciones para el alumno\" value=\"Relaciona las columnas\">";
      strVar += "              <\/div>";
      strVar += "            <div class=\"container row justify-content-center mb-3\">";
      strVar += "              <div class=\"col-md-5\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <input type=\"text\" class=\"form-control pregunta\" placeholder=\"Pregunta\">";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "              <div class=\"col-md-5\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <input type=\"text\" class=\"form-control respuesta \" placeholder=\"Respuesta\">";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "              <div class=\"col-md-2\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <button class=\"btn btn-danger \" type=\"button\"";
      strVar += "                    onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "            <\/div>";
      strVar += "            <br>";
      strVar += "            <div class=\"container row justify-content-center mb-3\">";
      strVar += "              <div class=\"col-md-5\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <input type=\"text\" class=\"form-control pregunta\" placeholder=\"Pregunta\">";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "              <div class=\"col-md-5\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <input type=\"text\" class=\"form-control respuesta\" placeholder=\"Respuesta\">";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "              <div class=\"col-md-2\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <button class=\"btn btn-danger \" type=\"button\"";
      strVar += "                    onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "            <\/div>";
      strVar += "            <br>";
      strVar += "            <div class=\"container row justify-content-center mb-3\">";
      strVar += "              <div class=\"col-md-5\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <input type=\"text\" class=\"form-control pregunta \" placeholder=\"Pregunta\">";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "              <div class=\"col-md-5\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <input type=\"text\" class=\"form-control respuesta \" placeholder=\"Respuesta\">";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "              <div class=\"col-md-2\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <button class=\"btn btn-danger \" type=\"button\"";
      strVar += "                    onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "            <\/div>";
      strVar += "            <br>";
      strVar += "            <div class=\"container row justify-content-center mb-4\">";
      strVar += "              <div class=\"col-md-3 ml-0\">";
      strVar += "                <div class=\"\">";
      strVar += "                  <button class=\"btn btn-info \" type=\"button\" onclick=\"reactivoRelacional(this)\">Añadir";
      strVar += "                    Reactivo<\/button>";
      strVar += "                <\/div>";
      strVar += "              <\/div>";
      strVar += "";
      strVar += "            <\/div>";
      strVar += "            <br>";
      strVar += "";
      strVar += "            <div class=\"col-md-3 mr-2 text-center\">";
      strVar += "              <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar";
      strVar += "                Pregunta<\/button>";
      strVar += "            <\/div>";
      strVar += "";
      strVar += "          <\/div>";
      strVar += "        <\/div>";
      strVar += "        <div class=\"col-12 col-md-12 col-lg-5\">";
      strVar += "          <h4 class=\"text-primary\">Intrucciones<\/h4>";
      strVar += "          <p class=\"fs-5 justify-content-center text\">1.- Se debe colocar la respuesta y pregunta en orden 1-1, para que";
      strVar += "            pueda evaluar correctamente.No olvides definir las instrucciones para el  Alumno <\/p>";
      strVar += "          <P class=\"fs-5 justify-content-center text\">2.- El botón de QuitarReactivo sirve para quitar preguntas, en";
      strVar += "            caso de que hayas agregado demás.<\/P>";
      strVar += "          <p class=\"fs-5 justify-content-center text\">3.- Añadir Reactivo sirve para agregar más columnas a relacionar.";
      strVar += "          <\/p>";
      strVar += "          <p class=\"fs-5 justify-content-center text\">4.- El botón QuitarPregunta sirve para eliminar la pregunta en";
      strVar += "            caso de que no se ocupe colocar ninguna relacional.<\/p>";
      strVar += "        <\/div>";
      strVar += "      <\/div>";
      strVar += "";
      strVar += "    <\/div>";
      
      numeracionPregunta++
      insertor.insertAdjacentHTML("beforeend",strVar);
      }


//función para crear más reactivos en preguntas relacionales
function reactivoRelacional(obj){
  
      //Extración del Div donde se inyectará el nuevo reactivo
      var contenedorCuestionario=obj.parentElement.parentElement.parentElement.previousElementSibling;
      
      var strVar="";
strVar += " <div class=\"container row justify-content-center mb-3\">";
strVar += "              <div class=\"col-md-5\">";
strVar += "                <div class=\"\">";
strVar += "                  <input type=\"text\" class=\"form-control pregunta \" placeholder=\"Pregunta\">";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <div class=\"col-md-5\">";
strVar += "                <div class=\"\">";
strVar += "                  <input type=\"text\" class=\"form-control respuesta \" placeholder=\"Respuesta\">";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <div class=\"col-md-2\">";
strVar += "                <div class=\"\">";
strVar += "                  <button class=\"btn btn-danger \" type=\"button\"";
strVar += "                    onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "            <br>";


      contenedorCuestionario.insertAdjacentHTML("afterend",strVar);

      console.log(contenedorCuestionario);
   
}

function quitarReactivoRelacional(obj){
  //Elemento que se destruirá
  obj.parentElement.parentElement.parentElement.remove();
}




//Función para Escribir o sobreEscribir datos en el objeto Lienzo




///+++++++---------------Funcion de Examen------------++++++++//
function dibujarLienzo(){
  console.log("Dibujando LIenzo");
  var lienzo=objetosDrag[0];

  var pregunta=lienzo.pregunta;
  var flechas=lienzo.flecha;

  for(x in pregunta){
    
    var id_recuadro=pregunta[x].id;
    var id_simulacion="r"+id_recuadro.slice((id_recuadro.length-1),(id_recuadro.length))
    var recuadro=document.getElementById(id_simulacion);
    recuadro.style.top=pregunta[x].top+"px";
    recuadro.style.left=pregunta[x].left+"px";
    console.log(pregunta[x]);
  }

  for(y in flechas){
    
    var id_flecha=flechas[y].id;
    var id_simulacion="fsi";
    var flecha=document.getElementById("fsi");
    
    flecha.style.top=flechas[y].top+"px";
    flecha.style.left=flechas[y].left+"px";
    console.log(flecha);
    
  }

   /*
        var flechastr=objetoHTML.id;
        //Recortamos el id para saber que tipo de flecha es
        flechastr=flechastr.substr(0,(flechastr.length-1))
        console.log(flechastr)
        datos.tipoFlecha=flechastr;
        */
  //console.log(pregunta)
}

/*-----------Termina Funciones de la Pregunta Drag----------*/


function preguntaOM(){

  contadorid++;
  

  var strVar="";
strVar += "";
strVar += "    <div id=\"preg"+(contadorid)+"\" class=\"tipoOM cuestionario rounded-sm container mt-5 pt-5 nivel-Superior\">";
strVar += "      <div class=\" row justify-content-center mb-4 contenedorErrores\">";
strVar += "      <\/div>";
strVar += "      <div class=\"row\">";
strVar += "        <div class=\"col-12 col-md-12 col-lg-6 justify-content-center\">";
strVar += "          <div class=\"rounded-pill\">";
strVar += "            <a class=\"position-absolute top-0 start-0 translate-middle bg-primary rounded-pill text-light shadow border-1\"";
strVar += "              style=\"width: 3rem; height:3rem;\">";strVar += "";
strVar += "              <p class=\"fs-4\" style=\"padding-top: 4px; padding-left: 16px;\">"+numeracionPregunta+"<\/p>";
strVar += "            <\/a>";
strVar += "          <\/div>";
strVar += "          <div class=\"text-center\">";
strVar += "            <h3>Pregunta de Opción Múltiple<\/h3>";
strVar += "               <div class=\"mb-4 text-center mx-auto\">";
strVar += "                <label for=\"formGroupExampleInput\" class=\"form-label\">Instrucciones para el Alumno<\/label>";
strVar += "                <input type=\"text\" class=\"form-control instrucciones\" placeholder=\"Instrucciones para el alumno\" value=\"Responde verdadero o falso a la pregunta \">";
strVar += "              <\/div>";
strVar += "            <div class=\"pregunta mt-3\">";
strVar += "              <!--  -->";
strVar += "              <input type=\"text\" class=\"form-control pregunta \" placeholder=\"Pregunta para el alumno\">";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "          <div class=\"reactivos mt-4 text-center\">";
strVar += "            <div class=\"row\">";
strVar += "              <div class=\"mb-3\">";
strVar += "                <div class=\"\">";
strVar += "                  <input type=\"text\" class=\"form-control opcion mb-3\" placeholder=\"Verdadero\" value=\"verdadero\">";
strVar += "                  <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button><\/br>";
strVar += "                  <button type=\"button\" class=\"btn btn-danger mt-2\" onclick=\"borrarReactivoOM(this)\">Eliminar Opción<\/button>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "              <div class=\"mb-3\">";
strVar += "                <div class=\"\">";
strVar += "                  <input type=\"text\" class=\"form-control opcion mb-3\" placeholder=\"Falso\" value=\"falso\">";
strVar += "                  <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button><\/br>";
strVar += "                  <button type=\"button\" class=\"btn btn-danger mt-2\" onclick=\"borrarReactivoOM(this)\">Eliminar Opción<\/button>";
strVar += "                <\/div>";
strVar += "              <\/div>";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "          <div class=\"editar mt-3 text-center\" role=\"group\" aria-label=\"Basic mixed styles example\">";
strVar += "            <button type=\"button\" class=\"btn btn-success\" onclick=\"reactivoOM(this)\">Agregar Reactivo<\/button>";
strVar += "            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "        <div class=\"col-12 col-md-12 col-lg-6\">";
strVar += "          <div class=\"text-center\">";
strVar += "            <h4 class=\"text-primary\">Intrucciones<\/h4>";
strVar += "            <p class=\"fs-5 justify-content-center text\">Para hacer una pregunta Verdadero-Falso , solo define la";
strVar += "              pregunta al alumno y selecciona la opción correcta. Si deseas opción Multiple,define la pregunta del alumno,";
strVar += "              borra los campos de verdadero y falso y escribe las respuestas que desees . Finalmente selecciona las correctas<\/p>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "";
strVar += "";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "";
strVar += "    <\/div>";

  

insertor.insertAdjacentHTML("beforeend",strVar);
numeracionPregunta++;
}

//Función para la creación de una opción en preguntas de opción múltiple
function reactivoOM(obj){

  //búsqueda del div donde se inyectará el nuevo reactivo
  var contenedor=obj.parentElement.previousElementSibling;//children[0].querySelectorAll("div div.reactivos")[0];

  
  var strVar="";
  strVar += " <div class=\"mb-3\">";
  strVar += "                <div >";
  strVar += "                  <input type=\"text\" class=\"form-control opcion mb-3\" placeholder=\"Opción para el alumno\" >";
  strVar += "                  <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button><\/br>";
  strVar += "                  <button type=\"button\" class=\"btn btn-danger mt-2\" onclick=\"borrarReactivoOM(this)\">Eliminar Opción<\/button>";
  strVar += "                <\/div>";
  strVar += "              <\/div>";
  
  
  contenedor.insertAdjacentHTML("beforeend",strVar);
  
}

//Función para seleccionar las respuestas correctas de la opción múltiple
function seleccionarRespuesta(obj){
  // Selección del elemento a cambiar de color
  var contenedor= obj.parentElement.parentElement;
  
  claseContenedor=contenedor.className;
  //Clase con palabra clave para definir el comportamiento de la respuesta
  
  pivote=claseContenedor.search("bg bg-success");

  if (pivote==-1){
    contenedor.className="mb-3 bg bg-success";
  }
  else{
    contenedor.className="mb-3 ";
  }

}

function borrarReactivoOM(obj){
  var contenedor=obj.parentElement.parentElement;
  contenedor.remove()
}
/*------------- Terminan funciones de Pregunta Opción Múltiple-----*/
function preguntaIT(){

  contadorid++;

var strVar="";
strVar += "<div id=\"preg"+(contadorid)+"\" class=\"justify-content-center mt-5 pt-5 nivel-Superior\" >";
strVar += "      <div class=\"contenedorErrores\">";
strVar += "      ";
strVar += "     <\/div>";
strVar += "      <div class=\"row\">";
strVar += "        <div class=\"col-12\">";
strVar += "          <div class=\"rounded-pill\">";
strVar += "            <a class=\"position-absolute top-0 start-0 translate-middle bg-primary rounded-pill text-light shadow border-1\"";
strVar += "              style=\"width: 3rem; height:3rem; margin-left: 198px;\">";
strVar += "              <p class=\"fs-4\" style=\"padding-top: 4px; padding-left: 15px;\">"+numeracionPregunta+"<\/p>";
strVar += "            <\/a>";
strVar += "          <\/div>";
strVar += "          <div class=\"container tipoIT cuestionario mt-4 col-md-7 \">";
strVar += "            <div class=\"text-center\">";
strVar += "              <h3>Pregunta Texto-Imagen<\/h3>";
strVar += "              <h4 class=\"text-primary\">Intrucciones<\/h4>";
strVar += "              <p class=\"fs-5 justify-content-center text\">Seleccione la imagen a cargar, y defina pregunta y respuesta";
strVar += "              <\/p>";
strVar += "            <\/div>";
strVar += "            <input required type=\"file\" id=\"imgIT"+contadorPreV+"\" accept=\"image\/*\" class=\"imgs\" name=\"imgs\">";
strVar += "            <input required type=\"hidden\" class=\"imagenrequest\">";
strVar += "            <div id=\"prevIT"+contadorPreV+"\" class=\"mx-auto\"><\/div>";
strVar += "              <div class=\"mb-4 text-center mx-auto\">";
strVar += "                <label for=\"formGroupExampleInput\" class=\"form-label\">Instrucciones para el Alumno<\/label>";
strVar += "                <input type=\"text\" class=\"form-control instrucciones\" placeholder=\"Instrucciones para el alumno\" value=\"Responde la pregunta de acuerdo a la imagen \">";
strVar += "              <\/div>";
strVar += "            <div class=\"mb-3\">";
strVar += "              <label for=\"formGroupExampleInput\" class=\"form-label\">Pregunta<\/label>";
strVar += "              <input type=\"text\" class=\"form-control pregunta\" placeholder=\"Escriba la pregunta\">";
strVar += "            <\/div>";
strVar += "            <div class=\"mb-3\">";
strVar += "              <label for=\"formGroupExampleInput2\" class=\"form-label\">Respuesta<\/label>";
strVar += "              <input required type=\"text\" class=\"form-control respuesta \" placeholder=\"Escriba la respuesta\">";
strVar += "            <\/div>";
strVar += "            <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\" float=\"left\" align=\"left\">";
strVar += "              <br>";
strVar += "              <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\" align=\"left\">Quitar";
strVar += "                Pregunta<\/button>";
strVar += "            <\/div>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "    <\/div>";


insertor.insertAdjacentHTML("beforeend",strVar);
previsualizarIT();
contadorPreV++;
numeracionPregunta++;
}

function previsualizarIT(){
  var idFile="imgIT"+contadorPreV;
  var idpreView="prevIT"+contadorPreV;
  //Función para crear las funciones preview
document.getElementById(idFile).onchange = function (e) {
  // Creamos el objeto de la clase FileReader
  let reader = new FileReader();

  // Leemos el archivo subido y se lo pasamos a nuestro fileReader
  reader.readAsDataURL(e.target.files[0]);

  // Le decimos que cuando este listo ejecute el código interno
  reader.onload = function () {
    let preview = document.getElementById(idpreView),
      image = document.createElement("img");
    image.src = reader.result;

        
     //Si ya hay una imagen
     if(preview.children[0]){
      preview.children[0].remove()
      preview.appendChild(image)
    }
    else{
      preview.appendChild(image);
    }
   
  }
    
   
  };
}



function preguntaMatematicas(){
  contadorid++;

var strVar="";
strVar += "<div id=\"preg"+(contadorid)+"\" class=\"tipoM cuestionario justify-content-center mt-5 pt-5 nivel-Superior\">";
strVar += "      <div class=\"container contenedorErrores\">";
strVar += "      <\/div>";
strVar += "      <div class=\"row\">";
strVar += "        <div class=\"col-12\">";
strVar += "          <div class=\"rounded-pill\">";
strVar += "            <a class=\"position-absolute top-0 start-0 translate-middle bg-primary rounded-pill text-light shadow border-1\"";
strVar += "              style=\"width: 3rem; height:3rem; margin-left: 203px;\">";
strVar += "              <p class=\"fs-4\" style=\"padding-top: 4px; padding-left: 15px;\">"+numeracionPregunta+"<\/p>";
strVar += "            <\/a>";
strVar += "          <\/div>";
strVar += "          <div class=\"text-center\">";
strVar += "            <h3>Pregunta de Matemáticas<\/h3>";
strVar += "            <h4 class=\"text-primary\">Intrucciones<\/h4>";
strVar += "            <p class=\"fs-5 justify-content-center text\">Si requiere escribir una fracción ingrese guion bajo\"_\" p. ej.";
strVar += "              3_4";
strVar += "            <\/p>";
strVar += "";
strVar += "          <\/div>";
strVar += "               <div class=\"col-md-7 mb-4 text-center mx-auto\">";
strVar += "                <label for=\"formGroupExampleInput\" class=\"form-label\">Instrucciones para el Alumno<\/label>";
strVar += "                <input type=\"text\" class=\"form-control instrucciones\" placeholder=\"Instrucciones para el alumno\" value=\"Resuelve la expresión \">";
strVar += "              <\/div>";
strVar += "          <div class=\"col-md-7\" style=\"margin: 0 auto;\">";
strVar += "            <label for=\"formGroupExampleInput\" class=\"form-label\">Expresión<\/label>";
strVar += "            <input type=\"text\" class=\"form-control pregunta\" placeholder=\"Escriba la expresión a mostrar al alumno\">";
strVar += "          <\/div>";
strVar += "          <div class=\"editar col-md-7\" role=\"group\" aria-label=\"Basic mixed styles example\" style=\"margin: 0 auto;\">";
strVar += "            <br>";
strVar += "            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\" align=\"left\">Quitar Pregunta<\/button>";
strVar += "          <\/div>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "    <\/div>";


insertor.insertAdjacentHTML("beforeend",strVar);
numeracionPregunta++;
}


function envioPreguntaRelacional(){

  var i=0;
  var cuestionarios=document.getElementsByClassName("tipoR");

  for(i=0;i<cuestionarios.length;i++){

    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoR";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);

    var instrucciones=cuestionarios[i].querySelectorAll("div input.instrucciones")[0];
    instrucciones.name="instrucciones"+contador;

    //Obtención de las preguntas y respuestas
   var reactivos=cuestionarios[i].querySelectorAll("div.contenedorItem input.pregunta");

   for(j=0;j<reactivos.length;j++){
    var pregunta = cuestionarios[i].querySelectorAll("div.contenedorItem input.pregunta");
    pregunta[j].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("div.contenedorItem input.respuesta");
    respuesta[j].name="respuesta"+contador;

   }
    contador=contador+1;
  }
 
}

function validarPreguntaRelacional(){

  var i=0;
  var cuestionarios=document.getElementsByClassName("tipoR");

  
  for(i=0;i<cuestionarios.length;i++){
      var cuestionario=cuestionarios[i];
      var elementosValidacion=[];
      
      var contenedorErrores=cuestionario.querySelectorAll("div.contenedorErrores")[0];
      var instrucciones=cuestionarios[i].querySelectorAll("div input.instrucciones")[0].value;
      var reactivos=cuestionario.querySelectorAll("div.contenedorItem input.pregunta");

      for(j=0;j<reactivos.length;j++){
        var pregunta = cuestionario.querySelectorAll("div.contenedorItem input.pregunta");
        elementosValidacion.push(pregunta[j]);

        var respuesta = cuestionario.querySelectorAll("div.contenedorItem input.respuesta");
        elementosValidacion.push(respuesta[j]);

      }

      var errorHTML=cuestionario.querySelectorAll("div.Error")[0];
     
      var error=false;

      
      for(var k=0;k<elementosValidacion.length;k++){
        var valorCampo=elementosValidacion[k].value
        if(valorCampo.length==0){
          
        
          error=true;
          break;
        
        }
      }

     
     
      console.log(!instrucciones);
    // Si hay errores y No hay mensaje
    if( (error || !instrucciones) && (!errorHTML)){
      //Escribe mensaje
      var strVar="";
          strVar += "      <div class=\" row justify-content-center mb-4\">";
          strVar += "          <div class=\"Error fw-bold col-10 mx-auto p-3 m-1 text-center mb-3 border border-danger\">";
          strVar += "            <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: Faltan Campos por Rellenar<\/p>";
          strVar += "          <\/div>";
          strVar += "        <\/div>";

      contenedorErrores.insertAdjacentHTML("afterbegin",strVar);
      
      }

      if( (!error && instrucciones) && errorHTML){
        errorHTML.remove();
      }
    
    
      
   
  }
 
}



function mensaje(){
  var MensajeRetro=document.getElementById("mensaje");
  
  MensajeRetro.classList.remove('retroActivado','retroEfin');
  MensajeRetro.classList.remove('retroError');
  MensajeRetro.classList.add('retroActivado');
 
      setTimeout(function () {
        MensajeRetro.classList.add('retroEfin');
    }, 250);
  
}
//Función para un envío clasificado de los tipos de preguntas
function envioPreguntaAbierta(){
   
    var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoT");
    
    //Clasificación de los elementos enviados para no tener conflictos en la request
    for(i=0;i<cuestionarios.length;i++){
    
    //Se agrega el tipo de pregunta por medio de un elemento hidden
    var tipoHTML=contadorTipo();
    //Definición del tipo de pregunta
    tipoHTML.value="tipoT";
    //inserción
    cuestionarios[i].appendChild(tipoHTML);

    var instrucciones=cuestionarios[i].querySelectorAll("div input.instrucciones")[0];
    instrucciones.name="instrucciones"+contador;    
    
    
    var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
    pregunta[0].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
    respuesta[0].name="respuesta"+contador;
    
  
    contador=contador+1;
    }

    
}

function validar(cuestionario,elementos){
  console.log("EJECUTANDO VALIDACIÓN")
  console.log(cuestionario);
  console.log(cuestionario.children[0].className);
  
  var strRevision=cuestionario.children[0].querySelectorAll("div.Error")[0];
  var error=false;


  for(var i=0;i<elementos.length;i++){
    var valorCampo=elementos[i].value
    if(valorCampo==0){
       
     
      error=true;
      break;
    }
  }

 // Si hay errores y No hay mensaje
 if( error && (!strRevision)){
   //Escribe mensaje
  var strVar="";
  strVar += "<div class=\"container\">";
  strVar += "    <div class=\"  Error row justify-content-center \" >";
  strVar += "      <div class=\" border border-danger fw-bold col-10 mx-auto  p-3 m-1 text-center text-danger\">";
  strVar += "        Error: Faltan Campos por Rellenar";
  strVar += "      <\/div>";
  strVar += "    <\/div>";
  strVar += "  <\/div>";
  cuestionario.insertAdjacentHTML("afterbegin",strVar);
   
  }

  if(!error && (strRevision)){
    cuestionario.children[0].remove();
  }


  
return error
    
}

function validarPreguntaAbierta(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoT");
  
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
        cuestionario=cuestionarios[i];

        var contenedorErrores=cuestionario.querySelectorAll("div.contenedorErrores")[0];

        var pregunta = cuestionario.querySelectorAll("input.pregunta")[0];

        var respuesta = cuestionario.querySelectorAll("input.respuesta")[0];

        var elementosValidacion=[pregunta,respuesta];
        
        var errorHTML=cuestionario.querySelectorAll("div.Error")[0];
        var error=false;


        for(var j=0;j<elementosValidacion.length;j++){
          var valorCampo=elementosValidacion[j].value
          if(valorCampo.length==0){
            
          
            error=true;
            break;
          
          }
        }
       

      // Si hay errores y No hay mensaje
      if( error && (!errorHTML)){
        //Escribe mensaje
        var strVar="";
        strVar += " <div class=\" row justify-content-center \">";
        strVar += "          <div class=\"Error fw-bold col-10 mx-auto p-3 m-1 text-center mb-3 border border-danger\">";
        strVar += "            <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: Faltan Campos por Rellenar<\/p>";
        strVar += "          <\/div>";
        strVar += "        <\/div>";
        
        contenedorErrores.insertAdjacentHTML("afterbegin",strVar);
        
        }

        if(!error && (errorHTML)){
         errorHTML.remove();
        }

       

        
      }

 
}

function envioPreguntaOM(){

  var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoOM");

    for(i=0;i<cuestionarios.length;i++){
    
     
      
      //Selección de la pregunta que aparecerá para el alumno
      var pregunta = cuestionarios[i].querySelectorAll("div.pregunta input.pregunta");
      pregunta[0].name="pregunta"+contador;

      //Recolección de las opciones a mostrar
      var reactivos=cuestionarios[i].querySelectorAll("div.reactivos input.opcion");

      for(j=0;j<reactivos.length;j++){
      reactivos[j].name="pregunta"+contador;
      }

      //Recolección de la(s) respuesta(s)
      var respuesta = cuestionarios[i].querySelectorAll("div.bg-success input.opcion");
      for(k=0;k<respuesta.length;k++){
        //Creacción de elementos hidden para el envío de la(s) respuesta(s)
        var respuestaHTML=document.createElement("INPUT");
        respuestaHTML.type="hidden";
        respuestaHTML.name="respuesta"+contador;
        respuestaHTML.value=respuesta[k].value;

        cuestionarios[i].appendChild(respuestaHTML);

        }
    
    var instrucciones=cuestionarios[i].querySelectorAll("div input.instrucciones")[0];
    instrucciones.name="instrucciones"+contador;  
    
         //Se agrega el tipo de pregunta por medio de un elemento hidden
      var tipoHTML=contadorTipo();
      //Definición del tipo de pregunta
      tipoHTML.value="tipoOM";
      //inserción
      cuestionarios[i].appendChild(tipoHTML);

    
      contador=contador+1;
      }
}

function validarPreguntaOM(){
  
  var i=0;
    //Rastreo del div por su clase, que define el tipo de pregunta
    var cuestionarios=document.getElementsByClassName("tipoOM");

    for(i=0;i<cuestionarios.length;i++){
      cuestionario=cuestionarios[i];
      var contenedorErrores=cuestionario.querySelectorAll("div.contenedorErrores")[0];
      //console.log(contenedorErrores);
      var elementosValidacion=[];
      //Selección de la pregunta que aparecerá para el alumno
      var pregunta = cuestionario.querySelectorAll("div.pregunta input.pregunta")[0];
      elementosValidacion.push(pregunta);

      //Recolección de las opciones a mostrar
      var reactivos=cuestionario.querySelectorAll("div.reactivos input.opcion");

      for(j=0;j<reactivos.length;j++){
      elementosValidacion.push(reactivos[j]);
      }

      //Recolección de la(s) respuesta(s)
      var respuesta = cuestionario.querySelectorAll("div.bg-success input.opcion")[0];
      
      

      var errorHTML=cuestionario.querySelectorAll("div.Error")[0];
      var errorRespuesta=cuestionario.querySelectorAll("div.ErrorR")[0];
      var error=false;

      
      for(var k=0;k<elementosValidacion.length;k++){
       // console.log(elementosValidacion[k]);
        var valorCampo=elementosValidacion[k].value
        if(valorCampo.length==0){
          
        
          error=true;
          break;
        
        }
      }
      console.log("errorHTML");
      console.log(errorHTML);
      console.log("errorRespuesta");
      console.log(errorRespuesta);

      console.log("respuesta");
      console.log(!respuesta);
      console.log("errorHTML Boolean");
      console.log(!errorRespuesta);

      if(error && !errorHTML){
        console.log("ejecutandose");
        var strVar="";
            strVar += "  <div class=\"Error container\">";
            strVar += "          <div class=\" row justify-content-center\">";
            strVar += "            <div class=\" fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
            strVar += "              <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: Faltan Campos por Rellenar<\/p>";
            strVar += "            <\/div>";
            strVar += "          <\/div>";
            strVar += "        <\/div>";
    contenedorErrores.insertAdjacentHTML("afterbegin",strVar);  
  }

  if(!error&& errorHTML){
    errorHTML.remove()
  }

  
  if(!respuesta && !errorRespuesta){
    var strVar="";
        strVar += "<div class=\" ErrorR container\">";
        strVar += "          <div class=\" row justify-content-center mb-3\">";
        strVar += "            <div class=\" fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
        strVar += "              <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: No has seleccionado una Respuesta<\/p>";
        strVar += "            <\/div>";
        strVar += "          <\/div>";
        strVar += "        <\/div>";
    contenedorErrores.insertAdjacentHTML("beforeend",strVar);
  }
  

  if(respuesta && errorRespuesta){
    errorRespuesta.remove();
  }
      /*
      if(!error&& errorHTML){
        errorHTML.remove()
      }

      if(error && !errorHTML){
        console.log("ejecutandose");
        var strVar="";
            strVar += "  <div class=\"Error container\">";
            strVar += "          <div class=\" row justify-content-center\">";
            strVar += "            <div class=\" fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
            strVar += "              <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: Faltan Campos por Rellenar<\/p>";
            strVar += "            <\/div>";
            strVar += "          <\/div>";
            strVar += "        <\/div>";
    contenedorErrores.insertAdjacentHTML("afterbegin",strVar);  
  }
  

      

  if(!respuesta && !errorRespuesta){
    var strVar="";
        strVar += "<div class=\" ErrorR container\">";
        strVar += "          <div class=\" row justify-content-center mb-3\">";
        strVar += "            <div class=\"Error fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
        strVar += "              <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: No has seleccionado una Respuesta<\/p>";
        strVar += "            <\/div>";
        strVar += "          <\/div>";
        strVar += "        <\/div>";
    contenedorErrores.insertAdjacentHTML("beforeend",strVar);
  }

  if(respuesta && errorRespuesta){
    errorRespuesta.remove();
  }
  */
      }
}

function envioPreguntaIT(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoIT");
  
  /*
   var instrucciones=cuestionarios[i].querySelectorAll("div input.instrucciones")[0];
    instrucciones.name="instrucciones"+contador;  
    */
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
  
  //Se agrega el tipo de pregunta por medio de un elemento hidden
  var tipoHTML=contadorTipo();
  //Definición del tipo de pregunta
  tipoHTML.value="tipoIT";
  //inserción
  cuestionarios[i].appendChild(tipoHTML);

    
   var instrucciones=cuestionarios[i].querySelectorAll("div input.instrucciones")[0];
    instrucciones.name="instrucciones"+contador;  
    
  
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

  
  
}

function validarPreguntaIT(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoIT");
  
  
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
  
    cuestionario=cuestionarios[i];
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
  
  }

  
}

function envioPreguntaMate(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoM");
  
 
  
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
  
  //Se agrega el tipo de pregunta por medio de un elemento hidden
  var tipoHTML=contadorTipo();
  //Definición del tipo de pregunta
  tipoHTML.value="tipoM";
  //inserción
  cuestionarios[i].appendChild(tipoHTML);
  
 
     
  var instrucciones=cuestionarios[i].querySelectorAll("div input.instrucciones")[0];
    instrucciones.name="instrucciones"+contador;  
    

  var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
  pregunta[0].name="pregunta"+contador;

  var expresion= pregunta[0].value
    console.log(expresion);


    var resultadoExpresion=0;
   
      for(j=0;j<expresion.length;j++){
        
        var caracter=expresion.slice(j,j+1);
        //Si encuentra un número como caracter
        if(Number.isInteger(parseInt(caracter))){
          //Va recorriendo la expresión en base a la iteración
          var numero1=concatenacion(expresion,j);
          j=numero1.iteracion;
          numero1=numero1.numeroConcatenado

          numero1=buscarFraccion(numero1,expresion,j);
          console.log("resultado buscarFraccion: "+numero1.resultado);
          console.log("iteracion buscarFraccion: "+numero1.iteracion);

          j=numero1.iteracion;
          numero1=numero1.resultado;
           
           var operando=expresion.slice(j,j+1);
           j=j+1;          

           console.log("operando"+operando);

          
          var resultado=operacion(operando,numero1,expresion,j)
          
           j=resultado.iteracion;
           resultadoExpresion+=resultado.resultado;
           
           //console.log("iteracion al final"+resultado.iteracion)
        }
       
        else{//Si encuentra un operador como caracter
          
          j=j+1;
          var resultado= operacion(caracter,resultadoExpresion,expresion,j);
          j=resultado.iteracion;

          resultadoExpresion=resultado.resultado;
        }
        
          
      }
      console.log("resultado: "+resultadoExpresion.toFixed(3));
      respuesta=resultadoExpresion.toFixed(3);

   
 
  //Inserción de la respuesta
  var respuestaHTML=document.createElement("INPUT");
  respuestaHTML.type="hidden";
  respuestaHTML.name="respuesta"+contador;
  respuestaHTML.value=respuesta;
  cuestionarios[i].appendChild(respuestaHTML);

  contador=contador+1;
  }
  

  
}

function enviarPreguntaDrag(datosRequest){
  /*
  for (var i=0;i<objetosDrag.length;i++){
    var lienzoI=objetosDrag[i];
  }
  */
 var lienzos=objetosDrag.length;
 datosRequest.append("lienzos",lienzos);
 var tiposAr=document.getElementsByClassName("tipoAr");

 for(var j=0;j<tiposAr.length;j++){
   cuestionarioI=tiposAr[j]
   //Captura de la imagen
   var imagen = cuestionarioI.querySelectorAll("input.imgs");

   var NombreImagen=imagen[0].files[0].name;

   var objetoLienzo=objetosDrag[j];
   //var coordenadasImg=objetoLienzo.img;
   var preguntas=objetoLienzo.pregunta;
   var flechas=objetoLienzo.flecha;
   var respuestas=objetoLienzo.respuesta;
   
   var imagen={
    nombre: NombreImagen,
   // coordenadas: coordenadasImg 
   } 
   //Array para enviar por la request y almacenar en la BD
   var pregunta=[];
   pregunta[0]=imagen;
   pregunta[1]=preguntas;
   pregunta[2]=flechas;
 
  var cuestionario={
    tipo: "tipoAr",
    pregunta: pregunta,
    respuesta: respuestas
  }
 
  var lienzoRequestI=JSON.stringify(cuestionario);
  console.log(lienzoRequestI)
  //Construcción de los datos para la Request
  var clavelienzo="lienzo"+j
  datosRequest.append(clavelienzo,lienzoRequestI);
  
 }
 


}


//-----Funciones para Matemáticas-----//
function concatenacion(expresion,iteracion){

  var concatenado={
    numeroConcatenado:0,
    iteracion:0
   };

   var caracter=expresion.slice(iteracion,iteracion+1);

   var concatenacion="";
  while(Number.isInteger(parseInt(caracter))){
    concatenacion=concatenacion+caracter;
    iteracion=iteracion+1;
    caracter=expresion.slice(iteracion,iteracion+1);
    
  }
  concatenado.numeroConcatenado=parseInt(concatenacion);
  concatenado.iteracion=iteracion;

 return concatenado;
}

function operacion(operador,numero1,expresion,iteracion){

  //Hacer que la operación de multiplicación sea aceptada de varias maneras
  if((operador=="*")||(operador=="x")||(operador=="X")){
    operador="*";
  }
  var resultadoOperacion={
    resultado:0,
    iteracion:0
  };

  console.log(" i Antes de entrar al concatenador"+iteracion);
      var numero2=concatenacion(expresion,iteracion);

      numero2=buscarFraccion(numero2.numeroConcatenado,expresion,(numero2.iteracion));
 
     resultadoOperacion.iteracion=numero2.iteracion -1;
     
  
  switch(operador){
    case"+":
   

      console.log("resultado de la funcion"+numero1+"+"+numero2.resultado+"="+(numero1+numero2.resultado));
     resultadoOperacion.resultado=numero1+numero2.resultado;
    break;
    case"-":
     console.log("resultado de la funcion"+numero1+"-"+numero2.resultado+"="+(numero1-numero2.resultado));
    resultadoOperacion.resultado=numero1-numero2.resultado;
   break;
   case"*":

    console.log("resultado de la funcion"+numero1+"*"+numero2.resultado+"="+(numero1*numero2.resultado));
   resultadoOperacion.resultado=numero1*numero2.resultado;
  break;
  case"/":
  
  
  console.log("resultado de la funcion"+numero1+"/"+numero2.resultado+"="+(numero1/numero2.resultado));
  resultadoOperacion.resultado=numero1/numero2.resultado;
 break;
  }

  return resultadoOperacion;
}


function buscarFraccion(numero,expresion,iteracion){
  var resultado={
    resultado: numero,
    iteracion: iteracion,
    
  };
  var posiblefraccion=fraccion(numero.toString(),expresion,iteracion);
  //Cambio del caracter leído si es fracción
if(posiblefraccion.esFraccion){
  resultado.resultado=posiblefraccion.resultado;
  resultado.iteracion=posiblefraccion.iteracion;
}

return resultado;
}




function fraccion(numero,expresion,iteracion){
  var resultado={
    resultado: 0,
    iteracion:0,
    esFraccion: false
  };
 
  var operando=expresion.slice(iteracion,iteracion+1);

  console.log("Valor recibido por la Función Fracción : "+operando);
  //Si el próximo espacio en el string es guion bajo convertimos a fracción
  if(operando=="_"){
    resultado.esFraccion=true;
    console.log("Debe Convertirse a fracción")
    var denominador=expresion.slice(iteracion+1,iteracion+2);
    denominador=parseInt(denominador);
    resultado.iteracion=iteracion+2;
    resultado.resultado=(numero/denominador)
  }
  else{ //Devolvemos los mismos datos que nos fueron dados en caso negativo
   resultado.resultado=numero;
   resultado.iteracion=iteracion; 
  }

  

   return resultado
}
//----Terminan funciones para preguntas de Matemáticas

function validarPreguntaMate(){
   
  var i=0;
  //Rastreo del div por su clase, que define el tipo de pregunta
  var cuestionarios=document.getElementsByClassName("tipoM");
  
  
  
  //Clasificación de los elementos enviados para no tener conflictos en la request
  for(i=0;i<cuestionarios.length;i++){
    var cuestionario=cuestionarios[i];
    var contenedorError=cuestionario.querySelectorAll("div.contenedorErrores")[0];
  var pregunta = cuestionario.querySelectorAll("input.pregunta")[0];
    
    var errorHTML=cuestionario.querySelectorAll("div.Error")[0];
  var error=false
  if(pregunta.value.length==0){
    error=true;
  }

  if(error && !errorHTML){
      var strVar="";
  strVar += " <div class=\" row justify-content-center mb-3\">";
  strVar += "          <div class=\"Error fw-bold col-10 mx-auto p-1 m-1 text-center mb-3 border border-danger\">";
  strVar += "            <p class=\"text-danger fs-5 at-2 py-3\" style=\"line-height: 5px;\">Error: Faltan Campos por Rellenar<\/p>";
  strVar += "          <\/div>";
  strVar += "        <\/div>";
    contenedorError.insertAdjacentHTML("afterbegin",strVar)
  }

}
}


 
function eliminar(obj){
  var objeto=obj
  var criterio=-1;
  while(criterio==-1){
      objeto=objeto.parentElement
      strClase=objeto.className;
      criterio=strClase.search("nivel-Superior");
  }
 
  objeto.remove();
  numeracionPregunta=numeracionPregunta-1;
}



//--------------VALIDACIONES------------//
function validaciones(){

  var revision={
    error: false,
    str:"Hay Campos sin llenar",
  }
  var intentos=document.getElementById("intentos");
  var cuestionarios=document.getElementsByClassName("cuestionario")[0];
  var nombreQuizz=document.getElementsByClassName("crearQ")[0];
  console.log(typeof(intentos.value));
  //Filtro para la vista de Docentes
  var vista=document.getElementById("vista");
  if(!vista){
     
      var Nivel=document.getElementById("nivel");
      var Grado=document.getElementById("grados");
      var Materia=document.getElementById("materias");
      var Bloque=document.getElementById("bloques");
      var Secuencia=document.getElementById("secuencias");
      
      if(Nivel.value=="Nivel"){
        revision.error=true;
        revision.str="No has definido el Nivel"
        return revision;
      }
      if(Grado.value=="Grado"){
        revision.error=true;
        revision.str="No has definido el Grado"
        return revision;
      }
      if(Materia.value=="Materia"){
        revision.error=true;
        revision.str="No has definido la Materia"
        return revision;
      }
      if(Bloque.value=="Bloque"){
        revision.error=true;
        revision.str="No has definido el Bloque"
        return revision;
      }
      if(Secuencia.value=="Secuencias"){
        revision.error=true;
        revision.str="No has definido la Secuencia"
        return revision;
      }
  }
   if(!cuestionarios){
    revision.error=true;
    revision.str="No hay preguntas en este Quizz"
   }

   

   if(nombreQuizz.value.length==0){
    revision.error=true;
    revision.str="No has definido el nombre del Quizz";
    return revision;
  }

   return revision;
  }

  function mensaje(strMensaje){
    console.log(strMensaje);
    
    var MensajeRetro=document.getElementById("mensaje");
    MensajeRetro.textContent=strMensaje;

    MensajeRetro.classList.remove('retroActivado','retroEfin');
    MensajeRetro.classList.remove('retroError');
    MensajeRetro.classList.add('retroActivado');
   
        setTimeout(function () {
          MensajeRetro.classList.add('retroEfin');
      }, 250);
    
  }
// Envío Final de todos los elementos
function envioQuizz(){
  
     //creación e inserción de un elemento con el número de preguntas del cuestionario
    var numeroPreguntas=document.getElementsByClassName("cuestionario").length;
    var numeroHTML=document.createElement("INPUT");
     numeroHTML.type = "hidden";
     numeroHTML.name="numeroPreguntas";
     numeroHTML.value = numeroPreguntas;

     insertor.appendChild(numeroHTML);
     //Envío de tipos de preguntas
    envioPreguntaAbierta();
    envioPreguntaRelacional();
    envioPreguntaOM();
    
    envioPreguntaMate();
    envioPreguntaIT();
  var formulario=document.getElementById("formularioQuizz");

  
  var datosEnvio=new FormData(formulario);
 
  enviarPreguntaDrag(datosEnvio);
  var request = new XMLHttpRequest();
  request.open("POST", "/editores/crear");
  request.send(datosEnvio);
  request.onreadystatechange = function (aEvt) {
    if (request.readyState == 4) {
       if(request.status == 200){
        console.log(request.responseText);
        var nuevoQID=request.responseText;
        var link="/visualizar/"+nuevoQID;
        console.log(link)
        window.location.replace(link);
       }
       else
        {console.log("No se ha recibido nada");}
    }
  };
 // formulario.submit();
}

function setNumeroPreguntas(numero){
  numeracionPregunta=numero
}

function crearQuizz(){
  

  
  
  
  validarPreguntaRelacional();
  validarPreguntaOM();
  validarPreguntaAbierta();
  validarPreguntaIT();
  validarPreguntaMate();
  
    var validacion=validaciones();
   
    var errores=document.getElementsByClassName("Error")[0];
    var erroresRespuesta=document.getElementsByClassName("ErrorR")[0];
    var erroresImagen=document.getElementsByClassName("ErrorI")[0];
    if(errores ||erroresRespuesta || erroresImagen||validacion.error){
      mensaje(validacion.str);
    }
    else{
     
      envioQuizz();
      var formulario=document.getElementById("formularioQuizz");
        document.getElementById("malla").style.display="block";
        document.getElementById("msgE").style.display="block";
        setTimeout(function () {
          location.reload();
      }, 1500);
      formulario.reset();
    }
    
}