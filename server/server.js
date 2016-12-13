var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var router = require('./routes');
var cors = require('cors');

// create new app and socket event listener
var app = express();

app.use(cors());

var http = require('http').Server(app);
var io = require ('socket.io')(http)

//socket server-side event emitters
require ('./config/socketConfig')(io)

// listen on 2727...
app.set('port', 2727);

// logging and parsing...
app.use(morgan('dev'));
app.use(parser.json());// parses data to JSON


app.use('/api', router);

// confirmation server is running...
if (!module.parent) {
  http.listen(app.get('port'));
  console.log('listening on', app.get('port'));
}
//
module.exports.app = app;