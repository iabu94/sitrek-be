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
