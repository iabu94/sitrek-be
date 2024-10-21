CREATE TABLE `josyd_users` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(400) NOT NULL DEFAULT '' ,
  `username` VARCHAR(150) NOT NULL DEFAULT '' ,
  `email` VARCHAR(100) NOT NULL DEFAULT '' ,
  `password` VARCHAR(100) NOT NULL DEFAULT '' ,
  `block` TINYINT NOT NULL DEFAULT 0 ,
  `sendEmail` TINYINT NULL DEFAULT 0 ,
  `registerDate` DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00' ,
  `lastvisitDate` DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00' ,
  `activation` VARCHAR(100) NOT NULL DEFAULT '' ,
  `params` TEXT NOT NULL,
  `lastResetTime` DATETIME NOT NULL DEFAULT '0000-00-00 00:00:00'  COMMENT 'Date of last password reset' ,
  `resetCount` INT NOT NULL DEFAULT 0  COMMENT 'Count of password resets since lastResetTime' ,
  `otpKey` VARCHAR(1000) NOT NULL DEFAULT ''  COMMENT 'Two factor authentication encrypted keys' ,
  `otep` VARCHAR(1000) NOT NULL DEFAULT ''  COMMENT 'One time emergency passwords' ,
  `requireReset` TINYINT NOT NULL DEFAULT 0  COMMENT 'Require user to reset password on next login' ,
  `isBranchDefault` TINYINT NOT NULL DEFAULT 0 ,
  `isAllowedToRS` TINYINT NOT NULL DEFAULT 0 ,
  `isAllowedToRSDate` DATE NOT NULL DEFAULT '0000-00-00' ,
  `blockRSnRECP` TINYINT NOT NULL DEFAULT 0 ,
  `isAllowedToRS2` TINYINT NOT NULL DEFAULT 0 ,
  `isAllowedToRSDate2` DATE NOT NULL DEFAULT '0000-00-00' ,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`),
  CONSTRAINT `idx_username` UNIQUE (`username`)
)
ENGINE = InnoDB;
CREATE INDEX `email` 
ON `josyd_users` (
  `email` ASC
);
CREATE INDEX `id` 
ON `josyd_users` (
  `id` ASC
);
CREATE INDEX `idx_block` 
ON `josyd_users` (
  `block` ASC
);
CREATE INDEX `idx_name` 
ON `josyd_users` (
  `name` ASC
);
