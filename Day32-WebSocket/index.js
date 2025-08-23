const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("messgae", (data) => {
    io.emit("new-msg", data);
  });
  socket.on("disconnected", () => {
    console.log("disconnected from server"); 
  });
});

server.listen(3000, () => {
  console.log("listening at port 3000");
});
// upgrade krke websocket pr le jayege
