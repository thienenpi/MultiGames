const socketIo = require("socket.io");
const Message = require("./models/Message");

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
      // emit to others in the room
      socket.to(room).emit("join", room);

      // Remove any existing listeners to avoid memory leaks
      socket.removeAllListeners("selectKeyword");
      socket.removeAllListeners("draw");
      socket.removeAllListeners("message");

      socket.on("selectKeyword", (keyword) => {
        socket.to(room).emit("selectKeyword", keyword);
      });

      socket.on("draw", (data) => {
        socket.to(room).emit("draw", data);
      });

      socket.on("message", (message) => {
        console.log(message);

        if (!chatHistory[room]) {
          chatHistory[room] = [];
        }

        chatHistory[room].push(message);
        io.to(room).emit("message", message);
      });
    };
    const leaveHandler = (room) => {
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
    };

    const readyHandler = (room) => {
      if (!rooms[room]["noReady"]) {
        rooms[room]["noReady"] = 0;
      }

      rooms[room]["noReady"]++;
      console.log(
        rooms[room]["noReady"] + " out of " + rooms[room].length + " are ready"
      );

      if (rooms[room]["noReady"] === rooms[room].length) {
        socket.emit("startGame");
        socket.to(room).emit("startGame");
      }
    };
    socket.on('ready', readyHandler);
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
      console.log(`user disconnected`);
      // find the room that the user is in
      let room = null;

      for (const key in rooms) {
        if (rooms[key].includes(socket)) {
          room = key;
          break;
        }
      }

      if (room) {
        leaveHandler(room);
      }
    });

    socket.on("leave", leaveHandler);
    socket.on("join", joinHandler);
  });
};

module.exports = socketSetup;
