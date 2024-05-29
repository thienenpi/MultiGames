const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const socketSetup = require("./socket"); // Import socket setup
const app = express();
const port = 3000;
const server = http.createServer(app);

const rolesRouter = require("./routes/role");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const keywordRouter = require("./routes/keyword");

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
app.use("/api/rooms", roomRouter);
app.use("/api/keywords", keywordRouter);

// Pass the server to the socket setup function
socketSetup(server);

server.listen(port || process.env.PORT, () =>
  console.log(`Multigames listening on port ${port}!`)
);

module.exports = app;
