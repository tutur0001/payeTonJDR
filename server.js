const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = socketio(server);


// static folder 

app.use(express.static(path.join(__dirname, 'public')))

// Client connected 
io.on('connection', socket => {
  socket.emit('message', 'Bienvenu a toi !')

  socket.broadcast.emit('message', 'A user has joined the chat !');

//Client disconnect
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat')
  });

  //Listen for message
  socket.on('chatMessage', msg => {
    io.emit('message', msg)
  }); 

});

const PORT = 3000 || process.env.PORT;

// listenner server 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));  
