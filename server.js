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

// Draw system 

var line_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }

   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line to history 
      line_history.push(data.line);
      // send line to all clients
      io.emit('draw_line', { line: data.line });
   });
});



const PORT = 3000 || process.env.PORT;

// listenner server 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));  
