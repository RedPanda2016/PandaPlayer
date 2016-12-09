var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var router = require('./routes');
var cors = require('cors');

// create new app...
var app = express();
module.exports.app = app;

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