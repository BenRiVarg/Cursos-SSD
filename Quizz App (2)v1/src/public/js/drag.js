function comprobarDrag(event) {
  var arr = [];
  var countOfItems = 0;

  $("#drag1, #drag2, #drag3, #drag4").draggable({
    revert: "invalid",
    cursor: "move",
  });

  $("#cuadro1, #cuadro2, #cuadro3, #cuadro4").droppable({
    greedy: true,
    drop: function (event, ui) {
      var div = event.target.id;
      var element = ui.draggable.attr("id");
      arr.push({
        key: div,
        val: element,
      });
      $("#" + element).addClass("someclass");
      //if div with class name 'someclass' is greater than the required no of div
      if ($("div.someclass").length > countOfItems) {
        
        document.getElementById("tituloR").innerHTML = "Respuestas:";
        /*  var count = false; */
        $.each(arr, function (i, obj) {
          if (obj.val == "drag1" && obj.key == "cuadro1") {
            document.getElementById("demo").innerHTML = "¡Correcto!";
          } else if (obj.val == "drag2" && obj.key == "cuadro2") {
            document.getElementById("demo2").innerHTML = "¡Correcto!";
          } else if (obj.val == "drag3" && obj.key == "cuadro3") {
            document.getElementById("demo3").innerHTML = "¡Correcto!";
          } else if (obj.val == "drag4" && obj.key == "cuadro4") {
            document.getElementById("demo4").innerHTML = "¡Correcto!";
          } else {
            if (obj.val == "drag1" && obj.key != "cuadro1") {
              document.getElementById("demo").innerHTML = "¡Incorrecto!";
            } else if (obj.val == "drag2" && obj.key != "cuadro2") {
              document.getElementById("demo2").innerHTML = "¡Incorrecto!";
            } else if (obj.val == "drag3" && obj.key != "cuadro3") {
              document.getElementById("demo3").innerHTML = "¡Incorrecto!";
            } else if (obj.val == "drag4" && obj.key != "cuadro4") {
              document.getElementById("demo4").innerHTML = "¡Incorrecto!";
            }
          }

          var demo = document.getElementById("demo").innerHTML;
          var demo2 = document.getElementById("demo2").innerHTML;
          var demo3 = document.getElementById("demo3").innerHTML;
          var demo4 = document.getElementById("demo4").innerHTML;

          if (demo == "¡Correcto!" && demo2 == "¡Correcto!" && demo3 == "¡Correcto!" && demo4 == "¡Correcto!") {
            document.getElementById("demo5").innerHTML = "¡Todas las respuestas son correctas!";
          } else if ((demo == "¡Incorrecto!" && demo2 == "¡Incorrecto!" && demo3 == "¡Incorrecto!" && demo4 == "¡Incorrecto!")) {
            document.getElementById("demo5").innerHTML = "¡Todas las respuestas son incorrectas!";
          } else {
            document.getElementById("demo5").innerHTML = " ";
          }
        });

        /*  if (count) {
          document.getElementById("demo").innerHTML = "¡Correcto!";
        } else {
          document.getElementById("demo").innerHTML = "¡Incorrecto!";
        } */
      }
    },
  });
}
comprobarDrag();

$(".widget").draggable({
  scroll: false,
  containment: "#bg-container",

 /*  start: function (event, ui) {
    console.log("start top is :" + ui.position.top);
    console.log("start left is :" + ui.position.left);
  },
  drag: function (event, ui) {
    console.log("draging.....");
  },
  stop: function (event, ui) {
    console.log("stop top is :" + ui.position.top);
    console.log("stop left is :" + ui.position.left);

    alert("left:" + ui.position.left + " top:" + ui.position.top);
  }, */
});


/*
    document.getElementById("file").onchange = function (e) {
      // Creamos el objeto de la clase FileReader
      let reader = new FileReader();

      // Leemos el archivo subido y se lo pasamos a nuestro fileReader
      reader.readAsDataURL(e.target.files[0]);

      // Le decimos que cuando este listo ejecute el código interno
      reader.onload = function () {
        var titulo = (document.getElementById("titulop").innerHTML =
          "Previsualización de la imagen");
        let preview = document.getElementById("preview"),
          image = document.createElement("img");
        image.src = reader.result;

        preview.innerHTML = "";
        preview.append(image);
      };
    };

    */