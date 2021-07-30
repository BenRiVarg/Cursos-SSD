'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;



var modeloUsuario = Schema ({

    
    updated: { type: Date, default: Date.now },
    
    rol: {type: 'String', enum:['alumno','docente','editor']},
    estatus: {type: 'Boolean', default: true},
    nombre: {type: 'String'},
    apPaterno: {type: 'String'},
    apMaterno: {type: 'String'},
    correoElectronico:{type: 'String'},
    telefono: {type: 'String'},
   // timestamps: true
    
});



module.exports =
 mongoose.model('Usuario',modeloUsuario);
