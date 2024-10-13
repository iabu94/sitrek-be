-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 06, 2024 at 06:33 AM
-- Server version: 5.6.51
-- PHP Version: 8.1.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sitrek`
--

-- --------------------------------------------------------

--
-- Table structure for table `josyd_jsn_users`
--

DROP TABLE IF EXISTS `josyd_jsn_users`;
CREATE TABLE IF NOT EXISTS `josyd_jsn_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `privacy` text NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `secondname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `params` text NOT NULL,
  `facebook_id` varchar(200) NOT NULL,
  `twitter_id` varchar(255) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `linkedin_id` varchar(255) NOT NULL,
  `instagram_id` varchar(255) NOT NULL,
  `address` text,
  `phone_number` varchar(100) DEFAULT NULL,
  `nic` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=421 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `josyd_jsn_users`
--

INSERT INTO `josyd_jsn_users` (`id`, `privacy`, `firstname`, `secondname`, `lastname`, `avatar`, `params`, `facebook_id`, `twitter_id`, `google_id`, `linkedin_id`, `instagram_id`, `address`, `phone_number`, `nic`, `type`) VALUES
(420, 'private', 'John', 'Doe', 'Smith', 'avatar.jpg', '{\"theme\": \"dark\"}', 'john.doe.facebook', 'john.doe.twitter', 'john.doe@gmail.com', 'john.doe.linkedin', 'john.doe.instagram', '123 Main St, Cityville', '123-456-7890', '900000000V', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



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
INSERT INTO `josyd_users` (`id`, `name`, `username`, `email`, `password`, `block`, `sendEmail`, `registerDate`, `lastvisitDate`, `activation`, `params`, `lastResetTime`, `resetCount`, `otpKey`, `otep`, `requireReset`, `isBranchDefault`, `isAllowedToRS`, `isAllowedToRSDate`, `blockRSnRECP`, `isAllowedToRS2`, `isAllowedToRSDate2`) VALUES (420, 'Certis Courier P', 'Test', 'courier@certislanka.com', '$2y$10$FomWHZCf2y/WMpYYLPobNOYGrgsluxFEQhsFTWlsrDtqTbhK1TJIq', 0, 0, '2018-11-15 07:54:42', '2024-09-29 03:35:28', '373db432686f31e0e725629982aab94c', '{}', '0000-00-00 00:00:00', 0, '', '', 0, 0, 1, '2024-07-01', 0, 1, '2024-07-01');




CREATE TABLE `josyd_user_keys` ( 
  `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `user_id` VARCHAR(150) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `series` VARCHAR(191) NOT NULL,
  `invalid` TINYINT NOT NULL,
  `time` VARCHAR(200) NOT NULL,
  `uastring` VARCHAR(255) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`),
  CONSTRAINT `series` UNIQUE (`series`)
)
ENGINE = InnoDB;
CREATE INDEX `user_id` 
ON `josyd_user_keys` (
  `user_id` ASC
);
INSERT INTO `josyd_user_keys` (`id`, `user_id`, `token`, `series`, `invalid`, `time`, `uastring`) VALUES (7267, 'Test', '$2y$10$jJw5mYWTqpYi0DOsNqx66OjR.4tHXMdqt/SvyaDd/sQyc79naffGe', 'J87RQW2Hvf8BiE8aRIVa', 0, '1732764928', 'joomla_remember_me_b6e35cb6c10650034c02b96cdc66f0e9');


