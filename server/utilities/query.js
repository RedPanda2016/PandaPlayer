var db = require('../db/db_controller.js');

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

module.exports = {
  getAll: function(cb) { // Gets all the users data and returns an array of objects.
    // query gets all the information from the database.
    db.Users.findAll()
    .then(function(data) {
      // id successful call the callback.
      cb(data);
    })
    .catch(function() {
      // else log to the console that the GET failed.
      console.log('failed GET request');
    });
  },
  postReg: function(req, cb) { // adds a single user data to the database.
    // query looks for the user information, if it exists don't add it, if not add it.
    db.Users.findOrCreate({where: {
      userName: req.userName,
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      password: req.password
    },
    })
    .then(function() {
      // NOTE -> I would like to add functionality here that checks to see if anything was actually added so that I can return that data for use on the front end. My brief research did show that there is a parameter we can add that is a boolean value.
      // call callback
      cb(201);
    })
    .catch(function() {
      console.log('failed POST request');
      cb(404);
    });
  },
  getFiltered: function(params, cb) { // queries the database for a specific user based on there user name. Params to send are --> {userName: 'danName1!'}
    db.Users.findAll({where: params})
      .then(function(userData) {
        // call callback on userData...
        cb(userData);
      })
      .catch(function() {
        console.log('failed GET request');
      });
  },
  putReg: function(req, cb) { // updates user information based on matching userName. Takes entire object minus password.
    // finds user information based in userName matching.
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
  deleteReg: function(req, cb) { // deletes a single user from the database based on userName.
    // !!! this function is broken, will wipe out entire database !!!
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


