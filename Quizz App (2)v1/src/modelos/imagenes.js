'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;




var modeloImagen = Schema ({
    filename: {type:String}
});



module.exports =
 mongoose.model('uploads.files',modeloImagen);