const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    /** define el constructor */
    constructor() {
        this.hoy = new Date().getDate();
        this.ticketsPend = [];
        this.last4 = [];

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.ticketsPend = data.tickets;
            this.last4 = data.lastFour;
        } else {
            this.resetTicket();
        }
    }

    /** Siguiente (crear nuevo) Ticket */
    nextTicket() {
        this.ultimo = this.ultimo + 1;
        let ticket = new Ticket(this.ultimo, null);
        this.ticketsPend.push(ticket);

        this.saveFile();
        return `Ticket: ${this.ultimo}`;
    }

    /** último ticket generado */
    lastTicket() {
        return `Ticket: ${this.ultimo}`;
    }

    /** últimos 4 */
    last4Tickets() {
        return this.last4;
    }

    /** asigmar ticket */
    attendTicket(escritorio) {
        if (this.ticketsPend.length === 0)
            return { ok: false, msg: 'Ya no hay tickets pendientes para asignación' };

        // obtiene el primer ticket pendiente de asignación
        let numTicket = this.ticketsPend[0].numero;
        // borra el primer elemento de la lista
        this.ticketsPend.shift();
        // nueva instancia de ticket a atender
        let attendTicket = new Ticket(numTicket, escritorio);
        console.log(attendTicket);
        // pone el ticket al inicio en la lista de los últimos 4 atendidos
        this.last4.unshift(attendTicket);
        console.log(this.last4);
        /** valida para eliminar el quinto elemento
         * no permite que supere 4 elementos de la lista
         */
        if (this.last4.length > 4)
            this.last4.splice(-1, 1);

        /** guarda el archivo */
        this.saveFile();
        return attendTicket;
    }

    /** Reinicia datos cada día */
    resetTicket() {
        this.ultimo = 0;
        this.ticketsPend = [];
        this.last4 = [];
        this.saveFile();
    }

    /** Grabar archivo */
    saveFile() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.ticketsPend,
            lastFour: this.last4
        };
        let jsonDataString = JSON.stringify(jsonData);

        /** Guarda en el archivo */
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = { TicketControl };