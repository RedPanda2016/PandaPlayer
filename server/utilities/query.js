var db = require('../db/db_controller.js');

module.exports = {
  getAll: function(cb) { // Gets all the users data and returns and array of objects.
    db.Users.findAll()
    .then(function(data) {
      cb(data);
    })
    .catch(function() {
      console.log('failed GET request');
    });
  },
  postReg: function(req, cb) { // takes the JSON object for posting new data(see below)
    db.Users.findOrCreate({where: {
      userName: req.userName,
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      password: req.password
    },
    })
    .then(function() {
      cb(201);
    })
    .catch(function() {
      console.log('failed POST request');
      cb(404);
    });
  },
  getFiltered: function(params, cb) { // takes an object with username --> {userName: 'DaName'}
    db.Users.findAll({where: params})
      .then(function(userPost) {
        cb(userPost);
      })
      .catch(function() {
        console.log('failed GET request');
      });
  },
  putReg: function(req, cb) { //alters user data based on userName/ takes an object with all data (see below) minus password
    db.Users.findAll({where: {userName: req.userName}})
      .then(function(userPost) {
        if (userPost) {
          db.Users.update({
            userName: req.userName,
            firstName: req.firstName,
            lastName: req.lastName,
            email: req.email
          },{
          where:{
              userName: req.userName
            }
          });
        }
        cb(201);
      })
      .catch(function() {
        console.log('failed PUT request');
        cb(404);
      });
  },
  deleteReg: function(req, cb) { // takes a JSON object (see below)
    db.Users.find({where: req})
      .then(function(userPost) {
        db.Users.destroy({
          where: req
        });
        cb(201);
      })
      .catch(function() {
        console.log('failed DELETE request');
        cb(404);
      });
  }
}

/* Correct JSON object format... Can leave off password for put and delete.

{
  "userName": "FredDaDude!",
  "firstName": "Fred",
  "lastName": "Dude",
  "email": "fred@whatever.com",
  "password": "12ljn234kjkaaajh1423"
}

*/


