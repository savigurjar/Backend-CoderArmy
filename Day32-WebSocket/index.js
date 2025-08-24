const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);


  
  // create room//join room
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  // socket.on("message", (data) => {
  //   console.log("Message received:", data);
  //   // io.emit("new-message", data); // broadcast to all
  //   socket.broadcast.emit("new-message", data);
  // });

  socket.on("message", ({ room, msg }) => {
    // console.log("Message received:", data);
    socket.to(room).emit("new-message", msg);
  });

  //  disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("listening at port 3000");
});
