/** comando para establecer la comunicación */
var socket = io();

// obtiene los parametros por URL
var searchParams = new URLSearchParams(window.location.search);
// valida si existe el parametro que buscamos
if (!searchParams.has('escritorio')) {
    window.location = '/';
    throw new Error('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio');
$('h1').text('ESCRITORIO: ' + escritorio);

socket.on('connect', function() {
    console.log('Cliente conectado al server socket');
});

socket.on('disconnect', function() {
    console.log('Cliente desconectado del server socket');
});

/** usa jquery para la solicitd */
$('button').on('click', function() {
    socket.emit('attendTicket', { escritorio: escritorio }, function(ticket) {
        if (ticket.ok === false)
            $('small').text(ticket.msg);
        else
            $('small').text('Ticket: ' + ticket.numero);
    });
});