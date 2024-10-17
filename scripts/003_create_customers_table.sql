CREATE TABLE sitrek_customers (
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

-- Alter sitrek_lead_notes table to add customerId foreign key, allowing NULL values
ALTER TABLE sitrek_lead_notes
ADD COLUMN customerId INT NULL,
ADD FOREIGN KEY (customerId) REFERENCES sitrek_customers(id);
-- Alter sitrek_lead_followups table to add customerId foreign key, allowing NULL values
ALTER TABLE sitrek_lead_followups
ADD COLUMN customerId INT NULL,
ADD FOREIGN KEY (customerId) REFERENCES sitrek_customers(id);

-- Alter sitrek_lead_attachments table to add customerId foreign key, allowing NULL values
ALTER TABLE sitrek_lead_attachments
ADD COLUMN customerId INT NULL,
ADD FOREIGN KEY (customerId) REFERENCES sitrek_customers(id);


ALTER TABLE sitrek_rate_cards
ADD COLUMN customerId INT NULL,
ADD FOREIGN KEY (customerId) REFERENCES sitrek_customers(id);

ALTER TABLE sitrek_customers
ADD COLUMN customerCode VARCHAR(255) NOT NULL,
ADD UNIQUE (customerCode);

ALTER TABLE sitrek_customers
ADD leadId INT NOT NULL,
ADD FOREIGN KEY (leadId) REFERENCES sitrek_leads(id);



