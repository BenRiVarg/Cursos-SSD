'use strict'
const Imagenes = require('../modelos/imagenes.js');
const Chunks = require('../modelos/chunks.js');
const { ObjectId } = require('mongodb');
//Función para revolver los elmentos de un array.
exports.shuffle= function(array) {
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

//----------------FUNCIONES PARA IMAGENES---------------//
//Función para buscar imagenes en base a su nombre original en el array de imagenes.
//Se aplica para la creación de examenes
exports.buscarImagen=function(imagenBuscada,arrayImagenes){
   
    var i;
    for( i in arrayImagenes){
        if(imagenBuscada==arrayImagenes[i].originalname){
            return arrayImagenes[i];
        }
      }
    
}

exports.eliminarImagen= async function(nombreImagen){
    var  imagen= await Imagenes.find({filename: nombreImagen}).exec();
   
    var imagenID=imagen[0]._id;
    
    if(!imagenID){
        console.log("Error no hay ID de Imagen definida");
    }
    else{
        //Borrado de los Chunks que pertenecen a una imagen
        Chunks.deleteMany({files_id: {$eq: ObjectId(imagenID)}}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log("Imagen Borrada con éxito");
            }
          });
    }
    
    //Borrado de la imagen
    await Imagenes.deleteOne({filename: nombreImagen});
    
    
}

