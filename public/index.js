const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use('/',express.static(__dirname+'/public'));

// Generate a random Color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

io.on('connection', (socket) => {
    
    console.log('a user connected',socket.id);

    // Assign a random color to the user
    const userColor = getRandomColor();

    socket.on('msg_send',(data)=>{
        console.log(data);

        // Attach the user's color to the message
        const msgData = {
            msg: data.msg,
            color: userColor,
            senderId: socket.id // Include the sender's socket ID
        };

        io.emit('msg_rcvd',msgData);
        // socket.emit('msg_rcvd',data);
        // socket.broadcast.emit('msg_rcvd',data);
    })
});

server.listen(3000,()=>{
    console.log("Server Started");
})