-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema redpanda
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema redpanda
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `redpanda` ;
USE `redpanda` ;

-- -----------------------------------------------------
-- Table `redpanda`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redpanda`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(10) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `redpanda`.`urls`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `redpanda`.`urls` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` TEXT(100) NOT NULL,
  `users_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_urls_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_urls_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `redpanda`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;