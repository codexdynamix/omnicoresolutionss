-- ========================================================
-- Omnicore Solutions - Production MySQL Database Schema
-- Compatible with Hostinger MySQL (MariaDB / MySQL 8.x)
-- ========================================================

SET NAMES utf8mb4;
SET time_zone = '+02:00'; -- Harare (CAT) Timezone
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- --------------------------------------------------------
-- Table structure for `omnicore_admin_users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `omnicore_admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(191) NOT NULL DEFAULT 'Operations Administrator',
  `role` VARCHAR(100) NOT NULL DEFAULT 'Operations Lead',
  `phone` VARCHAR(50) DEFAULT '+263 77 733 4569',
  `yard_location` VARCHAR(191) DEFAULT '115 Chiremba Road, Cranborne, Harare',
  `last_login` DATETIME NULL,
  `last_password_change` DATETIME NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed for Administrator (Default Password: Admin123! - Can be changed via Admin Profile)
-- Password hash generated with password_hash('Admin123!', PASSWORD_BCRYPT)
INSERT INTO `omnicore_admin_users` (`id`, `email`, `password_hash`, `full_name`, `role`, `phone`, `yard_location`, `last_password_change`)
VALUES (1, 'admin@omnicore.co.zw', '$2y$10$wO3R0Qn.4gL1oF7.5/U5uO2rK8q.6C5y8N7x1B0e9D4f3A2c1E6y.', 'Operations Administrator', 'Harare Operations & Inventory Lead', '+263 77 733 4569', '115 Chiremba Road, Cranborne, Harare', NOW())
ON DUPLICATE KEY UPDATE `email` = `email`;

-- --------------------------------------------------------
-- Table structure for `omnicore_crm_leads`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `omnicore_crm_leads` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(191) NOT NULL,
  `organization` VARCHAR(191) DEFAULT '',
  `phone` VARCHAR(64) NOT NULL,
  `email` VARCHAR(191) DEFAULT '',
  `location` VARCHAR(191) DEFAULT 'Harare',
  `province` VARCHAR(100) DEFAULT 'Harare',
  `service` VARCHAR(100) DEFAULT 'Mining Equipment',
  `equipment_interest` VARCHAR(191) DEFAULT '',
  `intent` VARCHAR(20) DEFAULT 'Buy',
  `deal_value` DECIMAL(12,2) DEFAULT 0.00,
  `priority` VARCHAR(20) DEFAULT 'High',
  `stage` VARCHAR(30) DEFAULT 'Lead',
  `notes` TEXT NULL,
  `timeline_json` LONGTEXT NULL,
  `source` VARCHAR(50) DEFAULT 'website_quote',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_stage` (`stage`),
  INDEX `idx_province` (`province`),
  INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `omnicore_equipment`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `omnicore_equipment` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(191) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `spec` VARCHAR(255) DEFAULT '',
  `throughput` VARCHAR(100) DEFAULT '',
  `power` VARCHAR(100) DEFAULT '',
  `price` VARCHAR(100) DEFAULT 'Quote on Request',
  `stock_status` VARCHAR(100) DEFAULT 'In Yard Cranborne',
  `blurb` TEXT NULL,
  `image` VARCHAR(255) DEFAULT '',
  `gallery_json` LONGTEXT NULL,
  `is_featured` TINYINT(1) DEFAULT 1,
  `is_archived` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_stock` (`stock_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `omnicore_deployments`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `omnicore_deployments` (
  `id` VARCHAR(64) PRIMARY KEY,
  `plant` VARCHAR(191) NOT NULL,
  `category` VARCHAR(50) DEFAULT 'hire',
  `sku` VARCHAR(100) DEFAULT '',
  `image` VARCHAR(255) DEFAULT '',
  `client` VARCHAR(191) NOT NULL,
  `site` VARCHAR(191) NOT NULL,
  `province` VARCHAR(100) DEFAULT 'Harare',
  `operator` VARCHAR(100) DEFAULT '',
  `daily_rate_usd` DECIMAL(10,2) DEFAULT 0.00,
  `status` VARCHAR(100) DEFAULT 'Active on Site',
  `start_date` DATE NOT NULL,
  `scheduled_return` DATE NOT NULL,
  `contract_ref` VARCHAR(100) DEFAULT '',
  `contact_person` VARCHAR(191) DEFAULT '',
  `contact_phone` VARCHAR(64) DEFAULT '',
  `notes` TEXT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_deploy_status` (`status`),
  INDEX `idx_deploy_province` (`province`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `omnicore_site_copy`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `omnicore_site_copy` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `config_key` VARCHAR(64) NOT NULL UNIQUE,
  `content_json` LONGTEXT NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `omnicore_audit_log`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `omnicore_audit_log` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `event_type` VARCHAR(64) NOT NULL,
  `actor` VARCHAR(191) NOT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET foreign_key_checks = 1;
