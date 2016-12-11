var express = require('express');
var morgan = require('morgan');
var bcrypt = require('bcrypt');

// Create a password salt
var salt = bcrypt.genSaltSync(10);
// All query functions stored in and object;
var query = require('../utilities/query.js');

module.exports = {
  general: {
    get: function(req, res) {
      query.getAll(function(data) {
        if (data.length) {
          res.json(data);
        } else {
          res.write('No Data');
        }
        res.status(202);
        res.end();
      });
    },
    post: function(req, res) {
      query.postReg(req.body, function(status){
        res.status(status);
        res.end();
      });
    }
  },
  filtered: {
    get: function(req, res) {
      query.getFiltered(req.query, function(data) {
        res.json(data);
        res.end();
      });
    },
    put: function(req, res) {
      query.putReg(req.body, function(status) {
        res.status(status);
        res.end();
      });
    },
    delete: function(req, res) {
      query.deleteReg(req.query, function() {
        res.end();
      })
    }
  },
  auth: {
    signIn: function(req, res) {
      query.getFiltered({userName: req.query.userName}, function(data) {
        var dooDad = bcrypt.compareSync(req.query.password, data[0].password);
        res.json(dooDad);
        res.end()
      });
    },
    signUp: function(req, res) {
      var passwordToSave = bcrypt.hashSync(req.body.password, salt);

      var makeData = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordToSave
      };

      query.postReg(makeData, function(data) {
        if (data) {
            res.status(201);
          } else {
            res.status(404);
          }
          res.end();
      });
    }
  }
};
