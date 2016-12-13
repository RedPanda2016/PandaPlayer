var express = require('express');
var morgan = require('morgan');
var bcrypt = require('bcrypt');

/*
Correct JSON object format...
  * general/post and auth/post you must use this format.
  * PUT request requires the entire object minus the password.
  * for all other requests you can enter any of the below properties as long as there is one.
{
  "userName": "FredDaDude!",
  "firstName": "Fred",
  "lastName": "Dude",
  "email": "fred@whatever.com",
  "password": "12ljn234kjkaaajh1423"
}
*/

// Create a password salt
var salt = bcrypt.genSaltSync(10);

// All query functions;
var query = require('../utilities/query.js');

module.exports = {
  // general contains standard get and post requests...
  general: {
    get: function(req, res) {// returns all the data in the database
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
    post: function(req, res) {// takes a standard JSON object (see below). This still takes a password, this post request is almost useless since the password is not encrypted. To update the user info use filtered.
      query.postReg(req.body, function(status){
        res.status(status);
        res.end();
      });
    }
  },
  // filtered requests filter data based on at least one identifying...
  filtered: {
    get: function(req, res) {// gets a single user based on userName.
      query.getFiltered(req.query, function(data) {
        res.json(data);
        res.end();
      });
    },
    put: function(req, res) {// updates a single user based on userName.
      query.putReg(req.body, function(status) {
        res.status(status);
        res.end();
      });
    },
    delete: function(req, res) {// deleted a single user based on userName.
      query.deleteReg(req.query, function() {
        res.end();
      })
    }
  },
  auth: {
    signIn: function(req, res) {// checks if user is valid
      query.getFiltered({userName: req.query.userName}, function(data) {
        // uses bcrypt comparesync to validate if user is valid. Returns a boolean.
        var validate = bcrypt.compareSync(req.query.password, data[0].password);
        // writes the boolean to res object...
        res.json(validate);
        res.end()
      });
    },
    signUp: function(req, res) {// encrypts password then adds new user information to database.
      // use bcrypt to hash and salt the password (salt created at top of this file)
      var passwordToSave = bcrypt.hashSync(req.body.password, salt);
      // assemble data into object for db query...
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

