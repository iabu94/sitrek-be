-- Create table for provinces
CREATE TABLE sitrek_provinces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Insert data into sitrek_provinces
INSERT INTO sitrek_provinces (id, name) VALUES 
(NULL, 'Western'),
(NULL, 'Central'),
(NULL, 'Southern');

-- Create table for districts
CREATE TABLE sitrek_districts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    provinceId INT NOT NULL,
    FOREIGN KEY (provinceId) REFERENCES sitrek_provinces(id)
) ENGINE=InnoDB;

-- Insert data into sitrek_districts
INSERT INTO sitrek_districts (id, name, provinceId) VALUES 
(NULL, 'Colombo', 1),
(NULL, 'Gampaha', 1),
(NULL, 'Kalutara', 1),
(NULL, 'Kandy', 2),
(NULL, 'Matale', 2),
(NULL, 'Galle', 3);

-- Create table for cities
CREATE TABLE sitrek_cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    postalCode VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    districtId INT NOT NULL,
    FOREIGN KEY (districtId) REFERENCES sitrek_districts(id)
) ENGINE=InnoDB;

-- Insert data into sitrek_cities
INSERT INTO sitrek_cities (id, postalCode, name, districtId) VALUES 
(NULL, '00100', 'Colombo 01', 1),
(NULL, '00100', 'Colombo 02', 1),
(NULL, '00100', 'Colombo 03', 1),
(NULL, '10100', 'Negombo', 2),
(NULL, '10200', 'Kalutara', 3),
(NULL, '20000', 'Kandy', 4),
(NULL, '21000', 'Matale', 5),
(NULL, '80000', 'Galle', 6);

-- Create table for leads
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

-- Dummy data for sitrek_leads (Note: Modify based on the real salesperson ID from josyd_users table)
INSERT INTO sitrek_leads (id, ownerId, leadtype, leadStatus, salesPersonId, orgName, orgIdType, orgId, addrTitles, addr1, addr2, cityId, provinceId, country, contactNIC, contactName, contactDesignation, contactEmail, contact1, contact2, adminFee, adminFeeType, vat, svat, sscl, discount, discountType, startDate, endDate) VALUES (NULL, 420, 'Corporate', 'Active', 420, 'ABC Company', 'Business Registration', '123456789', 'No 123', 'Galle Road', 'Colombo 03', 1, 1, 'Sri Lanka', '123456789V', 'John Doe', 'CEO', '123456789','123456789','123456789', 1000.00, 'Monthly', 0.00, 0.00, 0.00 ,0.00 , 'Percentage', '2024-01-01', '2024-12-31');
-- Create table for rate cards
CREATE TABLE sitrek_rate_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    demarcation VARCHAR(255) NOT NULL,
    catogory VARCHAR(255) NOT NULL,
    paymentType VARCHAR(255) NOT NULL,
    initialRate DECIMAL NOT NULL,
    additionalRate DECIMAL NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id)
) ENGINE=InnoDB;


-- Dummy data for sitrek_rate_cards
INSERT INTO sitrek_rate_cards (id, leadId, demarcation, catogory, paymentType, initialRate, additionalRate) VALUES
(NULL, 1, 'Colombo 1 - 15', 'FLOWERS', 'Monthly', 300.00, 100.00)


CREATE TABLE sitrek_lead_notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    note TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id)
) ENGINE=InnoDB;

-- Dummy data for sitrek_lead_notes

INSERT INTO sitrek_lead_notes (id, leadId, note, title) VALUES
(NULL, 1, 'This is a note for the lead with ID 1', 'title');


CREATE TABLE sitrek_lead_followups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    contactDate DATE NOT NULL,
    contactById INT NOT NULL,
    note TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (contactById) REFERENCES josyd_users(id)
) ENGINE=InnoDB;


-- Dummy data for sitrek_lead_followups
INSERT INTO sitrek_lead_followups (id, leadId, contactDate, contactById, note, status) VALUES
(NULL, 1, '2024-01-01', 420, 'Follow up note for lead with ID 1', 'Completed');


CREATE TABLE sitrek_lead_attachments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    leadId INT NOT NULL,
    fullUrl TEXT NOT NULL,
    verifiedById INT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (leadId) REFERENCES sitrek_leads(id),
    FOREIGN KEY (verifiedById) REFERENCES josyd_users(id)
) ENGINE=InnoDB;