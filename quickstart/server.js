/*server.js*/
const { Server } = require('socket.io');
const { useAzureSocketIO } = require('@azure/web-pubsub-socket.io');

let io = new Server(3000);

// Use the following line to integrate with Web PubSub for Socket.IO
useAzureSocketIO(io, {
  hub: 'Hub', // The hub name can be any valid string.
  connectionString: process.argv[2],
});

const clients = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Add new client to the list
  clients.push(socket);

  // Listen for draw event from client
  socket.on('draw', (data) => {
    // Broadcast draw data to all other clients
    clients.forEach((client) => {
      if (client !== socket) {
        client.emit('draw', data);
      }
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // Remove disconnected client from the list
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});
