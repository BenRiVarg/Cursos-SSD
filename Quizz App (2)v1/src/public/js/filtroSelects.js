

var niveles=document.getElementsByClassName("select");
      
var arrNiveles=[];

///Funcionalidad para Edición 
var primercambio=true;

for(var i=0;i<niveles.length;i++){

  arrNiveles[i]=niveles[i];
  
}


var pivoteEdicion=document.getElementById("ventanaEdicion");
   
if(pivoteEdicion){
  //Funcionalidad para la ventana de Edición
  console.log("Editando....");
  var nivel=document.getElementById("nivel");
  nivel.addEventListener("click",function(e){
    e.preventDefault();
    inicioEdicion()});
}
else{
  //Funcionalidad para la ventana de creación
  inicioCrecion();
}

function inicioCrecion(){
$.getJSON("/pruebaAJAXniveles", function (niveles) {
    for (var i = 0; i < niveles.length; i++) {
      var nombres = (niveles[i].nombre);
      var id = (niveles[i].id);
      var select = document.getElementById("nivel").innerHTML +=
        "<option value='"+ id +"'>" + nombres + "</option>";
    
    }
     
  });
}
  
  $('#nivel').on('change', async function () {
        console.log(this.value);
        var grados= await getGrados(this.value);
        console.log("ETIQUETA OBTENIDA")
       
        var claseNivel=this.className;

        ocultarNiveles(claseNivel);
        

        document.getElementById("grados").innerHTML ="";
        document.getElementById("grados").innerHTML +=
        "<option >Grado</option>";

        for (var i = 0; i < grados.length; i++) {
        document.getElementById("grados").innerHTML +=
          "<option value='" + (grados[i].id) + "'>" + (grados[i].nombre) + "</option>";
        }
       document.getElementById("grados").style.display = "block";
       
    });
  

      $('#grados').on('change', async function () {
          console.log(this.value);
          var materias = await getMaterias(this.value);
          console.log("MATERIAS OBTENIDOS")
          console.log(materias);
          console.log(materias[0].id);
          console.log(materias[0].nombre);

          var claseNivel=this.className;

          ocultarNiveles(claseNivel);
          document.getElementById("materias").innerHTML ="";
        document.getElementById("materias").innerHTML +=
        "<option >Materia</option>";
          for (var i = 0; i < materias.length; i++) {
          document.getElementById("materias").innerHTML +=
          "<option value='" + (materias[i].id) + "'>" + (materias[i].nombre) + "</option>";
          }
          var visible = document.getElementById("materias").style.display = "block";
        });

        
          $('#materias').on('change', async function () {
            console.log(this.value);
            var bloques = await getBloques(this.value);
            console.log("BLOQUES OBTENIDOS")
            console.log(bloques);
            console.log(bloques[0].id);
            console.log(bloques[0].nombre);

            var claseNivel=this.className;

            ocultarNiveles(claseNivel);

            document.getElementById("bloques").innerHTML =""
            document.getElementById("bloques").innerHTML +=
            "<option >Bloque</option>";
            for (var i = 0; i < bloques.length; i++) {
            document.getElementById("bloques").innerHTML +=
                "<option value='" + (bloques[i].id) + "'>" + (bloques[i].nombre) + "</option>";
            } 
            var visible = document.getElementById("bloques").style.display = "block";
          });

           $('#bloques').on('change', async function () {
              console.log(this.value);
              var secuencias = await getSecuencias(this.value);
              console.log("SECUENCIAS OBTENIDOS")
              console.log(secuencias);
              console.log(secuencias[0].id);
              console.log(secuencias[0].nombre);
              
              document.getElementById("secuencias").innerHTML =""
            document.getElementById("secuencias").innerHTML +=
            "<option>Secuencias</option>";
            var claseNivel=this.className;

            ocultarNiveles(claseNivel);

              for (var i = 0; i < secuencias.length; i++) {
                 document.getElementById("secuencias").innerHTML +=
                  "<option value='" + (secuencias[i].id) + "'>" + (secuencias[i].nombre) + "</option>";
              }
              var visible = document.getElementById("secuencias").style.display = "block";
            });


  async function getGrados(idNivel){

    var gradosDelNivel= await new Promise((resolve, reject) => {
        $.getJSON("/pruebaAJAXgrados/"+idNivel+"", function (grados) {
          
          resolve(grados)
        });
     });

    console.log("Resultado");
    return gradosDelNivel;
  }
   
  async function getMaterias(idGrado){

    var materiasDelGrado= await new Promise((resolve, reject) => {
      $.getJSON("/pruebaAJAXmaterias/"+idGrado+"", function (materias) {
          
          resolve(materias);
         });
     });

     return materiasDelGrado;
 }

 async function getBloques(idMateria){

      var bloquesPorMateria= await new Promise((resolve, reject) => {
        $.getJSON("/pruebaAJAXbloques/"+idMateria+"", function (bloques) {
            
            resolve(bloques);
          });
      });

      return bloquesPorMateria;
  }
    
  async function getSecuencias(idBloque){

    var secuenciasPorBloque= await new Promise((resolve, reject) => {
      $.getJSON("/pruebaAJAXsecuencias/"+idBloque+"", function (secuencias) {
          
          resolve(secuencias);
        });
    });

    return secuenciasPorBloque;
    }
    
    function ocultarNiveles(claseNivel){
      var valor=claseNivel.search("nivel-");
      console.log(valor);
      var claveNivel=claseNivel.substr(valor);
      var numeroNivel=Number.parseInt( claveNivel.slice(claveNivel.length-1,claseNivel.length));
      console.log(numeroNivel);
      /////////////
      var i=numeroNivel+1;
      if(numeroNivel!=4){
      for( i;i<arrNiveles.length;i++){
        var elemento=arrNiveles[i];
        elemento.style.display="none";
      }
    }
    
    }
   
    
    function inicioEdicion(){
      console.log(primercambio);
      if(primercambio){
        console.log("Ejecutandose")
          var nivel=document.getElementById("nivel");
        $.getJSON("/pruebaAJAXniveles", function (niveles) {
          nivel.innerHTML =""
          nivel.innerHTML+="<option>Nivel</option>";
          for (var i = 0; i < niveles.length; i++) {
            var nombres = (niveles[i].nombre);
            var id = (niveles[i].id);
            nivel.innerHTML +=
              "<option value='"+ id +"'>" + nombres + "</option>";
          
          }
          
        });
        primercambio=false;
        }
  }
  