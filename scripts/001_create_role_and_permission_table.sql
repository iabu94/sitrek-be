CREATE TABLE sitrek_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE sitrek_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roleId INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (roleId) REFERENCES sitrek_roles(id)
)ENGINE=InnoDB;

CREATE TABLE sitrek_user_roles_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    roleId INT,
    permissionId INT,
    FOREIGN KEY (userId) REFERENCES josyd_users(id),
    FOREIGN KEY (roleId) REFERENCES sitrek_roles(id),
    FOREIGN KEY (permissionId) REFERENCES sitrek_permissions(id)
)ENGINE=InnoDB;


#seed
INSERT INTO `sitrek_roles` (`id`, `name`) VALUES (NULL, 'SuperAdmin');
INSERT INTO `sitrek_roles` (`id`, `name`) VALUES (NULL, 'CRMManager');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`) VALUES (NULL, '2', 'add_leads');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`) VALUES (NULL, '2', 'edit_leads');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`) VALUES (NULL, '2', 'view_leads');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`) VALUES (NULL, '2', 'add_customer');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`) VALUES (NULL, '2', 'edit_customer');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`) VALUES (NULL, '2', 'view_customer');