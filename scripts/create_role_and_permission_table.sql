CREATE TABLE sitrek_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE sitrek_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roleId INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (roleId) REFERENCES sitrek_roles(id) ON DELETE CASCADE
);

CREATE TABLE sitrek_user_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    roleId INT,
    permissionId INT,
    FOREIGN KEY (roleId) REFERENCES sitrek_roles(id),
    FOREIGN KEY (permissionId) REFERENCES sitrek_permissions(id),
    FOREIGN KEY (userId) REFERENCES josyd_users(id)
);