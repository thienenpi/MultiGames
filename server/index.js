const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketIo(server, {
  path: "/api/whiteBoard/",
});

const rolesRouter = require("./routes/role");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((error) => console.error(error));

// Store clients per room
const rooms = {};

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res) =>
  res.status(200).json("Welcome to MultiGames server")
);

app.use("/api/roles", rolesRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (room) => {
    console.log(`User joined room ${room}`)
    socket.join(room);

    // Initialize room if not exists
    if (!rooms[room]) {
      rooms[room] = [];
    }

    // Add client to the room
    rooms[room].push(socket);

    // Listen for draw event from client
    socket.on("draw", (data) => {
      // Broadcast draw data to all other clients in the same room
      socket.to(room).emit("draw", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");

      // Remove disconnected client from the room
      const index = rooms[room].indexOf(socket);
      if (index !== -1) {
        rooms[room].splice(index, 1);
      }
    });

    // delete room if no clients
    if (rooms[room].length === 0) {
      delete rooms[room];
    }
  });
});

server.listen(port || process.env.PORT, () =>
  console.log(`Multigames listening on port ${port}!`)
);

module.exports = app;
