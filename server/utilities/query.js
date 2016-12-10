var db = require('../db/db_controller.js');

module.exports = {
  getAll: function() { // Gets all the users data and returns and array of objects.
    db.Users.findAll()
      .then(function(data) {
        return data;
      });
  },
  postReg: function(req) { // takes the JSON object for posting new data(see below)
    db.Users.findOrCreate({where: {
      userName: req.userName,
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      password: req.password
    },
    })
    .then(function(result) {
      var user = result[0] // the instance of the user
      var created = result[1] // boolean stating if the user was added already
      if (created) {
        return 404;
      } else {
        return 201;
        // may be a good idea to use a callback function here?
      }
    });
  },
  getFiltered: function(req) { // takes an object with username --> {userName: 'DaName'}
    db.Users.findAll({where: userName})
      .then(function(userPost) {
        if (userPost) {
          return userPost;
          // may need to use a callback here?
        } else {
          return 404;
        }
      });
  },
  putReg: function(req) { //alters user data based on userName/ takes an object with all data (see below) minus password
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
              id: req.userName
            }
          });
        } else {
          return 'No user by that name.'
        }
      });
  },
  deleteReg: function(req) { // takes a JSON object (see below)
    db.Users.findAll({where: {userName: req.userName}})
      .then(function(userPost) {
        if (userPost) {
          where:{
            userName: req.userName
          }
        } else {
          return 'No user by that name.'
        }
      });
  }
}

/*

{
  "userName": "FredDaDude!",
  "firstName": "Fred",
  "lastName": "Dude",
  "email": "fred@whatever.com",
  "password": "12ljn234kjkaaajh1423"
}

*/


