/** comando para establecer la comunicación */
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('connect', function() {
    console.log('Cliente conectado al server socket');
});

socket.on('disconnect', function() {
    console.log('Cliente desconectado del server socket');
});

socket.on('lastTiket', function(res) {
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(res.last4);
});

function actualizaHTML(lastFour) {
    for (var i = 0; i < lastFour.length; i++) {
        lblTickets[i].text('Ticket ' + lastFour[i].numero);
        lblEscritorios[i].text('Escritorio ' + lastFour[i].escritorio);
    }
}