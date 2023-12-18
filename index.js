const config = require('./config/config');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cron = require('./core/cron');

const Client = require('./core/models/client');
const indexRoute = require('./core/routes/index');

const PORT = config.server.port || 3030;
const serverUrl = process.env.SERVER_URL || 'http://localhost:3030';

const clients = [];
app.use(express.json());
app.use(express.static("src"));
app.use('/', indexRoute);

io.on('connection', (socket) => {
    const client = new Client(socket);
    clients.push(client);

    // Obtén una ruta dinámica basada en algún criterio (puedes ajustar esto según tus necesidades)
    const dynamicPath = `${serverUrl}/user/${client.getUserId()}`; // Ejemplo: '/user/123'

    console.log("El ID Del Cliente es: " + client.getUserId())
    console.log("Ruta que me debe de redirijir: " + dynamicPath)
    // Envia un mensaje de redirección al cliente
    socket.emit('redirect', dynamicPath);

    // Emitir la lista de clientes y sus IDs a la página clientList.html
    io.emit('clientList', clients.map(c => ({ id: c.getUserId() })));

    if (!cron.getTask()) cron.startTask();
});

http.listen(PORT, () => {
    console.log('System Monitor desde ' + PORT);
});


module.exports.clients = clients;
