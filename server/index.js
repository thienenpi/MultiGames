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
const clients = [];

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((error) => console.error(error));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.get("/", (req, res) =>
  res.status(200).json("Welcome to MultiGames server")
);

app.use("/api/roles", rolesRouter);
app.use("/api/users", userRouter);
app.post("/api/calculate", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const result = a + b;

  res.status(200).json(result);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Add new client to the list
  clients.push(socket);

  // Listen for draw event from client
  socket.on("draw", (data) => {
    // Broadcast draw data to all other clients
    clients.forEach((client) => {
      if (client !== socket) {
        client.emit("draw", data);
      }
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Remove disconnected client from the list
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

server.listen(port || process.env.PORT, () =>
  console.log(`Multigames listening on port ${port}!`)
);

module.exports = app;
