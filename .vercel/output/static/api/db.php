<?php
/**
 * Omnicore Solutions - Database Handler
 * Provides PDO connection with automatic MySQL table initialization
 * and resilient local data fallback when DB credentials are unconfigured.
 */

require_once __DIR__ . '/config.php';

function getDatabaseConnection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    // Try connecting to MySQL if DB_NAME is set and not default placeholder
    if (DB_NAME && DB_USER && DB_HOST) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            autoInitializeMySQL($pdo);
            return $pdo;
        } catch (PDOException $e) {
            // MySQL not accessible or not created yet - fall back gracefully
            error_log("[Omnicore API] MySQL connection failed: " . $e->getMessage() . " - switching to resilient storage");
        }
    }

    // Resilient Fallback: SQLite or Flat File Storage
    $dataDir = __DIR__ . '/data';
    if (!is_dir($dataDir)) {
        @mkdir($dataDir, 0755, true);
    }

    try {
        $sqlitePath = $dataDir . '/omnicore.sqlite';
        $pdo = new PDO("sqlite:" . $sqlitePath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        autoInitializeSQLite($pdo);
        return $pdo;
    } catch (Exception $e) {
        error_log("[Omnicore API] SQLite fallback failed: " . $e->getMessage());
        return null;
    }
}

function autoInitializeMySQL($pdo) {
    try {
        // Check if admin table exists
        $check = $pdo->query("SHOW TABLES LIKE 'omnicore_admin_users'");
        if ($check->rowCount() === 0) {
            $schemaFile = __DIR__ . '/schema.sql';
            if (file_exists($schemaFile)) {
                $sql = file_get_contents($schemaFile);
                $pdo->exec($sql);
            }
        }
    } catch (Exception $e) {
        error_log("[Omnicore API] MySQL auto-init note: " . $e->getMessage());
    }
}

function autoInitializeSQLite($pdo) {
    $sql = "
    CREATE TABLE IF NOT EXISTS omnicore_admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      full_name TEXT DEFAULT 'Operations Administrator',
      role TEXT DEFAULT 'Operations Lead',
      phone TEXT DEFAULT '+263 77 733 4569',
      yard_location TEXT DEFAULT '115 Chiremba Road, Cranborne, Harare',
      last_login TEXT,
      last_password_change TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS omnicore_crm_leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      organization TEXT,
      phone TEXT NOT NULL,
      email TEXT,
      location TEXT,
      province TEXT,
      service TEXT,
      equipment_interest TEXT,
      intent TEXT,
      deal_value REAL,
      priority TEXT,
      stage TEXT,
      notes TEXT,
      timeline_json TEXT,
      source TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS omnicore_equipment (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      spec TEXT,
      throughput TEXT,
      power TEXT,
      price TEXT,
      stock_status TEXT,
      blurb TEXT,
      image TEXT,
      gallery_json TEXT,
      is_featured INTEGER DEFAULT 1,
      is_archived INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS omnicore_deployments (
      id TEXT PRIMARY KEY,
      plant TEXT NOT NULL,
      category TEXT,
      sku TEXT,
      image TEXT,
      client TEXT,
      site TEXT,
      province TEXT,
      operator TEXT,
      daily_rate_usd REAL,
      status TEXT,
      start_date TEXT,
      scheduled_return TEXT,
      contract_ref TEXT,
      contact_person TEXT,
      contact_phone TEXT,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS omnicore_site_copy (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      config_key TEXT UNIQUE,
      content_json TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS omnicore_audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT,
      actor TEXT,
      details TEXT,
      ip_address TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    ";
    $pdo->exec($sql);

    // Seed default admin if missing
    $stmt = $pdo->query("SELECT COUNT(*) as cnt FROM omnicore_admin_users");
    $row = $stmt->fetch();
    if ($row && $row['cnt'] == 0) {
        $hash = password_hash('Admin123!', PASSWORD_BCRYPT);
        $insert = $pdo->prepare("INSERT INTO omnicore_admin_users (email, password_hash, full_name, role, phone, yard_location, last_password_change) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))");
        $insert->execute(['admin@omnicore.co.zw', $hash, 'Operations Administrator', 'Harare Operations & Inventory Lead', '+263 77 733 4569', '115 Chiremba Road, Cranborne, Harare']);
    }
}

/**
 * Resilient JSON fallback file helper if PDO is completely unavailable
 */
function getJsonData($filename, $default = []) {
    $file = __DIR__ . '/data/' . $filename . '.json';
    if (!file_exists($file)) {
        return $default;
    }
    $raw = file_get_contents($file);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function saveJsonData($filename, $data) {
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    $file = $dir . '/' . $filename . '.json';
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit();
}
