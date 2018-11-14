/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  }),
  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  }),
  this.modelo.totalPreguntasEliminadas.suscribir(function () {
    contexto.reconstruirLista();
  }),
  this.modelo.preguntasEditadas.suscribir(function () {
    contexto.reconstruirLista();
  })
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $('<li/>', {
      'class' : 'list-group-item',
      id : pregunta.id,
      'texto' : pregunta.textoPregunta
    });
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociación de eventos
    e.botonAgregarPregunta.click(function() {
      contexto.controlador.agregarPregunta();
      contexto.limpiarFormulario();
    });
    // Completar la asociación de de eventos a los
    // botones editarPregunta, borrarPregunta y borrarTodo
    $('#borrarPregunta').click(function () {
      let id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.quitarPregunta(id);
    });

    $('#borrarTodo').click(function () {
      let preguntas = contexto.modelo.preguntas;
      contexto.controlador.quitarTodo(preguntas);
    });

    $('#editarPregunta').click(function () {
      let id = parseInt($('.list-group-item.active').attr('id'));      
      let changeTitle = $('#to-do');
      let idPregunta = $('#pregunta');      
      let btAddPregunta = $('#agregarPregunta');
      contexto.controlador.editar(id, changeTitle, idPregunta, btAddPregunta);
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
