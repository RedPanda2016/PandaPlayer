var express = require('express');
var morgan = require('morgan');

// All query functions stored in and object;
var query = require('../utilities/query.js');

module.exports = {
  general: {
    get: function(req, res) {
      query.getAll(res);
    },
    post: function(req, res) {
      res.end(query.postReg(req.body));
    }
  },
  filtered: {
    get: function(req, res) {
      query.getFiltered(req.query, res);
    },
    put: function(req, res) {
      res.end(query.putReg(req.body));
    },
    delete: function(req, res) {
      res.end(query.deleteReg(req.query));
    }
  }
};
