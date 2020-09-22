const socket = io('http://localhost:9000');
const socket2 = io('http://localhost:9000/admin');

socket.on('connect', (dataFromServer) => {
    console.log(socket.id);
});

socket2.on('connect', (dataFromServer) => {
    console.log(socket2.id);
});

socket2.on('welcome',(message)=>{
    console.log(message);
});

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('messageToServer', { data: "This is from the client" })
});



document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', { text: newMessage });
});

socket.on('messageToClients', (message) => {
    console.log(message);
    document.querySelector('#messages').innerHTML += `<li>${message.text}</li>`;
});
    // socket.on('ping',()=>{
    //     console.log('Ping was received from the server!');
    // });

    // socket.on('pong',(latency)=>{
    //     console.log(latency)
    //     console.log('Pong was sent to the server!');
    // });