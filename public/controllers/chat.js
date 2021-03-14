// const io = require('socket.io-client');

const chatForm = document.getElementById('chat-form');
//Message from serveur
const socket = io(''); 
socket.on('message', message => {
    console.log(message);
    outputMessage(message);
});

// Gestion des messages

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
});


//Output message 

function outputMessage(message) {
    const div = document.createElement('div'); 
    div.classList.add('message');
    div.innerHTML = `<p class="nameOfUser">[Codex] :</p>
    <p class="text">${message}</p>`;
    document.querySelector('.chat-messages').appendChild(div)
    chatForm.reset();
}