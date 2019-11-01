var express = require("express");
var app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 7000;
var rooms = { "chat room": "rc1", "world wide web": "rc2" ,"過去問": "rs1","会議資料":"rs2"};
app.use(express.static(__dirname + "/public/dist"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", function(socket) {
  socket.emit("rooms", rooms);

  socket.on("put", function(msg) {
    socket.join(msg.lid);
    socket.broadcast.to(msg.lid).emit("put", msg);
    console.log(msg);
  });
  socket.on("get", function(msg) {
    socket.join(msg.lid);
    socket.broadcast.to(msg.lid).emit("get", msg);
    console.log("get");
    console.log(msg);
  });
  socket.on("delete", function(msg) {
    socket.join(msg.lid);
    socket.broadcast.to(msg.lid).emit("delete", msg);
    console.log("delete");
    console.log(msg);
  });
  socket.on("room add", function(msg) {
    for (key in Object.keys(msg)) {
      rooms[key] = msg[key];
    }
    socket.broadcast.emit("rooms", rooms);
    console.log("room add");
    console.log(msg);
  });
});

http.listen(PORT, function() {
  console.log("server listening. Port:" + PORT);
});
