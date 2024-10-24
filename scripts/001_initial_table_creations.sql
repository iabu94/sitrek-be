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

CREATE TABLE sitrek_provinces (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE sitrek_districts (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provinceId INT NOT NULL,
    FOREIGN KEY (provinceId) REFERENCES sitrek_provinces(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_cities (
    id INT PRIMARY KEY,
    postalCode VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    districtId INT NOT NULL,
    FOREIGN KEY (districtId) REFERENCES sitrek_districts(id)
) ENGINE=InnoDB;

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
    bankName VARCHAR(255) NULL,
    accountName VARCHAR(255) NULL,
    accountNumber INT(20) NULL,
    branchName VARCHAR(255) NULL,
    FOREIGN KEY (salesPersonId) REFERENCES josyd_users(id),
    FOREIGN KEY (cityId) REFERENCES sitrek_cities(id),
    FOREIGN KEY (provinceId) REFERENCES sitrek_provinces(id),
    FOREIGN KEY (ownerId) REFERENCES josyd_users(id),
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_rate_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    customerId INT NULL,
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
    customerId INT NULL,
    note TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (customerId) REFERENCES sitrek_customers(id)
) ENGINE=InnoDB;

CREATE TABLE sitrek_lead_followups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    customerId INT NULL,
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
    customerId INT NULL,
    fullUrl TEXT NOT NULL,
    verifiedById INT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (verifiedById) REFERENCES josyd_users(id),
    FOREIGN KEY (customerId) REFERENCES sitrek_customers(id)
) ENGINE=InnoDB;