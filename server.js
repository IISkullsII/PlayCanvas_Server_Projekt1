var server = require('http').createServer();
var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
    console.log("Client has connected!");
  
  socket.on('playerJoined', function(msg){
    console.log("Message -> ",msg);
  });
  
  
  
  
});

console.log ('Server started.');
server.listen(3000);