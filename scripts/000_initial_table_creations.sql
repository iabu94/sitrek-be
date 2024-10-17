-- Active: 1727601243418@@127.0.0.1@3306@sitrek_1
-- Roles master table
CREATE TABLE sitrek_roles (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE sitrek_permissions (
    id INT PRIMARY KEY,
    roleId INT,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (roleId) REFERENCES sitrek_roles(id)
)ENGINE=InnoDB;

CREATE TABLE sitrek_user_roles_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    roleId INT,
    permissionId INT,
    FOREIGN KEY (userId) REFERENCES josyd_users(id),
    FOREIGN KEY (roleId) REFERENCES sitrek_roles(id),
    FOREIGN KEY (permissionId) REFERENCES sitrek_permissions(id),
    UNIQUE INDEX unique_user_role (userId, roleId, permissionId)
)ENGINE=InnoDB;

-- # Seed Roles
INSERT INTO `sitrek_roles` (`id`, `name`, `description`) VALUES (99, 'super_admin', 'Super Admin');
INSERT INTO `sitrek_roles` (`id`, `name`, `description`) VALUES (1, 'crm_manager', 'CRM Manager');
INSERT INTO `sitrek_roles` (`id`, `name`, `description`) VALUES (2, 'branch_manager', 'Branch Manager');
INSERT INTO `sitrek_roles` (`id`, `name`, `description`) VALUES (3, 'sales_manager', 'Sales Manager');
INSERT INTO `sitrek_roles` (`id`, `name`, `description`) VALUES (4, 'finance_manager', 'Finance Manager');

-- # Seed Permissions
-- CRM Manager
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (1, 1, 'view_lead', 'View Leads');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (2, 1, 'create_lead', 'Create Leads');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (3, 1, 'update_lead', 'Update Leads');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (4, 1, 'delete_lead', 'Delete Leads');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (5, 1, 'view_customer', 'View Customers');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (6, 1, 'create_customer', 'Create Customers');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (7, 1, 'update_customer', 'Update Customers');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (8, 1, 'delete_customer', 'Delete Customers');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (9, 1, 'view_rate_card', 'View Rate Cards');

-- Branch Manager
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (10, 2, 'view_mdc', 'View MDC');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (11, 2, 'update_mdc', 'Update MDC');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (12, 2, 'view_bank_deposit', 'View Bank Deposits');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (13, 2, 'generate_submit_code', 'Generate Submit Code');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (14, 2, 'bank_deposit_update', 'Bank Deposit Update');

-- Sales Manager
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (15, 3, 'view_report', 'View Reports');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (16, 3, 'generate_report', 'Generate Report');

-- Finance Manager
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (17, 4, 'view_invoice', 'View Invoice');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (18, 4, 'create_invoice', 'Create Invoice');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (19, 4, 'search_invoice', 'Search Invoice');
INSERT INTO `sitrek_permissions` (`id`, `roleId`, `name`, `description`) VALUES (20, 4, 'barcode_conversion', 'Barcode Conversion');


CREATE TABLE sitrek_provinces (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

INSERT INTO sitrek_provinces (id, name) VALUES 
(1, 'Western'),
(2, 'Central'),
(3, 'Southern');

CREATE TABLE sitrek_districts (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provinceId INT NOT NULL,
    FOREIGN KEY (provinceId) REFERENCES sitrek_provinces(id)
) ENGINE=InnoDB;

INSERT INTO sitrek_districts (id, name, provinceId) VALUES 
(1, 'Colombo', 1),
(2, 'Gampaha', 1),
(3, 'Kalutara', 1),
(4, 'Kandy', 2),
(5, 'Matale', 2),
(6, 'Galle', 3);

CREATE TABLE sitrek_cities (
    id INT PRIMARY KEY,
    postalCode VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    districtId INT NOT NULL,
    FOREIGN KEY (districtId) REFERENCES sitrek_districts(id)
) ENGINE=InnoDB;

INSERT INTO sitrek_cities (id, postalCode, name, districtId) VALUES 
(1, '00100', 'Colombo 01', 1),
(2, '00100', 'Colombo 02', 1),
(3, '00100', 'Colombo 03', 1),
(4, '10100', 'Negombo', 2),
(5, '10200', 'Kalutara', 3),
(6, '20000', 'Kandy', 4),
(7, '21000', 'Matale', 5),
(8, '80000', 'Galle', 6);

CREATE TABLE sitrek_leads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ownerId INT NOT NULL,
    leadtype VARCHAR(255) NOT NULL,
    leadStatus VARCHAR(255) NOT NULL,
    salesPersonId INT NOT NULL,
    orgName VARCHAR(255) NOT NULL,
    orgIdType VARCHAR(255) NOT NULL,
    orgId VARCHAR(255) NOT NULL,
    addrTitles VARCHAR(255) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    addr1 VARCHAR(255) NOT NULL,
    addr2 VARCHAR(255) NOT NULL,
    cityId INT NOT NULL,
    provinceId INT NOT NULL,
    country VARCHAR(255) NOT NULL,
    contactNIC VARCHAR(255) NOT NULL,
    contactName VARCHAR(255) NOT NULL,
    contactDesignation VARCHAR(255) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contact1 VARCHAR(255) NOT NULL,
    contact2 VARCHAR(255) NOT NULL,
    adminFee DECIMAL(10,2) NOT NULL,
    adminFeeType VARCHAR(255) NOT NULL,
    vat DECIMAL(10,2) NOT NULL,
    sscl DECIMAL(10,2) NOT NULL,
    svat DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) NOT NULL,
    discountType VARCHAR(255) NOT NULL,
    startDate DATE NULL,
    endDate DATE NULL,
    FOREIGN KEY (salesPersonId) REFERENCES josyd_users(id),
    FOREIGN KEY (cityId) REFERENCES sitrek_cities(id),
    FOREIGN KEY (provinceId) REFERENCES sitrek_provinces(id),
    FOREIGN KEY (ownerId) REFERENCES josyd_users(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customerCode VARCHAR(255) NOT NULL UNIQUE,
    leadId INT NOT NULL,
    ownerId INT NOT NULL,
    leadtype VARCHAR(255) NOT NULL,
    leadStatus VARCHAR(255) NOT NULL,
    salesPersonId INT NOT NULL,
    orgName VARCHAR(255) NOT NULL,
    orgIdType VARCHAR(255) NOT NULL,
    orgId VARCHAR(255) NOT NULL,
    addrTitles VARCHAR(255) NOT NULL,
    isDeleted BOOLEAN NOT NULL DEFAULT FALSE,
    addr1 VARCHAR(255) NOT NULL,
    addr2 VARCHAR(255) NOT NULL,
    cityId INT NOT NULL,
    provinceId INT NOT NULL,
    country VARCHAR(255) NOT NULL,
    contactNIC VARCHAR(255) NOT NULL,
    contactName VARCHAR(255) NOT NULL,
    contactDesignation VARCHAR(255) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contact1 VARCHAR(255) NOT NULL,
    contact2 VARCHAR(255) NOT NULL,
    adminFee DECIMAL(10,2) NOT NULL,
    adminFeeType VARCHAR(255) NOT NULL,
    vat DECIMAL(10,2) NOT NULL,
    sscl DECIMAL(10,2) NOT NULL,
    svat DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) NOT NULL,
    discountType VARCHAR(255) NOT NULL,
    startDate DATE NULL,
    endDate DATE NULL,
    FOREIGN KEY (salesPersonId) REFERENCES josyd_users(id),
    FOREIGN KEY (cityId) REFERENCES sitrek_cities(id),
    FOREIGN KEY (provinceId) REFERENCES sitrek_provinces(id),
    FOREIGN KEY (ownerId) REFERENCES josyd_users(id),
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_rate_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    customerId INT NOT NULL,
    demarcation VARCHAR(255) NOT NULL,
    catogory VARCHAR(255) NOT NULL,
    paymentType VARCHAR(255) NOT NULL,
    initialRate DECIMAL NOT NULL,
    additionalRate DECIMAL NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (customerId) REFERENCES sitrek_customers(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_lead_notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    customerId INT NOT NULL,
    note TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (customerId) REFERENCES sitrek_customers(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_lead_followups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    customerId INT NOT NULL,
    contactDate DATE NOT NULL,
    contactById INT NOT NULL,
    note TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (contactById) REFERENCES josyd_users(id),
    FOREIGN KEY (customerId) REFERENCES sitrek_customers(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_lead_attachments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    customerId INT NOT NULL,
    fullUrl TEXT NOT NULL,
    verifiedById INT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (verifiedById) REFERENCES josyd_users(id),
    FOREIGN KEY (customerId) REFERENCES sitrek_customers(id)
) ENGINE=InnoDB;