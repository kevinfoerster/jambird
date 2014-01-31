var sys = require('sys');
var exec = require('child_process').exec;
var restify = require('restify');
var io = require('socket.io').listen(3000);



function respond(req, res, next) {
  res.send('socket ' + req.params.name);
  exec("say socket " + req.params.name + 'on', puts);
  exec("sispmctl -o " + req.params.name)

}

function socketOff (req, res, next) {
    res.send('socket ' + req.params.name);
    exec("sispmctl -f " + req.params.name)
}

function socketOn (req, res, next) {
    res.send('socket ' + req.params.name);
    exec("sispmctl -o " + req.params.name)
}

function socketToggle (req, res, next) {
    res.send('socket ' + req.params.name);
    exec("sispmctl -t " + req.params.name)
}



var server = restify.createServer();
server.get('/socket/on/:name', socketOn);
server.head('/socket/on/:name', socketOn);

server.get('/socket/toggle/:name', socketToggle);
server.head('/socket/toggle/:name', socketToggle);

server.get('/socket/off/:name', socketOff);
server.head('/socket/off/:name', socketOff);

// server.listen(8080, function() {
//   console.log('%s listening at %s', server.name, server.url);
// });

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  var sockets = [];

  exec("sispmctl -g all", function (error, stdout, stderr) {
    var output = stdout.split("\n");
    for (var i = 1; i < output.length -1; i++) {
      line = output[i].split(" ")[output[i].split(" ").length-1].replace(/(\r\n|\n|\r)/gm,"");
      socketState = line.split(":\t");

      socketId = socketState[0];
      state = socketState[1] == 'off' ? false : true;

      // socketId = output[i].split(" ")[output[i].split(" ").length-2]
      sockets.push({socket: parseInt(socketId), state: state})
    };
    
    if (sockets.length) {
      socket.emit('initialState', sockets);
    }
  })
  

  socket.on('toggle', function (data) {
    console.log(data.socket);
    exec("sispmctl -t " + data.socket, function (error, stdout, stderr) {
      socketState = stdout.split(" ")[stdout.split(" ").length-1].replace(/(\r\n|\n|\r)/gm,"");
      socketId = stdout.split(" ")[stdout.split(" ").length-2]
  
      if (socketState === "off") {
        result = false;
      }else{
        result = true;
      }

    
      socket.emit('updateSocket', {socket: parseInt(socketId), state: result});
      socket.broadcast.emit('updateSocket', {socket: parseInt(socketId), state: result});
    
    });

  });
});
