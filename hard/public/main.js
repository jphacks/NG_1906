var socket = io();
$(function() {
  $("#push").click(function() {
    let ID = $("#inputState option:selected").text();
    let q1 = $('input[name="q1"]').val();
    let q2 = $('input[name="q2"]').val();
    let q3 = $('input[name="q3"]').val();
    let q4 = $('input[name="q4"]').val();
    let q5 = $('input[name="q5"]').val();

    socket.emit("put", {
      cid: ID,
      gid: q1,
      username: q2,
      query3: q3,
      query4: q4,
      query5: q5
    });

    return false;
  });
  socket.on("put", function(msg) {
    $("#messages").append($("<li>").text("put"));
    $("#messages").append($("<li>").text(JSON.stringify(msg)));
  });
  socket.on("get", function(msg) {
    $("#messages").append($("<li>").text("get"));
    $("#messages").append($("<li>").text(JSON.stringify(msg)));
  });
  socket.on("delete", function(msg) {
    $("#messages").append($("<li>").text("delete"));
    $("#messages").append($("<li>").text(JSON.stringify(msg)));
  });
  socket.on("rooms", function(msg) {
    $("#rooms").empty();
    $("#rooms").append($("<li>").text("rooms"));
    $("#rooms").append($("<li>").text(JSON.stringify(msg)));
  });
});
