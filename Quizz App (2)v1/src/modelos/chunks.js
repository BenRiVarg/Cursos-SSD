'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;




var modeloChunk = Schema ({
    files_id: mongoose.ObjectId
});



module.exports =
 mongoose.model('uploads.chunks',modeloChunk);