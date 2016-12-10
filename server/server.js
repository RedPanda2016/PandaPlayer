var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var router = require('./routes');
var cors = require('cors');



// create new app and socket event listener
var app = express();
var http = require('http').Server(app);
// hook socket onto http instantiation of server
// set up socket authentication
var io = require ('socket.io').listen(http);
var socketioJwt = require('socketio-jwt');


  io.on('connection', socketioJwt.authorize({
      //need to configure client secret first
      secret: 'YOUR_CLIENT_SECRET',
      timeout: 1000 // 1 second to send the authentication message
  })).on('authenticated', function(socket) {
      //this socket is authenticated, we are good to handle more events from it.
      console.log('hello! ' + JSON.stringify(socket.decoded_token));
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
  app.listen(app.get('port'));
  console.log('listening on', app.get('port'));
}

module.exports.app = app;