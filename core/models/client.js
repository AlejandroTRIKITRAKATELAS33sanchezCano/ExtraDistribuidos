const main = require('../../index');
const cron = require('../cron');

class Client {
    /**
     * @param  {SocketIO.Socket} client
     */
    constructor(client) {
        this.socket = client;
        console.log('cliente conectado');
        this.client = this;

        client.on('disconnect', this.remove.bind(this));
    }

    sendServerData(data) {
        this.socket.emit('info', data);
    }

    getUserId() {
        // Lógica para obtener el ID del usuario (puedes ajustar esto según tus necesidades)
        return this.socket.id; // Ejemplo: usando el ID del socket como ID de usuario
    }

    
    remove() {
        const index = main.clients.findIndex(
            (val) => val.socket.id == this.socket.id
        );
        if (index != -1) main.clients.splice(index, 1);
        if (main.clients.length == 0) cron.destroyTask();
    }
}


module.exports = Client;