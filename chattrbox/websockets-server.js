var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];

console.log("websockets server started");

ws.on("connection", function(socket) {
  console.log("Client connection established");
  messages.forEach(function(msg) {
    socket.send(msg);
  });

  socket.on("message", function(data) {
    console.log("Message Received: " + data);
    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
  });
});
