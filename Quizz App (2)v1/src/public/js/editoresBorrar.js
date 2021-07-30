
function borrar(obj){

    //Espacio en donde se inyectará el nombre del Quizz que se va a eliminar
    var espacioQuizz=document.getElementById("quizzStc");
    //Boton que va a borrar (es un link)
    var btnBorrar=document.getElementById("ejecutor");

    var linkEdicion=obj.previousElementSibling.href;
    linkEdicion=linkEdicion.split("/editar/");
    var idQuizz=linkEdicion[1];

    var nombreQuizz=obj.parentElement.previousElementSibling.textContent;
    espacioQuizz.textContent=nombreQuizz;

    var linkBorrar="/editores/borrar/"+idQuizz;
    btnBorrar.href=linkBorrar;
    document.getElementById("malla").style.display="block";
    document.getElementById("msgB").style.display="block";

}

function cancelar(){
    document.getElementById("malla").style.display="none";
    document.getElementById("msgB").style.display="none";
}