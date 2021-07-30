var momentoActual=new Date().getTime();

var capturaTiempo="";
var temporizadorFQ=new Date();
//Establecimiento del Fin del Quizz
 var finQuizz=temporizadorFQ.getMinutes()+30;

 temporizadorFQ.setMinutes(finQuizz);
// Set the date we're counting down to
var countDownDate = temporizadorFQ.getTime();

//console.log(tiempoQuizz);

var tiempoDisponible=true;
// Update the count down every 1 second
var x = setInterval(function () {
  if(tiempoDisponible){
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("cronometro").innerHTML =
     hours + " : " + minutes + " : " + seconds + " ";

  //Variable para recolectar el tiempo que el alumno ha invertido en el quizz
  var delta=now-momentoActual;

  var deltaHours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var deltaMinutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
  var deltaSeconds = Math.floor((delta % (1000 * 60)) / 1000);
  
  capturaTiempo=deltaHours+":"+deltaMinutes+":"+deltaSeconds;

  // If the count down is over, write some text
  if (distance < 0) {
    enviarQuizz();
    document.getElementById("cronometro").innerHTML = "EXPIRED";
    tiempoDisponible=false;
  }
  }
}, 1000);

function tomarTiempo(){
  
  //console.log(capturaTiempo);
  var strVar="";
   strVar += "<input type=\"hidden\" name=\"tiempo\" value=\""+capturaTiempo+"\">";
  formulario.insertAdjacentHTML("beforeend",strVar);
}


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

//Funciones para la barra de carga de los quizzes
var progreso = 0;
var cambioProgreso=0;
var preguntaInicial=document.getElementsByClassName("active")[0];
  var preguntaFinal=document.getElementsByClassName("pregunta-Final")[0];
  var cambioPregunta=new sound("/sonidos/cambio_pregunta.mp3");
  cambioPregunta.sound.volume=1;

function getTotal(valor){
  var totalPreguntas=Number.parseInt(valor);
  cambioProgreso=100/totalPreguntas
  cambioProgreso=Math.round(cambioProgreso)+1;
  $("#bar").css("width", progreso + "%");
  progreso=cambioProgreso;

}

//Función para aumentar la barra de progreso
 function barra() {
   var preguntaPrevia=document.getElementsByClassName("active")[0];//.children[0];

   if(preguntaPrevia==preguntaFinal){
     progreso=100;
    $("#bar").css("width", progreso + "%");
   }
   else{

   
   progreso += cambioProgreso;
  
   $("#bar").css("width", progreso + "%");
  }
  cambioPregunta.play();
}
 
//Función para decrecer la barra de progreso 
 function barraM() {
   console.log(progreso)
  var preguntaPrevia=document.getElementsByClassName("active")[0];//.children[0];

  //Variable para detectar el final del Quizz
  var semiFinal=document.getElementsByClassName("active")[0].previousElementSibling;
//
  if(preguntaPrevia==preguntaInicial){
    progreso=0;
    $("#bar").css("width", progreso + "%");
  }
  else if(semiFinal==preguntaFinal){
    progreso=100;
    $("#bar").css("width", progreso + "%");
  }
  else{
    progreso -= cambioProgreso;
   
    $("#bar").css("width", progreso + "%");
  }
  cambioPregunta.play();
 }

 