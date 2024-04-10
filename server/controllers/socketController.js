// const http = require("http");
// const socketIo = require("socket.io");
// const app = require("../index");

// const server = http.createServer(app);
// const io = socketIo(server);
// const clients = [];

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Add new client to the list
//   clients.push(socket);

//   // Listen for draw event from client
//   socket.on("draw", (data) => {
//     // Broadcast draw data to all other clients
//     clients.forEach((client) => {
//       if (client !== socket) {
//         client.emit("draw", data);
//       }
//     });
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//     // Remove disconnected client from the list
//     const index = clients.indexOf(socket);
//     if (index !== -1) {
//       clients.splice(index, 1);
//     }
//   });
// });

// // const PORT = process.env.PORT || 3000;

// // server.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });
