      
        window.addEventListener("load", function(e){
            //sonidos
            var  seleccionarPregunta=new sound("/sonidos/seleccionaRR.mp3");
            var asociarPregunta=new sound("/sonidos/asociaRR.mp3");

            var preguntasRelacionales=document.getElementsByClassName("tablaEjercicio");
            console.log(preguntasRelacionales.length);
            
            for(var tab=0;tab<preguntasRelacionales.length;tab++){

                var tablaSelecta=document.querySelectorAll(".tablaEjercicio")[tab];
                //   if(tablaSelecta){
                   var preguntaSelecta;
                   var filasReactivos = tablaSelecta.querySelectorAll("tr");
                  //var filasReactivos = document.querySelectorAll(".tablaEjercicio tr");
                   var respuestas = [];
                   var botones = [];
                 
                   var tempPregunta;
                   var tempBoton;
                   var tempRespuesta;
                   
       
                   
                   Array.prototype.forEach.call(filasReactivos, function(fila){
                       tempPregunta = fila.querySelector("td");
                       tempRespuesta = fila.querySelector("td.celdaRespuesta");
                       botonPregunta=fila.querySelector("td.botonPregunta");
                       tempBoton = fila.querySelector("td.botonRespuesta");//Es la celda, no el botón en sí
                       fila.respuesta = tempRespuesta;
                       respuestas.push(tempRespuesta);
                       botones.push(tempBoton);
                       
                      // tempRespuesta.parentNode.removeChild(tempRespuesta);
       
                       
                       // Al apretar un botón, se revisa si la respuesta es correcta
                       //Se marca correcta o incorrecta
                       //Se procede a la siguiente pregunta
                        
       
                       botonPregunta.addEventListener("click", alApretarPregunta, false);
                       tempBoton.addEventListener("click", alApretarOpcion, false);
                       
                      
                   });
       
                 shuffle(respuestas);
            
                   Array.prototype.forEach.call(filasReactivos, function(fila, index){
                      
                       fila.appendChild(respuestas[index]);
                   });
       
                   function obtenerPreguntaSelecta(){
                       return preguntaSelecta;
                   }
                
            }
            /*
            var tablaSelecta=document.querySelectorAll(".tablaEjercicio")[0];
         //   if(tablaSelecta){
            var preguntaSelecta;
            var filasReactivos = tablaSelecta.querySelectorAll("tr");
           //var filasReactivos = document.querySelectorAll(".tablaEjercicio tr");
            var respuestas = [];
            var botones = [];
          
            var tempPregunta;
            var tempBoton;
            var tempRespuesta;
            

            
            Array.prototype.forEach.call(filasReactivos, function(fila){
                tempPregunta = fila.querySelector("td");
                tempRespuesta = fila.querySelector("td.celdaRespuesta");
                botonPregunta=fila.querySelector("td.botonPregunta");
                tempBoton = fila.querySelector("td.botonRespuesta");//Es la celda, no el botón en sí
                fila.respuesta = tempRespuesta;
                respuestas.push(tempRespuesta);
                botones.push(tempBoton);
                
               // tempRespuesta.parentNode.removeChild(tempRespuesta);

                
                // Al apretar un botón, se revisa si la respuesta es correcta
                //Se marca correcta o incorrecta
                //Se procede a la siguiente pregunta
                 

                botonPregunta.addEventListener("click", alApretarPregunta, false);
                tempBoton.addEventListener("click", alApretarOpcion, false);

               
            });

            shuffle(respuestas);
     
            Array.prototype.forEach.call(filasReactivos, function(fila, index){
               
                fila.appendChild(respuestas[index]);
            });

            function obtenerPreguntaSelecta(){
                return preguntaSelecta;
            }
            */

            //Función de los botones Pregunta 
            function alApretarPregunta(e){
                seleccionarPregunta.stop();
                seleccionarPregunta.reload();
                e.stopPropagation();
                e.preventDefault();
                console.log(e.currentTarget.nextElementSibling);
                //Revisamos si no está nada más selecto
                antiguoElemento=document.getElementById(preguntaSelecta);
                nuevoElemento=e.currentTarget.nextElementSibling;

                if(!antiguoElemento){
                    antiguoElemento=e.currentTarget.nextElementSibling;
                    console.log(antiguoElemento)
                }
                if(antiguoElemento===nuevoElemento){
                    //Mismo elemento que el click
               

                        if(e.currentTarget.nextElementSibling.className=="selecta")
                    {   //Deselecciona
                        e.currentTarget.nextElementSibling.className="";
                        e.currentTarget.nextElementSibling.style.backgroundColor="white";
                    }
                    else{
                        //Selecciona
                        preguntaSelecta=e.currentTarget.nextElementSibling.id;
                        e.currentTarget.nextElementSibling.className+="selecta";
                        e.currentTarget.nextElementSibling.style.backgroundColor =
                          "#FFE8CD";
                        e.currentTarget.nextElementSibling.style.color =
                        "black";
                    }

                }
                else{
                    //diferente elemento que el click
                    antiguoElemento.style.backgroundColor="#f69100";
                    antiguoElemento.style.color="white";
                    preguntaSelecta=nuevoElemento.id;
                    nuevoElemento.className+="selecta";
                    nuevoElemento.style.backgroundColor = "#FFE8CD";
                    nuevoElemento.style.color = "black";
                }
            
             
                seleccionarPregunta.play();
                console.log(preguntaSelecta);
            }
            //Función de los Botones Respuesta

            function alApretarOpcion(e){

                e.stopPropagation();
                e.preventDefault();
                asociarPregunta.stop();
                asociarPregunta.reload();
                //Extracción del elemento respuesta
                 var preguntaSelecta=document.getElementById(obtenerPreguntaSelecta());
                
                 //Obtención de los numeros del elemento que se relaciona
                var numeroPreguntaRelacion=preguntaSelecta.previousElementSibling.textContent;

                var respuestaSeleccionada=e.currentTarget.nextElementSibling;
                
                respuestaSeleccionada.style.backgroundColor=" #ffc380";
                

                if(antiguo=document.getElementById("antigua"+preguntaSelecta.id)){
                    console.log("hay un duplicado");
                    var nuevo=e.currentTarget.nextElementSibling;

                    antiguo.id=" ";
                    antiguo.previousElementSibling.querySelector("button").innerHTML="";
                    var antiguaRequest=antiguo.children[0].children[0];
                    antiguo.style.backgroundColor="#f69100";
                    //---Eliminación de las respuestas para la Request--//
                    antiguaRequest.value="";

                    var nuevaRequest=nuevo.children[0].children[0];
                    nuevo.previousElementSibling.querySelector("button").innerHTML=numeroPreguntaRelacion;
                    nuevo.id="antigua"+preguntaSelecta.id;
                    //nuevo.style.backgroundColor="cyan";

                    //---Asignación para los valores de envio por la request---//
                    nuevaRequest.value=preguntaSelecta.textContent;
                }
                else{
                    console.log("solo hay una");
                    var respuestaRequest=respuestaSeleccionada.children[0].children[0];
                    respuestaSeleccionada.id="antigua"+preguntaSelecta.id;
                    
                    //Impresión del número en el botón(para Relación)
                    respuestaSeleccionada.previousElementSibling.querySelector("button").innerHTML=numeroPreguntaRelacion;

                      //---------ASIGNACIÓN de los valores para la REQUEST------------//
                      respuestaRequest.value=preguntaSelecta.textContent;

                      //---------ASIGNACIÓN de los valores para la REQUEST------------//
                    
                }
                
                asociarPregunta.play();
            }


            /* Función para revolver respuestas */
            function shuffle(array) {
                var currentIndex = array.length
                        , temporaryValue
                        , randomIndex
                        ;
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
               
                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }
       // }
    }, false);