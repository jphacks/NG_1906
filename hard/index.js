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
  socket.on("c2s", function(msg) {
    socket.join(msg.cid);
    socket.broadcast.to(msg.cid).emit("s2l", msg);
    console.log("c2s");
    console.log(msg);
  });
  socket.on("l2s", function(msg) {
    socket.join(msg.cid);
    socket.broadcast.to(msg.cid).emit("s2d", msg);
    console.log("l2s");
    console.log(msg);
  });
});

http.listen(PORT, function() {
  console.log("server listening. Port:" + PORT);
});
