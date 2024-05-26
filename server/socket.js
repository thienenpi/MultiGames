const socketIo = require("socket.io");
const Message = require('./models/Message');

// Store clients per room
const rooms = {};
const chatHistory = {};

const socketSetup = (server) => {
  const io = socketIo(server, {
    path: "/api/whiteBoard/",
  });

  io.on("connection", (socket) => {

    const joinHandler = (room) => {
      socket.join(room);
      console.log(`A user joined ${room}`);

      if (!rooms[room]) {
        rooms[room] = [];
      }

      rooms[room].push(socket);

      // Remove any existing listeners to avoid memory leaks
      socket.removeAllListeners("draw");
      socket.removeAllListeners("message");

      socket.on("draw", (data) => {
        socket.to(room).emit("draw", data);
      });

      socket.on("message", (message) => {
        console.log(message);

        if (!chatHistory[room]) {
          chatHistory[room] = [];
        }

        chatHistory[room].push(message);
        socket.to(room).emit("message", message);
      });
    };
    
    console.log("A user connected");

    socket.on('getMessages', async ({ userId, friendId }) => {
      try {
        const messages = await Message.find({
          $or: [
            { senderId: userId, recipientId: friendId },
            { senderId: friendId, recipientId: userId }
          ]
        }).sort({ timestamp: 1 });
        socket.emit('messages', messages);
      } catch (err) {
        console.error(err);
        socket.emit('messages', []);
      }
    });

    socket.on('sendMessage', async (message) => {
      const newMessage = new Message(message);
      const savedMessage = await newMessage.save();
      io.emit('receiveMessage', savedMessage);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on("startChat", (room) => {
      socket.join(room);
      socket.on("message", (message) => {
        console.log(message);
        if (!chatHistory[room]) {
          chatHistory[room] = [];
        }
        chatHistory[room].push(message);
        io.to(room).emit("message", message);
      });

      socket.on("getChatHistory", (roomId) => {
        const history = chatHistory[roomId] || [];
        socket.emit("chatHistory", history);
      });
    });

    socket.on("join", (room) => {
      console.log(`User joined room ${room}`);
      socket.join(room);
      console.log(`A user joined ${room}`);

      if (!rooms[room]) {
        rooms[room] = [];
      }

      rooms[room].push(socket);

      // Remove any existing listeners to avoid memory leaks
      socket.removeAllListeners("draw");
      socket.removeAllListeners("message");

      socket.on("draw", (data) => {
        socket.to(room).emit("draw", data);
      });

      socket.on("message", (message) => {
        console.log(message);

        if (!chatHistory[room]) {
          chatHistory[room] = [];
        }

        chatHistory[room].push(message);
        socket.to(room).emit("message", message);
      });
    });

    socket.on("join", joinHandler);

    socket.on("getChatHistory", (room) => {
      if (chatHistory[room]) {
        chatHistory[room].forEach((message) => {
          socket.emit("message", message);
        });
      }
    });

    socket.on("leave", (room) => {
      console.log(`A user leaved from ${room}`);

      const index = rooms[room].indexOf(socket);

      if (index !== -1) {
        rooms[room].splice(index, 1);
      }

      if (rooms[room].length === 0) {
        delete rooms[room];
        delete chatHistory[room];
      }
    });
  });
};

module.exports = socketSetup;
