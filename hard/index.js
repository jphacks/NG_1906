var express = require("express");
var app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 7000;
var rooms = { "chat room": "rc1", "world wide web": "rc2" };
app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", function(socket) {
  socket.on("put", function(msg) {
    socket.join(msg.gid);
    socket.broadcast.to(msg.gid).emit("put", msg);
    console.log(msg);
  });
  socket.on("get", function(msg) {
    socket.join(msg.gid);
    socket.broadcast.to(msg.gid).emit("get", msg);
    console.log("get");
    console.log(msg);
  });
  socket.on("delete", function(msg) {
    socket.join(msg.gid);
    socket.broadcast.to(msg.gid).emit("delete", msg);
    console.log("delete");
    console.log(msg);
  });
});

http.listen(PORT, function() {
  console.log("server listening. Port:" + PORT);
});
