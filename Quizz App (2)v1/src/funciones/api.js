'use strict'
const https = require('https');
const { resolve } = require('path');
const { stringify } = require('querystring');

var options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'EBE v75zcs3rOEGE0bbJWv54qw!kKafTPFyzUizquudsvIWHA¡SUcVfO-IfUaXXNeVpmv9ug!2pOGsJwu_U65pfUiYQVFMw¡WvEiGh-eyEaO725Xpt_-XwNeVpmv9ug!2pOG'
  }

}

var URLbase = "https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox";


exports.Find = async function (recurso) {
  
  var urlRecurso;
  switch (recurso) {
    case "grados":
      urlRecurso = URLbase + "/grades";
      break;
    case "materias":
      urlRecurso = URLbase + "/subjects";
      break;
    case "niveles":
      urlRecurso = URLbase + "/levels";
      break;
    case "bloques":
      urlRecurso = URLbase + "/blocks";
      break;
    case "secuencias":
      urlRecurso = URLbase + "/sequences";
      break;
  }
 
  var resultado = await new Promise((resolve, reject) => {
    https
      .get(urlRecurso, options, (res) => {
        let data = "";

        // Un fragmento de datos ha sido recibido.
        res.on("data", (chunk) => {
          data += chunk;
        });

        // Toda la respuesta ha sido recibida. Imprimir el resultado.
        res.on("end", () => {
          // console.log(data);
          var registros = JSON.parse(data);
          //  console.log(secuenciasAPI[0]);
          resolve(registros);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });
  return resultado;
};

exports.findByID = async function (recurso, recursoID) {

  var urlRecurso
  var modificador;
  var resultado;
  switch (recurso) {
    case "grados":
      modificador = "grades";
      urlRecurso = URLbase + "/grades";
      break;
    case "materias":
      modificador = "subjects";
      urlRecurso = URLbase + "/subjects";
      break;
    case "niveles":
      modificador = "levels"
      urlRecurso = URLbase + "/levels";
      break;
    case "bloques":
      modificador = "blocks";
      urlRecurso = URLbase + "/blocks";
      break;
    case "secuencias":
      modificador = "sequences";
      urlRecurso = URLbase + "/sequences";
      break;
  }

  resultado = await new Promise((resolve, reject) => {
    https.get(urlRecurso, options, (res) => {

      let data = '';

      // Un fragmento de datos ha sido recibido.
      res.on('data', (chunk) => {

        data += chunk;
      });

      // Toda la respuesta ha sido recibida. Imprimir el resultado.
      res.on('end', () => {
          var registro;
       var registros=JSON.parse(data);
       
      for(var i=0; i<registros[modificador].length;i++){
        
          if(registros[modificador][i].id===recursoID){
              registro=registros[modificador][i];
            break;
          }

        }
        resolve(registro);

      });



    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

  });

  return resultado;
}

/*--Método para encontrar todos los registros en base a un ID
      pide todos los datos (recursoBúsqueda)
      de un recurso(idpeticion,recursoConocido)
--**/
exports.busqueda=async function(idpeticion,recursoConocido,recursoBusqueda){
 
  var registros=await this.Find(recursoBusqueda);
  var modificador;
  var datosBusqueda;
  switch (recursoBusqueda) {
    case "grados":
      modificador = "grades";
      datosBusqueda=registros[modificador];
      break;
    case "materias":
      modificador = "subjects";
      datosBusqueda=registros[modificador];
      break;
    case "niveles":
      modificador = "levels"
      datosBusqueda=registros[modificador];
      break;
    case "bloques":
      modificador = "blocks";
      datosBusqueda=registros[modificador];
      break;
    case "secuencias":
      modificador = "sequences";
      datosBusqueda=registros[modificador];
      break;
  }
  var datosfiltrados=[];
  for(var i=0;i<datosBusqueda.length;i++){
    if(idpeticion==datosBusqueda[i][recursoConocido])
    datosfiltrados.push(datosBusqueda[i])
  }
 

  
  return datosfiltrados;
  
 
  
}


exports.alumnos = async function (IDgrupo) {

  const postData = JSON.stringify(
    { "group_id": IDgrupo }
  );

  const optionsPOST = {
    method: 'POST',
    // agent: false,  // Create a new agent just for this one request
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'EBE v75zcs3rOEGE0bbJWv54qw!kKafTPFyzUizquudsvIWHA¡SUcVfO-IfUaXXNeVpmv9ug!2pOGsJwu_U65pfUiYQVFMw¡WvEiGh-eyEaO725Xpt_-XwNeVpmv9ug!2pOG'

    }
  };

  var resultado;

  resultado = await new Promise((resolve, reject) => {

    const req = https.request("https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox/students", optionsPOST, (res) => {

      let data = "";
      //console.log(`STATUS: ${res.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
        //console.log(`BODY: ${chunk}`);
        //console.log(JSON.parse(chunk));
      });
      res.on('end', () => {
        var respuestaURL = JSON.parse(data);
        var alumnos = respuestaURL.students;
        console.log(alumnos);
        resolve(alumnos)
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });




    req.write(postData);

    req.end();




  });

  return resultado;
}

exports.autenticacion = async function (JWTtoken) {

  const postData = JSON.stringify(
    { "token": JWTtoken }
  );


  console.log(postData);
  const optionsPOST = {
    method: 'POST',
    // agent: false,  // Create a new agent just for this one request
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'EBE v75zcs3rOEGE0bbJWv54qw!kKafTPFyzUizquudsvIWHA¡SUcVfO-IfUaXXNeVpmv9ug!2pOGsJwu_U65pfUiYQVFMw¡WvEiGh-eyEaO725Xpt_-XwNeVpmv9ug!2pOG'

    }
  };

  var resultado;

  resultado = await new Promise((resolve, reject) => {

    const req = https.request("https://gateway.ebe.jenios.mx/v1.0.0/devs/quizzes/sandbox/verify/token", optionsPOST, (res) => {

      let data = "";
      var estatus = res.statusCode;
      /*
      if (estatus == 200) {
        //autenticacion aprobada
        resolve(true);
      }
      else {
        //Autenticación Fallida
        resolve(false);
      }
      */
      // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
        console.log(`BODY: ${chunk}`);
        console.log(JSON.parse(chunk));
      });
      res.on('end', () => {
        var respuestaURL=JSON.parse(data); //Capturar los datos recibidos como respuesta de la URL
        resolve(respuestaURL);
      });
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });




    req.write(postData);

    req.end();




  });

  return resultado;
}