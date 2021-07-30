'use strict'
const Quizz = require('../modelos/quizz.js');


exports.revisar = async function (alumno, req) {


	var examencalificado = {
		alumno: "",
		revisado: true,
		quizz: "",
		respuestas: Array,
		calificacion: 0,
	};
	
	var calificacionGlobal=0;
	var calificacionPorCuestionario=[];

	var cuestionariosCalificados = [];
	//Conseguimos el examen que vamos a calificar
	var quizz = await Quizz.findById(req.body.quizz);


	//Extracción de los cuestionarios de ese quizz
	var cuestionariosBD = quizz.cuestionario;
	var cuestionario;
	var cuestionarioI;


	//Variable para mover los punteros en la request
	var iteracionCalificacion = 0;





	for (cuestionario in cuestionariosBD) {

		//Seleccion de los elementos en la iteración correspondiente
		var cuestionario = "cuestionario" + (iteracionCalificacion);
		var respuesta = "respuesta" + (iteracionCalificacion);

		//Busqueda en la request
		var cuestionarioRequest = req.body[cuestionario];
		var respuestaAlumno = req.body[respuesta];

		for (cuestionarioI in cuestionariosBD) {
			//Busqueda del cuestionario a calificar
			if (cuestionariosBD[cuestionarioI]._id == cuestionarioRequest) {
				var cuestionarioAcalificar = cuestionariosBD[cuestionarioI];
				break;
			}
		}

		var tipoCuestionario = cuestionarioAcalificar.tipo;
		//Limpiamos y declaramos la variable para las respuestas


		switch (tipoCuestionario) {
			case "tipoT":
				//console.log(cuestionarioAcalificar.respuesta[0]);
				var resultado = calificarRA(respuestaAlumno, cuestionarioAcalificar.respuesta[0]);
				console.log("RPA: " + resultado);
				calificacionPorCuestionario.push(resultado);
				break;
			case "tipoIT":
				var resultado = calificarRA(respuestaAlumno, cuestionarioAcalificar.respuesta[0]);
				console.log("RPAIT: " + resultado);
				calificacionPorCuestionario.push(resultado);
				break;

			case "tipoOM":

				if (respuestaAlumno == "multiple") {
					//"Hay más de una respuesta"
					var respuestaAlumnoProcesada = [];
					//Identificamos cuantos reactivos tiene el Quizz en el HTML DOM
					var reactivosCuestionario = req.body[("contadorItems" + iteracionCalificacion)];

					//Creamos un array con las respuestas del alumno
					for (var i = 1; i <= reactivosCuestionario; i++) {
						var respuestaAlumnoI = req.body[("respuesta" + iteracionCalificacion + "," + i)];
						if (respuestaAlumnoI && respuestaAlumnoI != "") {
							respuestaAlumnoProcesada.push(respuestaAlumnoI);
						}
					}
					respuestaAlumno = respuestaAlumnoProcesada;

					console.log("Respuesta Alumno: " + respuestaAlumnoProcesada.length);
					//Y las calificamos
					var resultado = calificarOM(respuestaAlumno, cuestionarioAcalificar.pregunta, cuestionarioAcalificar.respuesta, 1);
					console.log("OMM: " + resultado.revision);
					
					//Ajuste de calificiación para preguntas OMM
			
					if((resultado.revision.length)<(cuestionarioAcalificar.respuesta.length)){
						var revisionAjustada=resultado.revision;
						//Ajustamos el contador al tamaño de la respuesta que sí puso
						var inicio=revisionAjustada.length;
						 for(inicio;inicio<cuestionarioAcalificar.respuesta.length;inicio++){
							 revisionAjustada.push(false);
						 }
						 console.log("Debugg")
						 console.log(revisionAjustada);
						 calificacionPorCuestionario.push(revisionAjustada);
					}
					else{
						calificacionPorCuestionario.push(resultado.revision);
					}
					//Asignación de valores para el registro de BD
					respuestaAlumno = resultado.respuestasAlumno;
					resultado = resultado.revision;
				}
				else {
					//"Sólo hay una respuesta"
					var resultado = calificarOM(respuestaAlumno, cuestionarioAcalificar.pregunta, cuestionarioAcalificar.respuesta, 0);
					console.log("OMS: " + resultado.revision);

					//Empujamos para la calificación la respuesta
					calificacionPorCuestionario.push(resultado.revision);

					respuestaAlumno = resultado.respuestasAlumno;
					resultado = resultado.revision;
					
				}


				break;

			case "tipoR":
				var reactivosCuestionario = req.body[("contadorItems" + iteracionCalificacion)];
				var respuestaAlumnoProcesada = [];

				//Creamos un array con las respuestas del alumno
				for (var i = 0; i < reactivosCuestionario; i++) {
					var respuestaAlumnoI = req.body[("r" + iteracionCalificacion + "," + i)];
					if (respuestaAlumnoI.length == 0) {

						respuestaAlumnoProcesada.push("");
					}
					else {

						respuestaAlumnoProcesada.push(respuestaAlumnoI);
					}
				}

				respuestaAlumno = respuestaAlumnoProcesada;
				var resultado = calificarR(respuestaAlumno, cuestionarioAcalificar.respuesta, cuestionarioAcalificar.pregunta);
				
				//Ajuste de calificiación para preguntas Relacionales
			
				if((resultado.revision.length)<(cuestionarioAcalificar.respuesta.length)){
					var revisionAjustada=resultado.revision;
					//Ajustamos el contador al tamaño de la respuesta que sí puso
					var inicio=revisionAjustada.length;
					 for(inicio;inicio<cuestionarioAcalificar.respuesta.length;inicio++){
						 revisionAjustada.push(false);
					 }
					 console.log("Debugg")
					 console.log(revisionAjustada);
					 calificacionPorCuestionario.push(revisionAjustada);
				}
				else{
					calificacionPorCuestionario.push(resultado.revision);
				}

				respuestaAlumno = resultado.respuestasAlumno;

				resultado = resultado.revision;
				console.log("Calificacion R: " + resultado)
				console.log(respuestaAlumno);

				break;
			case "tipoM":
				var resultado = calificarM(respuestaAlumno, cuestionarioAcalificar.respuesta[0]);
				console.log("Calificacion M: " + resultado)

				calificacionPorCuestionario.push(resultado,cuestionarioAcalificar.respuesta);
				break;
			case "tipoAr":
				var resultado=calificarPD(respuestaAlumno,cuestionarioAcalificar.respuesta)
				console.log("CalificarPDrag");
				console.log(resultado.revision)
				calificacionPorCuestionario.push(resultado.revision);
				respuestaAlumno=resultado.respuestaAP;
				resultado=resultado.revision;
				break;

		}
		var respuestas = {
			cuestionarioID: cuestionarioAcalificar._id,
			respuestaA: respuestaAlumno,
			revision: resultado
		};

		cuestionariosCalificados.push(respuestas)
		//Incremento de la variable para la siguiente iteración
		iteracionCalificacion = iteracionCalificacion + 1;
	}

	//Comienza el sistema de calificaciones
	for (var i = 0; i < calificacionPorCuestionario.length; i++) { // ciclo que recorre la cantidad de cuestionarios por examen
		var aciertos = 0;// variable de numeros de aciertos por cuestionario
		var calificacionCuestionario = 0; // aqui se guardara la calificacion del cuestionario
		for (let j = 0; j < calificacionPorCuestionario[i].length; j++) {// cliclo para recorrer las respuestas del examen
			console.log(calificacionPorCuestionario[i][j]);
			if (calificacionPorCuestionario[i][j]) {// si es una respuesta correcta se aumenta el contador de aciertos
				aciertos++;// aumento del contador
			}
		}// fin de ciclo for para preguntas
		
		calificacionCuestionario = (aciertos / calificacionPorCuestionario[i].length) * 100;	// Se obtiene la calificacion promedio del cuestionario 
		// Se dividen los aciertos entre el total de preguntas y se multiplica por 1		
		calificacionGlobal = calificacionGlobal + calificacionCuestionario;// Sumatoria de calificaciones por cuestionario para calculo global de calificacion
		
	}
	calificacionGlobal = calificacionGlobal / calificacionPorCuestionario.length; // calculo de calificacion global diviendo la sumatoria entre la cantidad de cuestionarios
	//console.log(cuestionariosCalificados);

	calificacionGlobal=redondearLejosDeCero(calificacionGlobal);
	console.log("Resultado");
	console.log(calificacionGlobal);
	//----------TODO CORRECTO---------------
	//asignamos un alumno para el registro
	examencalificado.calificacion = calificacionGlobal; // se agrega la calificacion al objeto que se almacenara en la base de datos
	examencalificado.alumno = req.body.alumno;
	examencalificado.quizz = quizz._id;
	examencalificado.tiempo=req.body.tiempo;
	examencalificado.respuestas = cuestionariosCalificados;


	//Actualizamos los datos del quizz que se contestó para que se sepa que ya fue contestado
	console.log("--------------");
	var quizz_Contestado = quizz.contestado;
	console.log(quizz_Contestado);

	if(!quizz_Contestado){
		console.log(quizz._id);
		Quizz.findByIdAndUpdate(quizz._id, {
			contestado: true
		},(error, user) => {
			console.log("Error")
			console.log(error,quizz._id);
		  }
		);
		//console.log("Actualizar contestar");
	}
	return examencalificado;
}


//////////////FUNCIONES DE APOLLO/////////


//Calificacion de RespuestasDrag
function calificarPD(respuestaAlumno,respuestasBD){
var resultado={
	revision: [],
	//Variable para enviar una respuesta de Alumno ajustada
	respuestaAP:[]
}

respuestaAlumno=JSON.parse(respuestaAlumno);
//console.log(respuestaAlumno);
var x;
//Objeto para hacer más sencillo la revisión de la pregunta
var objetoRespuestas={};
//Construcción del objeto
for(x in respuestaAlumno){
	var clave=igualacion(respuestaAlumno[x].id_pregunta);
	var respuestaI=igualacion(respuestaAlumno[x].id_respuesta);
	var obj={contenido:respuestaAlumno[x].contenido
		,respuesta:respuestaI};
	objetoRespuestas[clave]=obj;
}
//console.log(objetoRespuestas)

var y
for (y in respuestasBD){
	//obtenemos la clave de la pregunta de la respuesta correcta
	var claveReactivo=igualacion(respuestasBD[y].id_pregunta);
	//después la respuesta del Alumno
	var resAlumno=objetoRespuestas[claveReactivo];

	//Si no contestó
	if(!resAlumno){
		//console.log("vacía");
		var respuestaVacia={contenido:"",id_pregunta:claveReactivo};
		resultado.respuestaAP.push(respuestaVacia);
		resultado.revision.push(false)
	}
	else{
	
	//console.log("--Evaluacion--");
	var resAP={contenido:resAlumno.contenido,
				id_pregunta:claveReactivo,
				id_respuesta:resAlumno.respuesta};

	var evaluacion=resAlumno.respuesta==respuestasBD[y].id_respuesta;
	resultado.respuestaAP.push(resAP);
	resultado.revision.push(evaluacion);
	}
	
}
	
//console.log("_______________________");
//console.log(resultado.revision);
//console.log("respuestaAlumno");
//console.log(resultado.respuestaAP);


return resultado;


}


//Calificacion de Respuestas de Mate
function calificarM(respuestaAlumno, respuestaBD) {
	var revision = [];

	if (!(typeof (respuestaAlumno) == "string")) {
		console.log("Proceso con Fracciones");
		if (respuestaAlumno[0] == NaN) {
			revision.push(false);
		}
		else {
			console.log(respuestaAlumno);
			console.log(respuestaBD);
			console.log(respuestaAlumno[0] == respuestaBD);

			if (respuestaAlumno[0] == respuestaBD) {
				revision.push(true)
			}
			else {
				revision.push(false)
			}

		}
	}
	else {
		//Proceso con Enteros
		if (respuestaAlumno == NaN) {
			revision.push(false);
		}
		else {
			console.log(respuestaAlumno);
			console.log(respuestaBD);
			console.log(respuestaAlumno == respuestaBD);

			if (respuestaAlumno == respuestaBD) {
				revision.push(true)
			}
			else {
				revision.push(false)
			}

		}

	}




	return revision;
}


//Calificación de Respuestas Relacionales (tambien devuelve lo que el alumno realmente contestó)
function calificarR(respuestaAlumno, respuestaBD, preguntaBD) {

	var resultado = {
		revision: [],
		respuestasAlumno: []
	}

	//Creamos un array para llenarlo de las respuestas que realmente contestó el alumno en cada ocación
	var contestacionAlumnoReal = [];

	for (var i = 0; i < preguntaBD.length; i++) {

		console.log(respuestaAlumno);
		if (respuestaAlumno[i].length == 0) { //Respuesta vacía
			resultado.revision.push(false);
		}
		else {
			var x;
			//El criterio de respuesta correcta, es que las respuestas del alumno (tienene la pregunta)  esten ligadas a la pregunta en la BD correcta
			var matchCorrecto = igualacion(preguntaBD[i]);
			var contestacionAlumno = igualacion(respuestaAlumno[i]);
			//			console.log("Respuesta Alumno: "+contestacionAlumno);

			for (x in preguntaBD) {
				if (contestacionAlumno == igualacion(preguntaBD[x])) {
					var respuestaAlumnoreal = respuestaBD[x];
				}
			}

			//Guardamos lo que Realmente contestó el alumno
			resultado.respuestasAlumno.push(respuestaAlumnoreal);

			if (matchCorrecto == contestacionAlumno) {
				resultado.revision.push(true);
			}
			else {
				resultado.revision.push(false);
			}

		}

	}

	return resultado;

}

//Calificacion de Respuestas de Opción Multiple
function calificarOM(respuestaAlumno,preguntaBD,respuestaBD,opcion){
	var resultado={
		respuestasAlumno:[],
		revision: [],

	}
	//Una sola Respuesta
	if(opcion==0){
		
		
		//El alumno no contestó nada
		if(!respuestaAlumno){
			resultado.revision.push(false);
			resultado.respuestasAlumno.push(0);
		}
		


		else{
			respuestaAlumno=igualacion(respuestaAlumno);
			respuestaBD=igualacion(respuestaBD[0]);

			
			if(respuestaAlumno==respuestaBD){
				resultado.revision.push(true);
				//Guardamos la iteración de la respuesta  para poder dar retroalimentación
				var iteracionRespuesta=preguntaBD.indexOf(respuestaAlumno);

				//Guardamos la clave del array de respuestasBD que el alumno respondió
				resultado.respuestasAlumno.push(iteracionRespuesta);

			}
			else{
				var iteracionRespuesta=preguntaBD.indexOf(respuestaAlumno);
				resultado.respuestasAlumno.push(iteracionRespuesta);
				resultado.revision.push(false);
			}
		}
		
		console.log(resultado.respuestasAlumno);
		console.log(resultado.revision);
	}

	else{ //Multples respuestas
		
		//El alumno no contestó nada
		if(respuestaAlumno.length==0){
			resultado.revision.push(false);
			resultado.respuestasAlumno.push(0);
		}
		
		else{

			console.log(respuestaAlumno);
					//Revisamos cada una de las respuestas del alumno
			for(var i=0;i<respuestaAlumno.length;i++){
				var respuestaIteracion=respuestaAlumno[i];
				respuestaIteracion=igualacion(respuestaIteracion);

				//Y las comparamos contra TODAS las respuestas correctas definidas en la BD
				for(var j=0;j<respuestaBD.length;j++){
					var respuestaBDI=respuestaBD[j];
					
					respuestaBDI=igualacion(respuestaBDI);
					if(respuestaIteracion==respuestaBDI){
						resultado.revision.push(true);

						console.log("respuestaBD[j]");
						console.log(respuestaBD[j]);
						var iteracionRespuesta=preguntaBD.indexOf(respuestaAlumno[i]);
						resultado.respuestasAlumno.push(iteracionRespuesta);
						break;
					}
					else{
						//Si ya no hay más respuestas correctas posibles
						if(j==(respuestaBD.length-1)){
							
							var iteracionRespuesta=preguntaBD.indexOf(respuestaAlumno[i]);
							resultado.respuestasAlumno.push(iteracionRespuesta);
							resultado.revision.push(false);
						}
					
					}
				}
				
			}
		
		}
		console.log(resultado.respuestasAlumno);
		console.log(resultado.revision);
		
	}
	return resultado;
}



//Calificación de Respuestas Abiertas
function calificarRA(respuestaAlumno, respuestaBD) {

	var revision = [];
	if (igualacion(respuestaAlumno) == igualacion(respuestaBD)) {
		revision.push(true)
	}
	else {
		revision.push(false)
	}

	return revision;
}


//Funci+on para redondear las cifras
function redondearLejosDeCero(numero){
    return Math.sign(numero) * Math.floor(Math.abs(numero) + 0.5);
}

function igualacion(cadena) {

	//Eliminación de todos los espacios en blanco
	cadena = cadena.replace(/\s+/g, '');

	cadena = cadena.toLowerCase();
	return cadena
}