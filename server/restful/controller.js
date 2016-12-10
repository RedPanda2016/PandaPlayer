var express = require('express');
var morgan = require('morgan');

// All query functions stored in and object;
var query = require('../utilities/query.js');

module.exports = {
  general: {
    get: function(req, res) {
      res.end(query.getAll());
    },
    post: function(req, res) {
      res.end(query.postReg(req.body));
    }
  },
  filtered: {
    get: function(req, res) {
      console.log('GET2');
      res.end('GET2');
    },
    put: function(req, res) {
      console.log('PUT')
      res.end('PUT');
    },
    delete: function(req, res) {
      console.log('DELETE');
      res.end('DELETE');
    }
  }
};
