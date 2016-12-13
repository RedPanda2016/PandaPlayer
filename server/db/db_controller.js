var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('red_panda', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


sequelize
  .authenticate()// Verify database is good to go...
  .then(function(err) {
    console.log('MySql connection is OK! Good job!');
  })
  .catch(function(err) {
    console.log('Unable to connect to MySql, heres the err: ', err);
  });

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




// CREATE SCHEMA IF NOT EXISTS `redpanda` ;
// USE `redpanda` ;

// -- -----------------------------------------------------
// -- Table `redpanda`.`users`
// -- -----------------------------------------------------
// CREATE TABLE IF NOT EXISTS `redpanda`.`users` (
//   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   `user_name` VARCHAR(10) NOT NULL,
//   `first_name` VARCHAR(45) NOT NULL,
//   `last_name` VARCHAR(100) NOT NULL,
//   `email` VARCHAR(100) NOT NULL,
//   PRIMARY KEY (`id`))
// ENGINE = InnoDB;


// -- -----------------------------------------------------
// -- Table `redpanda`.`urls`
// -- -----------------------------------------------------
// CREATE TABLE IF NOT EXISTS `redpanda`.`urls` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `url` TEXT(100) NOT NULL,
//   `users_id` INT UNSIGNED NOT NULL,
//   PRIMARY KEY (`id`, `users_id`),
//   INDEX `fk_urls_users_idx` (`users_id` ASC),
//   CONSTRAINT `fk_urls_users`
//     FOREIGN KEY (`users_id`)
//     REFERENCES `redpanda`.`users` (`id`)
//     ON DELETE NO ACTION
//     ON UPDATE NO ACTION)
// ENGINE = InnoDB;


// SET SQL_MODE=@OLD_SQL_MODE;
// SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
// SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
