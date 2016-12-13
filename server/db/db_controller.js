var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('red_panda', 'root', 'toLr$fp333', {
  host: 'localhost',
  dialect: 'mysql'
});

// to use this database be sure to start your mysql server in a terminal.
// then in your mysql editor create a schema named 'red_panda'.
// now you can use the app to sign up and login users.

sequelize
  .authenticate()
  .then(function(err) {
    console.log('MySql connection is OK! Good job!');
  })
  .catch(function(err) {
    console.log('Unable to connect to MySql, heres the err: ', err);
  });
// user table. Only table for the time being. Below tables are for making messages persist after logout and to store a users urls.
var Users = sequelize.define('users', {
    userName: {
      type: Sequelize.STRING(20),
      field: 'user_name',
      allowNull: false,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name'
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      field: 'password'
    }
});
/* ------For use after MVP
// var Urls = sequelize.define('urls', {
//     url: {
//       type: Sequelize.STRING,
//       field: 'url'
//     },
//     userId: {
//       type: Sequelize.INTEGER,
//       field: 'user_id'
//     }
// });

// var Messages = sequelize.define('messages', {
//   message: {
//     type: Sequelize.STRING,
//     field: 'message',
//     allowNull: false
//   },
//   userId: {
//     type: Sequelize.INTEGER,
//     field: 'user_id'
//   }
// });



// Urls.sync();
// Users.hasMany(Urls);
// Urls.belongsTo(Users);
// Users.hasMany(Messages);
// Messages.hasOne(Users);
------For use after MVP
*/

Users.sync();
exports.Users = Users;

