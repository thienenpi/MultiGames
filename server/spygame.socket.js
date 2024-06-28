const socketIo = require("socket.io");
const Message = require("./models/Message");
const Keyword = require("./models/Keywords");
// Store clients per room
const rooms = {};
const chatHistory = {};
const votes = {};
const eliminated = {};
const descriptionMessages = {};
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

      socket.removeAllListeners("message");

      socket.on("message", (message) => {
        console.log(message);
        if (!chatHistory[room]) {
          chatHistory[room] = [];
        }
        if (message.isDescMessage) {
          socket.on("users", (data) => {
            data.forEach((user) => {
              if (message.senderId === user._id) {
                descriptionMessages[user._id] = message.content;
              }
            });
            io.to(room).emit("descriptionMessage", descriptionMessages);
          });
        } else {
          chatHistory[room].push(message);
          io.to(room).emit("message", message);
        }
      });
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
        startGameHandler(room).then(() => {
          io.to(room).emit("startGame", room);
        });
      }
    };

    const getKeyWords = async () => {
      try {
        const keywords = await Keyword.find();
        return keywords;
      } catch (error) {
        return;
      }
    };

    const startGameHandler = async (room) => {
      console.log(`Game started in room ${room}`);

      // Lấy từ khóa từ database
      const keywords = await getKeyWords();
      // Chọn ngẫu nhiên 2 từ khóa
      const selectedKeywords = selectRandomKeywords(keywords, 2);

      // Lấy tất cả người dùng trong phòng
      const clients = rooms[room].map((client) => client.id);

      // Chọn ngẫu nhiên một người dùng
      const randomUser = selectRandomUser(clients);

      // Gửi từ khóa đến người dùng
      clients.forEach((userId) => {
        const assignedKeyword =
          userId === randomUser ? selectedKeywords[1] : selectedKeywords[0];
        io.to(userId).emit("assignKeyword", { keyword: assignedKeyword });
        console.log(assignedKeyword);
      });
    };

    const selectRandomKeywords = (keywords, count) => {
      const shuffled = [...keywords].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const selectRandomUser = (users) => {
      const randomIndex = Math.floor(Math.random() * users.length);
      return users[randomIndex];
    };

    const voteHandler = (voteData) => {
      const { voter, votee, room } = voteData;

      if (!votes[room]) {
        votes[room] = {};
      }

      if (!votes[room][votee]) {
        votes[room][votee] = 0;
      }
      if (voter !== votee) {
        votes[room][votee]++;
      }

      // Notify all clients about the current vote status (optional)
      io.to(room).emit("voteUpdate", votes[room]);
    };

    console.log("A user connected");

    const handleVotingResult = (room) => {
      const voteResults = votes[room];
      const highestVotedPlayer = Object.entries(voteResults).reduce(
        (highest, [id, count]) => {
          return count > highest.count ? { id, count } : highest;
        },
        { id: null, count: 0 }
      );
      console.log(highestVotedPlayer);
      if (highestVotedPlayer.id) {
        if (!eliminated[room]) {
          eliminated[room] = [];
        }
        
        eliminated[room].push(highestVotedPlayer.id);
      }

      io.to(room).emit("eliminated", eliminated[room]);
    };

    socket.on("sendMessage", async (message) => {
      const newMessage = new Message(message);
      const savedMessage = await newMessage.save();
      io.emit("notification", savedMessage);
      io.emit("receiveMessage", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

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
        delete votes[room];
        delete descriptionMessages[room];
      }
    });

    socket.on("join", joinHandler);
    socket.on("ready", readyHandler);
    socket.on("vote", voteHandler);
    socket.on("votingResult", handleVotingResult);
  });
};

module.exports = spyGameSocketSetup;
