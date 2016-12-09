var express = require('express');
var morgan = require('morgan');

// var db = require('../db/db.js');

module.exports = {
  general: {
    get: function(req, res) {
      // Gets all data from database...
      console.log('GET')
      res.end('GET');
    },
    post: function(req, res) {
      // posts a single post to the database...
      console.log('POST')
      res.end('POST');
    }
  },

  filtered: {
    get: function(req, res) {
      // Gets a single users information based on id, or name...
      console.log('GET2')
      res.end('GET2');
    },
    put: function(req, res) {
      // Updates a single users information based on id, or name..
      console.log('PUT')
      res.end('PUT');
    },
    delete: function(req, res) {
      // Deleted a single users data based on id, or name...
      console.log('DELETE')
      res.end('DELETE');
    }
  }
};
