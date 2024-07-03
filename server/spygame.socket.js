const socketIo = require("socket.io");
const Message = require("./models/Message");
const Keyword = require("./models/Keywords");
// Store clients per room
const rooms = {};
const chatHistory = {};
const votes = {};
const eliminated = {};
const descriptionMessages = {};
let voted = 0;
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
        if (!chatHistory[room]) {
          chatHistory[room] = [];
        }
        if (message.isDescMessage) {
          if (!descriptionMessages[room]) {
            descriptionMessages[room] = {};
          }
          socket.on("users", (data) => {
            data.forEach((user) => {
              if (message.senderId === user._id) {
                  descriptionMessages[room][user._id] = message.content;
              }
            });
            io.to(room).emit("descriptionMessage", descriptionMessages[room]);
          });
        } else {
          chatHistory[room].push(message);
          io.to(room).emit("message", message);
        }
      });
    };
    socket.on("Reset", (room)=>{
      delete descriptionMessages[room];
      delete votes[room];
    })
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

      const keywords = await getKeyWords();

      const selectedKeywords = selectRandomKeywords(keywords, 2);

      const clients = rooms[room].map((client) => client.id);

      const randomUser = selectRandomUser(clients);

      io.to(room).emit("SpyPlayer", randomUser);

      socket.on("SpyData", (userInfo) => {
        console.log(userInfo);
        io.to(room).emit("SpyData", userInfo);
      });
      // Gửi từ khóa đến người dùng
      clients.forEach((userId) => {
        const assignedKeyword =
          userId === randomUser ? selectedKeywords[1] : selectedKeywords[0];
        io.to(userId).emit("assignKeyword", { keyword: assignedKeyword });
        console.log(assignedKeyword);
      });
    };

    const selectRandomKeywords = (keywords, count) => {
      if (!keywords.length) return [];
    
      // Group keywords by category
      const keywordsByCategory = keywords.reduce((acc, keyword) => {
        if (!acc[keyword.category]) {
          acc[keyword.category] = [];
        }
        acc[keyword.category].push(keyword);
        return acc;
      }, {});
    
      const categories = Object.keys(keywordsByCategory);
    
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
      const filteredKeywords = keywordsByCategory[randomCategory];
    
      const shuffled = [...filteredKeywords].sort(() => 0.5 - Math.random());
    
      return shuffled.slice(0, count);
    };

    const selectRandomUser = (users) => {
      const randomIndex = Math.floor(Math.random() * users.length);
      return users[randomIndex];
    };

    const voteHandler = (voteData) => {
      const { voter, votee, room, amoutVoter } = voteData;

      if (!votes[room]) {
        votes[room] = {};
      }

      if (!votes[room][votee]) {
        votes[room][votee] = 0;
      }
      if (voter !== votee) {
        votes[room][votee]++;
      }
      voted++;
      if (voted === amoutVoter) {
        io.to(room).emit("voteUpdate", votes[room]);
        votes[room] = {};
        voted = 0;
      }
    };

    console.log("A user connected");

    const handleVotingResult = (data) => {
      const { voteFinalResult, room } = data;

      const highestVotedPlayer = Object.entries(voteFinalResult).reduce(
        (acc, [key, value]) => {
          return value > acc.value ? { id: key, value: value } : acc;
        },
        { id: null, value: -Infinity }
      );

      if (!eliminated[room]) {
        eliminated[room] = [];
      }
      if (!eliminated[room].includes(highestVotedPlayer.id)) {
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

      if (rooms[room] === undefined) {
        return;
      }
      
      const index = rooms[room].indexOf(socket);

      if (index !== -1) {
        rooms[room].splice(index, 1);
      }
      if (rooms[room].length === 0) {
        delete rooms[room];
        delete chatHistory[room];
        delete votes[room];
        delete eliminated[room];
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
