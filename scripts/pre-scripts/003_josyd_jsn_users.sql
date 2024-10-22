CREATE TABLE `josyd_jsn_users` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `privacy` TEXT NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `secondname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  `params` TEXT NOT NULL,
  `facebook_id` VARCHAR(200) NOT NULL,
  `twitter_id` VARCHAR(255) NOT NULL,
  `google_id` VARCHAR(255) NOT NULL,
  `linkedin_id` VARCHAR(255) NOT NULL,
  `instagram_id` VARCHAR(255) NOT NULL,
  `address` TEXT NULL,
  `phone_number` VARCHAR(100) NULL,
  `nic` VARCHAR(255) NULL,
  `type` VARCHAR(255) NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
)
ENGINE = InnoDB;
