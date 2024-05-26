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

      if (!rooms[room]) {
        rooms[room] = [];
      }
      rooms[room].push(socket);

      socket.on("draw", (data) => {
        socket.to(room).emit("draw", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
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
  });
};

module.exports = socketSetup;
