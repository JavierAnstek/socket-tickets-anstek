const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
let ticketCtrl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('nextTicket', (data, callback) => {
        let nextT = ticketCtrl.nextTicket();
        callback(nextT);

        // client.broadcast.emit('enviarMensaje', data);
    });

    // emite info de ultimo ticket
    client.emit('lastTiket', {
        actual: ticketCtrl.lastTicket(),
        last4: ticketCtrl.last4Tickets()
    });

    // asigna y atiende ticket
    client.on('attendTicket', (data, callback) => {
        if (!data.escritorio)
            return callback({ err: true, msg: 'en necesario indicar puesto de atención' })

        let attendTicket = ticketCtrl.attendTicket(data.escritorio);
        callback(attendTicket);

        /** Emite el cambio a la pantalla publica */
        client.broadcast.emit('lastTiket', { last4: ticketCtrl.last4Tickets() });
    });
});