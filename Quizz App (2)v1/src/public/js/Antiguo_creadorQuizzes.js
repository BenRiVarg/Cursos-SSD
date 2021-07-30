//--------JS PARA LA INYECCIÓN DE PREGUNTAS EN EL DOM DE EDITORES/CREAR Y EL PROCESAMIENTO PARA SU ENVÍO----------//

//Variable para hacer la inserción de elementos dentro del cuertpo del HTML
var insertor=document.getElementById("insercion");
//Variable global para "enumerar" todas las preguntas,respuestas y tipo  de un cuestionario para la request
var contador=1;
//Variable para elementos que deben ser Previsualiados
var contadorPreV=1;
//---Variables para la pregunta Drag--//
var objetosDrag=[];
var lienzo={
            id:0,
            img:[],
            pregunta:[],
            respuesta:[],
            flecha:[]

            }
            //Simulación de un solo lienzo
objetosDrag[0]=lienzo;
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

    
  
var strVar="";
strVar += "<div class=\"tipoT cuestionario cuestionario row justify-content-center mt-5 pt-5\">";
strVar += "                    <div class=\"container text-center\">";
strVar += "                      <h4>Pregunta Abierta<\/h4>";
strVar += "                    <\/div>";
strVar += "                        <div class=\"col-md-7 \">";
strVar += "                          <label for=\"formGroupExampleInput\" class=\"form-label\">Pregunta<\/label>";
strVar += "                          <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la pregunta\">";
strVar += "                        <\/div>";
strVar += "                        <div class=\"col-md-7 \">";
strVar += "                          <label for=\"formGroupExampleInput2\" class=\"form-label\">Respuesta<\/label>";
strVar += "                            <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Escriba la respuesta\">";
strVar += "                            ";
strVar += "                            ";
strVar += "                        <\/div>";
strVar += "                        <div class=\"editar col-md-7\" role=\"group\" aria-label=\"Basic mixed styles example\" align=\"left\" float=\"left\">";
strVar += "                              <br>";
strVar += "                              <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
strVar += "                            <\/div>";
strVar += "                  <\/div>";
insertor.insertAdjacentHTML("beforeend",strVar);

       
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
//Variable global para dar ids que nunca se repitan para las preguntas drag
var contadorIDrag=0;
function palabras() {
  var strVar = "";
  var palabra = document.querySelector("#palabra").value;
  var palabraPartida = palabra.split(" ");
  var list = document.getElementsByClassName("palabraid");
  /* var x = $("#palabra").val(); */

  /* palab.push(palabra); */

  /* el ciclo for lo utilizo para saber cuantas son las veces que va a inyectar la etiqueta con la palabra */
  for (var i = 0; i < palabraPartida.length; i++) {
    var id="drag"+contadorIDrag;
    strVar += '<div id=\"'+id+'\" class="palabraid text-dark fw-bold text-center elementoDrag" style=\"width:90px;\">';
    strVar += "" + palabraPartida[i] + " </div>";

    contadorIDrag++;
  }


  var espacioLienzo=document.getElementById("lienzo0").children[0];//.innerHTML = strVar;
  espacioLienzo.insertAdjacentHTML("beforeend",strVar);   

  arrastrable();
}

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
        /*  var count = false; */
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

function arrastrable() {
  $(".elementoDrag").draggable({
    revert: "invalid",
    cursor: "move",
  });
}

function cuadros() {
  var cantidad = document.querySelector("#caRe").value;
  
  for (var i = 0; i < cantidad; i++) {
    var strVar = '  <div id="recuadro' + contadorIDrag + '" class="div1 recuadro elementoDrag reactivo"></div>';
    var lienzo = document.getElementById("lienzo0");
    lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
    contadorIDrag++;
  }
  arrastrable();
  activarReactivo();
}

function flechaHoDerecha() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar += '<img class=" flecha imagenes elementoDrag" id="fid'+contadorIDrag+'"src="/img/flecha.png" alt="">';
    contadorIDrag++
   
  }
  var lienzo=document.getElementById("lienzo0");
  lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
}

function flechaHoIzquierda() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar += '<img class="flecha imagenes elementoDrag" id="fdi"'+contadorIDrag+'" src="/img/flechaHoIz.png" alt="">';
    contadorIDrag++
  }
  var lienzo=document.getElementById("lienzo0");
  lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
  
}

function flechaDiaDerecha() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar +=
      '<img class="flecha diagonal elementoDrag" id="fsd'+contadorIDrag+'" src="/img/flechadiaderecha.png" alt="">';
    contadorIDrag++
    }

  var lienzo=document.getElementById("lienzo0");
  lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
}

function flechaDiaIzquierda() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar +=
      '<img class="flecha diagonal elementoDrag" id="fsi'+contadorIDrag+'" src="/img/flechadigaiz.png" alt="">';
      contadorIDrag++;
    }

  var lienzo=document.getElementById("lienzo0");
  lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
}

function flechaDiaDerechaInv() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar +=
      '<img class="flecha diagonal elementoDrag" id="fad'+contadorIDrag+'" src="/img/diagonalderinvertida.png" alt="">';
      contadorIDrag++;
    }

  var lienzo=document.getElementById("lienzo0");
  lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
}

function flechaDiaIzquierdaInv() {
  var strVar = "";
  var cantidad = document.querySelector("#caFle").value;
  for (var i = 0; i < cantidad; i++) {
    strVar +=
      '<img class="flecha diagonal elementoDrag" id="fai'+contadorIDrag+'" src="/img/diagonalizinvertida.png" alt="">';
    contadorIDrag++;
    }

  var lienzo=document.getElementById("lienzo0");
  lienzo.children[0].insertAdjacentHTML("beforeend", strVar);
  arrastrable();
}




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

      //Revisamos la clase que tiene el objeto que se mueve para guardarlo de cierta manera
      var strCriterio=objetoHTML.className
      console.log(strCriterio);
      if(strCriterio.search("recuadro")!=-1){
        datos.tipoElemento="recuadro";
      }
      else if(strCriterio.search("flecha")!=-1){
        datos.tipoElemento="flecha";
        
      }
      var strlienzo=this.id;
      var espacioObj=Number.parseInt(strlienzo.slice((strlienzo.length-1),(strlienzo.length)));
      
     
      construirObjLienzo(espacioObj,datos);

    }
  });


function activarReactivo(){
$(".reactivo").droppable({
  drop: function (event, ui) {

    console.log("Detectando ID");
    elemento=ui.draggable;
    elemento=elemento[0];
    event.stopPropagation();
    //Variable para detectar el id del lienzo al que pertenece el elemento 
    var strlienzo=this.parentElement.parentElement.id;

    //Variable para llamar al espacio del objeto del lienzo
    var espacioObj=Number.parseInt(strlienzo.slice((strlienzo.length-1),(strlienzo.length)));

    

    
    
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

    construirObjLienzo(espacioObj,datos)

  }
});
}


function construirObjLienzo(espacioObj,datos){
  
  var objLienzo=objetosDrag[espacioObj];
  var operacion=datos.operacion;
  switch(operacion){
    case "preg-res":
      //Escribir(objLienzo,(datos.pregunta.id),datos,"pregunta","respuesta");
      
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

function previsualizarDraw(){
    //Función para crear las funciones preview
    document.getElementById("L-file").onchange = function (e) {
      // Creamos el objeto de la clase FileReader
      let reader = new FileReader();

      // Leemos el archivo subido y se lo pasamos a nuestro fileReader
      reader.readAsDataURL(e.target.files[0]);

      // Le decimos que cuando este listo ejecute el código interno
      reader.onload = function () {
        let preview = document.getElementById("lienzo0"),
          image = document.createElement("img");
        image.src = reader.result;

            
        var imageDatos = new Image();
        imageDatos.src = reader.result;
        imageDatos.id="image"+contadorIDrag;


        var IDimagen=imageDatos.id;
        imageDatos.onload = function() {
            // access image size here 
            console.log("Resultado de la función")
          
            //Espacio centrado en base al tamaño del lienzo
            var leftAjustado= Math.round((770-this.width)/2);
            var topAjustado= Math.round((550-this.height)/2);
            
       
            

            imageDatos.style.position="absolute";
            imageDatos.style.top=topAjustado+"px";
            imageDatos.style.left=leftAjustado+"px";

            var datos={
              tipoElemento: "img",
              operacion: "reposicion",
              coordenadas:
                { id: IDimagen,
                  top: topAjustado,
                  left: leftAjustado
                }
            }
            
            construirObjLienzo(0,datos);
        }

        
      
        //preview.innerHTML = "";

        //Si ya hay una imagen
        if(preview.children[1]){
          preview.children[1].remove()
          preview.appendChild(imageDatos)
        }
        else{
          preview.appendChild(imageDatos);
        }
        
      };
    };
}

previsualizarDraw();
//----Terminan funciones Drag--------//

      function preguntaArrastrar() {
                var strVar="";
        strVar += "<div class=\"tipoAr cuestionario\">";
        strVar += "    <div class=\"row mt-3\">";
        strVar += "      <h1 class=\"text-center mt-5\">Crear exámen Drag<\/h1>";
        strVar += "      <div class=\"col-lg-12 sm-12 text-center\">";
        strVar += "        <div class=\"row\">";
        strVar += "          <div class=\"col-lg-6 centrado\">";
        strVar += "            <div class=\"mt-5\">";
        strVar += "              <h4 class=\"text-center mb-4\">Busca la imagen que quieras agregar:<\/h4>";
        strVar += "              <input id=\"L-file\" type=\"file\"  class=\"form-control imgs\"  name=\"imgs\" accept=\"image\/*\">";
        strVar += "              <div class=\"mt-3\">";
        strVar += "                <h4 class=\"text-dark mb-3\">Coloca la cantidad de recuadros:<\/h4>";
        strVar += "                <div class=\"mb-3\">";
        strVar += "                  <input id=\"caRe\" type=\"number\"  placeholder=\"Cantidad:\" class=\"form-control\">";
        strVar += "                <\/div>";
        strVar += "                <button type=\"button\" class=\"btn btn-primary fw-bold\" onclick=\"cuadros()\">Crear<\/button>";
        strVar += "              <\/div>";
        strVar += "              <h4 class=\"text-dark mb-3 mt-3\">Escribe las palabras que quieras agregar:<\/h4>";
        strVar += "              <div class=\"mb-3\">";
        strVar += "                <input id=\"palabra\" type=\"text\"  placeholder=\"Coloca las palabras:\" class=\"form-control\">";
        strVar += "              <\/div>";
        strVar += "              <button type=\"button\" class=\"btn btn-primary fw-bold\" onclick=\"palabras()\">Crear<\/button>";
        strVar += "              <div class=\"mt-2\">";
        strVar += "                <h4 class=\"text-dark mb-3\">Coloca la cantidad de flechas:<\/h4>";
        strVar += "                <div class=\"mb-3\">";
        strVar += "                  <input id=\"caFle\" type=\"number\"  placeholder=\"Cantidad:\" class=\"form-control\">";
        strVar += "                <\/div>";
        strVar += "                <h4 class=\"text-dark mb-3\">Tipos de flecha:<\/h4>";
        strVar += "                <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\" onclick=\"flechaHoDerecha()\"><i";
        strVar += "                    class=\"fas fa-arrow-right fa-lg\"><\/i><\/button>";
        strVar += "                <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\" onclick=\"flechaHoIzquierda()\"><i";
        strVar += "                    class=\"fas fa-arrow-left fa-lg\"><\/i><\/button>";
        strVar += "                <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\" onclick=\"flechaDiaDerecha()\"><i";
        strVar += "                    class=\"fas fa-location-arrow fa-lg\"><\/i><\/button>";
        strVar += "              <\/div>";
        strVar += "              <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\" onclick=\"flechaDiaIzquierda()\"><i";
        strVar += "                  class=\"fas fa-location-arrow fa-rotate-270 fa-lg\"><\/i><\/button>";
        strVar += "              <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\" onclick=\"flechaDiaDerechaInv()\"><i";
        strVar += "                  class=\"fas fa-location-arrow fa-rotate-90 fa-lg\"><\/i><\/button>";
        strVar += "              <button type=\"button\" class=\"btn btn-primary fw-bold mb-3\" onclick=\"flechaDiaIzquierdaInv()\"><i";
        strVar += "                  class=\"fas fa-location-arrow fa-rotate-180 fa-lg\"><\/i><\/button>";
        strVar += "            <\/div>";
        strVar += "            <\/div>";
        strVar += "          <\/div>";
        strVar += "          <!--Comienza Lienzo-->";
        strVar += "          <div class=\"col-lg-6 lienzo shadow mt-5 mb-5\" id=\"lienzo0\">";
        strVar += "            <div class=\"col-12\">";
        strVar += "             ";
        strVar += "            <\/div>";
        strVar += "          <\/div>";
        strVar += "          <!-- Termina Lienzo-->";
        strVar += "        <\/div>";
        strVar += "      <\/div>";
        strVar += "    <\/div>";
        strVar += "    <\/div>";
        strVar += "  <\/div>";
        
      insertor.insertAdjacentHTML("beforeend",strVar);   

      previsualizarDraw();
      }


      
      
      

function preguntaRelacional(){
  var strVar="";
  strVar += " <div class=\"tipoR cuestionario cuestionario row justify-content-center mt-5 pt-5 container\">";
  strVar += "                                  ";
  strVar += "                                    <div class=\"col-md-4\">";
  strVar += "                                      <div class=\"\">";
  strVar += "                                          <div class=\"container text-center\">";
  strVar += "                                            <h4 class=\"text-center\">Pregunta Relacional<\/h4><\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                          <br>";
  strVar += "                                    <\/div>";
  strVar += "                                    <div class=\"contenedorItem row justify-content-center mb-3\">";
  strVar += "                                      <div class=\"container row justify-content-center mb-3\">";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                              <div class=\"\">";
  strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
  strVar += "                                              <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                      <\/div>";
  strVar += "                                      <br>";
  strVar += "                                      <div class=\"container row justify-content-center mb-3\">";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                              <div class=\"\">";
  strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
  strVar += "                                              <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                      <\/div>";
  strVar += "                                      <br>";
  strVar += "                                      <div class=\"container row justify-content-center mb-3\">";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                                <div class=\"\">";
  strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
  strVar += "                                                <\/div>";
  strVar += "                                            <\/div>";
  strVar += "                                            <div class=\"col-md-2 \" >";
  strVar += "                                              <div class=\"\">";
  strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
  strVar += "                                              <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                      <\/div>";
  strVar += "                                      <br>";
  strVar += "                                      <div class=\"container row justify-content-center mb-4\">";
  strVar += "                                        <div class=\"col-md-2 ml-0\" >";
  strVar += "                                            <div class=\"\">";
  strVar += "                                              <button class=\"btn btn-info \" type=\"button\" onclick=\"reactivoRelacional(this)\">Añadir Reactivo<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                        <\/div>";
  strVar += "                                 ";
  strVar += "                                      <\/div>";
  strVar += "                                  <br>";
  strVar += "                                  ";
  strVar += "                ";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger col-md-2 text-center\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
  strVar += "                                  ";
  strVar += "                                          ";
  strVar += "                                    <\/div>         ";
  strVar += "                    <\/div>               ";
  strVar += "";

insertor.insertAdjacentHTML("beforeend",strVar);
}


//función para crear más reactivos en preguntas relacionales
function reactivoRelacional(obj){
  
      //Extración del Div donde se inyectará el nuevo reactivo
      var contenedorCuestionario=obj.parentElement.parentElement.parentElement.previousElementSibling;
      
      var strVar="";
      strVar += "<div class=\"container row justify-content-center mb-3\">";
      strVar += "                                            <div class=\"col-md-2 \" >";
      strVar += "                                                <div class=\"\">";
      strVar += "                                                    <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta\">";
      strVar += "                                                <\/div>";
      strVar += "                                            <\/div>";
      strVar += "                                            <div class=\"col-md-2 \" >";
      strVar += "                                                <div class=\"\">";
      strVar += "                                                    <input type=\"text\" class=\"form-control respuesta \"  placeholder=\"Respuesta\">";
      strVar += "                                                <\/div>";
      strVar += "                                            <\/div>";
      strVar += "                                            <div class=\"col-md-2 \" >";
      strVar += "                                              <div class=\"\">";
      strVar += "                                                <button class=\"btn btn-danger \" type=\"button\" onclick=\"quitarReactivoRelacional(this)\">QuitarReactivo<\/button>";
      strVar += "                                              <\/div>";
      strVar += "                                          <\/div>";
      strVar += "                                      <\/div>";
      strVar += "                                      <br>";

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

  var strVar="";
  strVar += " <div class=\"tipoOM cuestionario rounded-sm  \">";
  strVar += "                      <div class=\"row\">";
  strVar += "                         ";
  strVar += "                              <div class=\"col-lg-12 col-md-6 col-sm-6 row justify-content-center mt-5 pt-5\">";
  strVar += "                                    <div  class=\"text-center\">";
  strVar += "                                          <h3>Pregunta de Opción Múltiple<\/h3>";
  strVar += "                                          <div class=\"col-md-6 pregunta mx-auto mt-3\">";
  strVar += "                                            <div class=\"text-center\">";
  strVar += "                                              <p class=\"text-primary\"><b>Instruciones: <\/b> Para hacer una pregunta Verdadero-Falso , solo define la pregunta al alumno y selecciona correcta. SI deseas opción Multiple,define la pregunta del alumno, borra los campos y escribe las respuestas que desees y finalmente selecciona las correctas<\/p>";
  strVar += "                                            <\/div>";
  strVar += "                                            <input type=\"text\" class=\"form-control pregunta \"  placeholder=\"Pregunta para el alumno\">";
  strVar += "                                          <\/div>";
  strVar += "                                    <\/div>";
  strVar += "                                    <div class=\" col-lg-12 col-md-6 col-sm-6 reactivos row justify-content-center mt-5 pt-3\"  align=\"center\">";
  strVar += "                                          <div class=\"mb-3 \" >";
  strVar += "                                            <div class=\"col-md-6 py-2\">";
  strVar += "                                              <input type=\"text\" class=\"form-control opcion mb-2\"  placeholder=\"Verdadero\" value=\"verdadero\">";
  strVar += "                                            <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                          ";
  strVar += "                                          <\/div>";
  strVar += "                                          <div class=\"mb-3 \" >";
  strVar += "                                            <div class=\"col-md-6 py-2\">";
  strVar += "                                              <input type=\"text\" class=\"form-control opcion mb-2\"  placeholder=\"Falso\" value=\"falso\">";
  strVar += "                                            <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                          <\/div>";
  strVar += "                                    <\/div>";
  strVar += "                               ";
  strVar += "                               <\/div>";
  strVar += "                      <\/div>";
  strVar += "                        <div class=\"editar text-center mt-3\" role=\"group\" aria-label=\"Basic mixed styles example\">";
  strVar += "                          <button type=\"button\" class=\"btn btn-success\" onclick=\"reactivoOM(this)\">Agregar Reactivo<\/button>";
  strVar += "                          <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Quitar Pregunta<\/button>";
  strVar += "                        <\/div>";
  strVar += "                  <\/div>";

  
  

insertor.insertAdjacentHTML("beforeend",strVar);
}

//Función para la creación de una opción en preguntas de opción múltiple
function reactivoOM(obj){

  //búsqueda del div donde se inyectará el nuevo reactivo
  var contenedor=obj.parentElement.previousElementSibling.children[0].querySelectorAll("div div.reactivos")[0];

  console.log(contenedor);

  
  var strVar="";
  strVar += "   <div class=\"mb-3 \" >";
  strVar += "                                            <div class=\"col-md-6 py-2\">";
  strVar += "                                              <input type=\"text\" class=\"form-control opcion mb-2\"  placeholder=\"Opción\">";
  strVar += "                                            <button type=\"button\" class=\"btn btn-info\" onclick=\"seleccionarRespuesta(this)\">Correcta<\/button>";
  strVar += "                                            <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\">Eliminar Opción<\/button>";
  strVar += "                                            <\/div>";
  strVar += "                                          ";
  strVar += "                                          <\/div>";
  

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

function preguntaIT(){
  var strVar="";
strVar += "  <div class=\"row justify-content-center mt-5 pt-5\" id=\"insercion\">";
strVar += "                ";
strVar += "                <div class=\"container tipoIT cuestionario mt-4 col-md-7 \">";
strVar += "                    <div class=\"text-center\">";
strVar += "                      <p class=\"display-6\">Pregunta Texto-Imagen<\/p>";
strVar += "                      <p class=\"text-primary\"><b>Instruciones: <\/b> Seleccione la imagen a cargar, y defina pregunta y respuesta<\/p>";
strVar += "                    <\/div>";
strVar += "                    <input required type=\"file\" id=\"imgIT"+contadorPreV+"\" accept=\"image\/*\" class=\"imgs\" name=\"imgs\">";
strVar += "                    <input required type=\"hidden\" class=\"imagenrequest\">";
strVar += "                    <div id=\"prevIT"+contadorPreV+"\"  class=\"mx-auto\"><\/div>";
strVar += "                    <div class=\"mb-3\">";
strVar += "                      <label for=\"formGroupExampleInput\" class=\"form-label\">Pregunta<\/label>";
strVar += "                      <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la pregunta\">";
strVar += "                    <\/div>";
strVar += "                    <div class=\"mb-3\">";
strVar += "                        <label for=\"formGroupExampleInput2\" class=\"form-label\">Respuesta<\/label>";
strVar += "                        <input required type=\"text\" class=\"form-control respuesta \"  placeholder=\"Escriba la respuesta\">";
strVar += "                    <\/div>";
strVar += "                    <div class=\"editar\" role=\"group\" aria-label=\"Basic mixed styles example\" float=\"left\" align=\"left\">";
strVar += "                    <br>";
strVar += "                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\" align=\"left\">Quitar Pregunta<\/button>";
strVar += "                  <\/div>";
strVar += "                 <\/div>";
strVar += "              <\/div>";
  

insertor.insertAdjacentHTML("beforeend",strVar);
previsualizarIT();
contadorPreV++;
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

  var strVar="";
strVar += "    <div class=\"tipoM cuestionario row justify-content-center mt-5 pt-5\">";
strVar += "            <div class=\"text-center\">";
strVar += "              <h4>Pregunta de Matemáticas<\/h4>";
strVar += "              <p class=\"text-primary\"><b>Instruciones: <\/b>   Si requiere escribir una fracción ingrese guion bajo\"_\" p. ej. 3_4 <\/p>";
strVar += "             ";
strVar += "            <\/div>";
strVar += "                   <div class=\"col-md-7\">";
strVar += "                        <label for=\"formGroupExampleInput\" class=\"form-label\">Expresión<\/label>";
strVar += "                        <input type=\"text\" class=\"form-control pregunta\"  placeholder=\"Escriba la expresión a mostrar al alumno\">";
strVar += "                   <\/div>";
strVar += "                    <div class=\"editar col-md-7\" role=\"group\" aria-label=\"Basic mixed styles example\" float=\"left\" align=\"left\" >";
strVar += "                      <br>";
strVar += "                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"eliminar(this)\"align=\"left\">Quitar Pregunta<\/button>";
strVar += "                    <\/div>";
strVar += "          <\/div>";

insertor.insertAdjacentHTML("beforeend",strVar);
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
    
    var pregunta = cuestionarios[i].querySelectorAll("input.pregunta");
    pregunta[0].name="pregunta"+contador;

    var respuesta = cuestionarios[i].querySelectorAll("input.respuesta");
    respuesta[0].name="respuesta"+contador;
 
    contador=contador+1;
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
        
         //Se agrega el tipo de pregunta por medio de un elemento hidden
      var tipoHTML=contadorTipo();
      //Definición del tipo de pregunta
      tipoHTML.value="tipoOM";
      //inserción
      cuestionarios[i].appendChild(tipoHTML);

    
      contador=contador+1;
      }
}

function envioPreguntaIT(){
   
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
 var tiposAr=document.getElementsByClassName("tipoAr");

 for(var j=0;j<tiposAr.length;j++){
   cuestionarioI=tiposAr[j]
   //Captura de la imagen
   var imagen = cuestionarioI.querySelectorAll("input.imgs");

   var NombreImagen=imagen[0].files[0].name;

   var objetoLienzo=objetosDrag[0];
   var coordenadasImg=objetoLienzo.img;
   var preguntas=objetoLienzo.pregunta;
   var flechas=objetoLienzo.flecha;
   var respuestas=objetoLienzo.respuesta;
   
   var imagen={
    nombre: NombreImagen,
    coordenadas: coordenadasImg 
   } 

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
  datosRequest.append("lienzos",lienzos);
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



 
function eliminar(obj){
  obj.parentElement.parentElement.remove();
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
    
}