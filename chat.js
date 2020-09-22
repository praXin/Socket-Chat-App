const express = require('express');
const socketio = require('socket.io');
const app = express();

app.use(express.static(__dirname+'/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);
io.on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient);
    });
    socket.on('newMessageToServer', (message)=>{
        // console.log(message);
        // io.emit('messageToClients', {text:message.text});
        io.of('/').emit('messageToClients', {text:message.text});
    });
});

io.of('/admin').on('connection',(socket)=>{
    console.log('A client connected to the admin namespace');
    io.of('/admin').emit('welcome','Welcome to the admin channel');
});

//test comment