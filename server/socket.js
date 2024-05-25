const socketIo = require("socket.io");

// Store clients per room
const rooms = {};
const chatHistory = {};

const socketSetup = (server) => {
  const io = socketIo(server, {
    path: "/api/whiteBoard/",
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

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
