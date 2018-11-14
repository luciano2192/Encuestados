/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function() {
    var value = $('#pregunta').val();
    var respuestas = [];

    $('[name="option[]"]').each(function() {
      var respuesta = $(this).val();
      //Completar el agregado de una respuesta
      // pusheandola al arreglo de respuestas
      if ( respuesta ) {
        respuestas.push({'textoRespuesta': respuesta, 'cantidad': 0});
      };
    });
    this.modelo.agregarPregunta(value, respuestas);
  },

  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombrePregunta = $(this).attr('value');
      // console.log('nombrePregunta:',nombrePregunta);      
      var id = $(this).attr('id');      
      var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
      $('input[name=' + id + ']').prop('checked',false);
      // console.log('respuestaSeleccionada:',respuestaSeleccionada);      
      contexto.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
    });
  },
  
  quitarPregunta: function (id) {
    this.modelo.eliminarPregunta(id);
  },

  quitarTodo: function (preguntas) {
    this.modelo.eliminarTodo(preguntas);
  },

  editar: function (id, changeTitle, idPregunta, btAddPregunta) {
    this.modelo.editando(id, changeTitle, idPregunta, btAddPregunta);
  }
};
