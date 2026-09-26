<?php
/**
 * Omnicore Solutions - Hostinger Database Setup & Diagnostic Tool
 * Access via: https://yourdomain.com/api/setup.php
 */

require_once __DIR__ . '/config.php';

$message = '';
$status = 'info';
$pdo = null;
$dbError = null;

// Attempt DB connection
if (DB_NAME && DB_USER && DB_HOST) {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $e) {
        $dbError = $e->getMessage();
    }
}

// Handle 1-click Install Schema Action
if (isset($_POST['install_schema']) && $pdo) {
    try {
        $schemaFile = __DIR__ . '/schema.sql';
        if (file_exists($schemaFile)) {
            $sql = file_get_contents($schemaFile);
            $pdo->exec($sql);
            $message = "Database tables installed and seeded successfully on Hostinger MySQL!";
            $status = "success";
        } else {
            $message = "schema.sql file not found in /api directory.";
            $status = "error";
        }
    } catch (Exception $e) {
        $message = "Error installing tables: " . $e->getMessage();
        $status = "error";
    }
}

// Check Table Status
$tables = [];
if ($pdo) {
    $expected = ['omnicore_admin_users', 'omnicore_crm_leads', 'omnicore_equipment', 'omnicore_deployments', 'omnicore_site_copy', 'omnicore_audit_log'];
    foreach ($expected as $t) {
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM `$t`");
            $row = $stmt->fetch();
            $tables[$t] = $row ? $row['count'] : 0;
        } catch (Exception $e) {
            $tables[$t] = 'Not Created';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Omnicore Solutions - Hostinger Database Setup</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #F5F5F7; color: #1D1D1F; margin: 0; padding: 40px 20px; line-height: 1.5; }
        .container { max-width: 680px; margin: 0 auto; background: white; border-radius: 24px; padding: 36px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.08); }
        h1 { font-size: 24px; margin-top: 0; font-weight: 700; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
        .badge-success { background: #E8F8EE; color: #1B833E; }
        .badge-warning { background: #FFF4E5; color: #B25E00; }
        .badge-error { background: #FDE8E8; color: #9B1C1C; }
        .box { background: #F9F9FB; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 18px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px; }
        th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        th { font-size: 12px; text-transform: uppercase; color: #86868B; }
        button, .btn { background: #1D1D1F; color: white; border: none; border-radius: 12px; padding: 12px 24px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
        button:hover, .btn:hover { background: #000; }
        .alert { padding: 14px 18px; border-radius: 14px; margin-bottom: 20px; font-size: 14px; }
        .alert-success { background: #E8F8EE; color: #1B833E; border: 1px solid #C4F0D2; }
        .alert-error { background: #FDE8E8; color: #9B1C1C; border: 1px solid #F8B4B4; }
        code { background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 6px; font-size: 13px; font-family: monospace; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Omnicore Solutions · Hostinger Setup</h1>
        <p style="color: #6E6E73; font-size: 14px;">PHP Backend & MySQL Database Diagnostic for Cranborne Yard Operations Desk</p>

        <?php if ($message): ?>
            <div class="alert alert-<?php echo $status; ?>"><?php echo htmlspecialchars($message); ?></div>
        <?php endif; ?>

        <div class="box">
            <h3 style="margin-top: 0; font-size: 16px;">Environment & PHP Health</h3>
            <p><strong>PHP Version:</strong> <?php echo phpversion(); ?> <span class="badge badge-success">Compatible</span></p>
            <p><strong>PDO MySQL Driver:</strong> <?php echo extension_loaded('pdo_mysql') ? '<span class="badge badge-success">Loaded</span>' : '<span class="badge badge-error">Missing</span>'; ?></p>
            <p><strong>Configured DB Host:</strong> <code><?php echo htmlspecialchars(DB_HOST); ?></code></p>
            <p><strong>Configured DB Name:</strong> <code><?php echo htmlspecialchars(DB_NAME); ?></code></p>
        </div>

        <div class="box">
            <h3 style="margin-top: 0; font-size: 16px;">Hostinger MySQL Connection</h3>
            <?php if ($pdo): ?>
                <p><span class="badge badge-success">Connected Successfully</span> Hostinger MySQL is online and accepting queries.</p>
                <table>
                    <thead>
                        <tr><th>Database Table</th><th>Row Count</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        <?php foreach ($tables as $t => $cnt): ?>
                        <tr>
                            <td><code><?php echo htmlspecialchars($t); ?></code></td>
                            <td><?php echo htmlspecialchars($cnt); ?></td>
                            <td>
                                <?php if ($cnt === 'Not Created'): ?>
                                    <span class="badge badge-warning">Missing</span>
                                <?php else: ?>
                                    <span class="badge badge-success">Ready</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>

                <form method="POST" style="margin-top: 20px;">
                    <button type="submit" name="install_schema" value="1">Run / Re-initialize Database Tables</button>
                </form>
            <?php else: ?>
                <p><span class="badge badge-error">Not Connected to MySQL</span></p>
                <p style="color: #9B1C1C; font-size: 13px;"><?php echo htmlspecialchars($dbError ?: 'Could not connect with current settings'); ?></p>
                <p style="font-size: 13px; color: #6E6E73;">To connect to Hostinger MySQL, create a database in Hostinger hPanel and edit <code>/api/config.php</code> or create <code>/api/db_config.local.php</code> with your Hostinger DB user, name, and password.</p>
                <p style="font-size: 13px; color: #1B833E;"><strong>Note:</strong> In the meantime, the site functions safely in resilient offline/fallback storage mode.</p>
            <?php endif; ?>
        </div>

        <div style="margin-top: 24px; text-align: center;">
            <a href="/admin" class="btn" style="background: #3D4F66;">Open Admin Backoffice</a>
            <a href="/" class="btn" style="background: #86868B; margin-left: 10px;">Visit Main Website</a>
        </div>
    </div>
</body>
</html>
