/** comando para establecer la comunicación */
var socket = io();

socket.on('connect', function() {
    console.log('Cliente conectado al server socket');
});

socket.on('disconnect', function() {
    console.log('Cliente desconectado del server socket');
});

/** Obtiene último ticket cuando reinicia la página */
socket.on('lastTiket', function(data) {
    $('#lblNuevoTicket').text(data.actual);
});

/** usa jquery para la solicitd */
$('button').on('click', function() {
    socket.emit('nextTicket', null, function(ticket) {
        $('#lblNuevoTicket').text(ticket);
        console.log(ticket);
    });
});