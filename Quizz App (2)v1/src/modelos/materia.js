'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;




var modeloMateria = Schema ({
    nombre: {type: 'String'},
    color: {type: 'String' }
});



module.exports =
 mongoose.model('Materia',modeloMateria);