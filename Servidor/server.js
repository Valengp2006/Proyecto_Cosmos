const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const osc = require('osc');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Le decimos al servidor que la página web estará en la carpeta 'public'
app.use(express.static('public'));

// Configurar el envío OSC hacia TouchDesigner (Puerto 7000)
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 7001,
    remoteAddress: "127.0.0.1",
    remotePort: 7000 // Este es el puerto que leerá TouchDesigner
});
udpPort.open();

// Cuando un celular se conecta...
io.on('connection', (socket) => {
    console.log('Un espectador se ha conectado al sistema');

    // Cuando el celular envía un cambio de color...
    socket.on('color_change', (data) => {
        // Normalizamos el RGB (de 0-255 a 0.0-1.0 para TouchDesigner)
        udpPort.send({
            address: "/luna/color",
            args: [
                { type: "f", value: data.r / 255 },
                { type: "f", value: data.g / 255 },
                { type: "f", value: data.b / 255 }
            ]
        });
    });
});

// Arrancar el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor activo. Público: entrar a http://localhost:3000');
});