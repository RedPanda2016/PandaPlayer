var db = require('../db/db_controller.js');

module.exports = {
  getAll: function(res) { // Gets all the users data and returns and array of objects.
    db.Users.findAll().then(function(all){
      if (res) { // if res is defined use response to create a json response. This is mostly for the API
        res.json(all);
        res.end();
      } else { // else just return the data as is.
        return all;
      }
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
    });
  },
  getFiltered: function(req, res) { // takes an object with username --> {userName: 'DaName'}
    db.Users.findAll({where: req})
      .then(function(userPost) {
        if (userPost) {
          if (res) {
            res.json(userPost);
            res.end();
          } else {
            return userPost;
          }
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
              userName: req.userName
            }
          });
        } else {
          return 404;
        }
      });
  },
  deleteReg: function(req) { // takes a JSON object (see below)
    db.Users.findAll({where: req})
      .then(function(userPost) {
        db.Users.destroy({
          where: req
        });
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


