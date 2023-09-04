# PauloFernando_Sitcon

#Script para criação do banco de dados abaixo:

CREATE SCHEMA IF NOT EXISTS `stcdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `stcdb` ;

-- -----------------------------------------------------
-- Table `stcdb`.`patients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`patients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `data_nasc` DATETIME NULL DEFAULT NULL,
  `CPF` VARCHAR(255) NULL DEFAULT NULL,
  `status` SMALLINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stcdb`.`solicitation_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`solicitation_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `status` SMALLINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stcdb`.`procedures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`procedures` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(255) NOT NULL,
  `type_id` INT NULL DEFAULT NULL,
  `status` SMALLINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `type_id` (`type_id` ASC) VISIBLE,
  CONSTRAINT `procedures_ibfk_1`
    FOREIGN KEY (`type_id`)
    REFERENCES `stcdb`.`solicitation_type` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stcdb`.`professionals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`professionals` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `status` SMALLINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stcdb`.`professional_attends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`professional_attends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `procedure_id` INT NULL DEFAULT NULL,
  `professional_id` INT NULL DEFAULT NULL,
  `status` SMALLINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `procedure_id` (`procedure_id` ASC) VISIBLE,
  INDEX `professional_id` (`professional_id` ASC) VISIBLE,
  CONSTRAINT `professional_attends_ibfk_1`
    FOREIGN KEY (`procedure_id`)
    REFERENCES `stcdb`.`procedures` (`id`),
  CONSTRAINT `professional_attends_ibfk_2`
    FOREIGN KEY (`professional_id`)
    REFERENCES `stcdb`.`professionals` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stcdb`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`sequelizemeta` (
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stcdb`.`solicitation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`solicitation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_id` INT NULL DEFAULT NULL,
  `professional_id` INT NULL DEFAULT NULL,
  `solicitation_datetime` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 23
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `stcdb`.`solicitation_procedures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stcdb`.`solicitation_procedures` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `solicitation_id` INT NULL DEFAULT NULL,
  `procedure_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

 
