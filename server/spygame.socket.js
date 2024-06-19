const socketIo = require("socket.io");
const Message = require("./models/Message");

// Store clients per room
const rooms = {};
const chatHistory = {};

const spyGameSocketSetup = (server) => {
  const io = socketIo(server, {
    path: "/api/spyGame/",
  });

  io.on("connection", (socket) => {
    const joinHandler = (room) => {
      socket.join(room);
      console.log(`A user joined ${room}`);

      if (!rooms[room]) {
        rooms[room] = [];
      }

      rooms[room].push(socket);
      // emit to others in the room
      socket.to(room).emit("join", room);

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
    const getMessages = async ({ userId, friendId }) => {
      try {
        const messages = await Message.find({
          $or: [
            { senderId: userId, recipientId: friendId },
            { senderId: friendId, recipientId: userId },
          ],
        }).sort({ timestamp: 1 });
        socket.emit("messages", messages);
      } catch (err) {
        console.error(err);
        socket.emit("messages", []);
      }
    }
    socket.on("getMessages", getMessages);

    socket.on("sendMessage", async (message) => {
      const newMessage = new Message(message);
      const savedMessage = await newMessage.save();
      io.emit("notification", savedMessage);
      io.emit("receiveMessage", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
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
      socket.to(room).emit("leave", room);

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

module.exports = spyGameSocketSetup;
