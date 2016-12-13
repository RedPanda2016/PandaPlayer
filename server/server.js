var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var router = require('./routes');
var cors = require('cors');

// create new app and socket event listener
var app = express();


var http = require('http').Server(app);
var io = require ('socket.io')(http)


io.on('connection', function (socket) {

    rooms = [];
    connections = [];

    connections.push(socket);
    console.log('Connection: %s users connected', connections.length)

    socket.on('test', function() {
        console.log('mounted')
    });


    socket.on('URL', function(data) {
        console.log('serverside', data.url);
        socket.emit('loadUrl', data.url)
    });

    socket.on('playPause', function() {
        // Sends the command to start the videos.
        socket.emit('startVideo')
        console.log('playpause emitted on serverside')
    });

    socket.on('createRoom', function (newRoom) {
        rooms.push(newRoom);
        socket.join(newRoom);
        console.log('you have successfully created and joined a room', newRoom);
    });

    socket.on('messageSent', function(message) {
        console.log('message received on the serverside', message);
        socket.emit('postMessage', message)
    })
});


// listen on 2727...
app.set('port', 2727);

// logging and parsing...
app.use(morgan('dev'));
app.use(parser.json());// parses data to JSON

app.use(cors());

app.use('/api', router);

// confirmation server is running...
if (!module.parent) {
  http.listen(app.get('port'));
  console.log('listening on', app.get('port'));
}
//
module.exports.app = app;