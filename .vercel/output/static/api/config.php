<?php
/**
 * Omnicore Solutions - Database Configuration
 * Hostinger MySQL / Apache Environment
 * 
 * Instructions for Hostinger:
 * 1. In Hostinger hPanel -> Databases -> MySQL Databases:
 *    Create a database (e.g. u123456789_omnicore) and user.
 * 2. Fill in the credentials below or create a file named `db_config.local.php`.
 */

// Allow local overrides if present
if (file_exists(__DIR__ . '/db_config.local.php')) {
    require_once __DIR__ . '/db_config.local.php';
}

// Database Connection Settings (fallback to environment variables or defaults)
if (!defined('DB_HOST')) {
    define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
}
if (!defined('DB_NAME')) {
    define('DB_NAME', getenv('DB_NAME') ?: 'omnicore_db');
}
if (!defined('DB_USER')) {
    define('DB_USER', getenv('DB_USER') ?: 'root');
}
if (!defined('DB_PASS')) {
    define('DB_PASS', getenv('DB_PASS') ?: '');
}
if (!defined('DB_PORT')) {
    define('DB_PORT', getenv('DB_PORT') ?: '3306');
}

// Admin Security Salt / Secret Key
if (!defined('AUTH_SECRET')) {
    define('AUTH_SECRET', getenv('AUTH_SECRET') ?: 'omnicore-secure-salt-harare-2026');
}

// Enable CORS for API requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
