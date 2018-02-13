var server = require('http').createServer();
var io = require('socket.io')(server);



var curPlayer = [];


function Player(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.entity = null;
}



io.sockets.on('connection', function (socket) {
  socket.on('initialize', function(){
    console.log("New User connected and initialized!");
    var id = socket.id;
    var newPlayer = new Player(id);


    curPlayer[id]=newPlayer;

    socket.emit('playerData', {id: id, 'currentPlayer': curPlayer});

    socket.broadcast.emit('playerJoined', newPlayer);
  });

  socket.on('positionUpdate', function(data){
    curPlayer[data.id].x = data.x;
    curPlayer[data.id].y = data.y;
    curPlayer[data.id].z = data.z;

    socket.broadcast.emit('playerMoved', data);
  });

  socket.on('disconnect', function(){
    socket.broadcast.emit('playerLeft',this.id);
  });




});

console.log('Server started.');
server.listen(3000);