'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const respuestas=Schema({
    cuestionarioID:{type: 'String'},
    respuestaA: Array,
    revision: Array
});


var modeloRegistro = Schema ({
    alumno:{type:String},
    revisado:{type: Boolean, default: false },
    quizz: {type:String},
    calificacion: {type: Number},
    tiempo:{type:String},
    respuestas:[respuestas]
});



module.exports =
 mongoose.model('Registros',modeloRegistro);
