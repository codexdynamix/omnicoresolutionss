<?php
/**
 * Omnicore Solutions - CMS Site Copy API
 */

require_once __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$method = $_SERVER['REQUEST_METHOD'];

$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?: [];

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("SELECT content_json FROM omnicore_site_copy WHERE config_key = 'main_site' LIMIT 1");
            $stmt->execute();
            $row = $stmt->fetch();
            if ($row && !empty($row['content_json'])) {
                jsonResponse(['success' => true, 'siteCopy' => json_decode($row['content_json'], true)]);
            }
        } catch (Exception $e) {
            error_log("[CMS GET] " . $e->getMessage());
        }
    }

    $fallback = getJsonData('site_copy', null);
    jsonResponse(['success' => true, 'siteCopy' => $fallback]);
}

if ($method === 'POST' || $method === 'PUT') {
    $content = $body['siteCopy'] ?? $body;
    if (empty($content) || !is_array($content)) {
        jsonResponse(['success' => false, 'error' => 'Invalid site copy data payload'], 400);
    }

    $jsonStr = json_encode($content, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO omnicore_site_copy (config_key, content_json, updated_at) 
                VALUES ('main_site', ?, NOW())
                ON DUPLICATE KEY UPDATE content_json = VALUES(content_json), updated_at = NOW()
            ");
            $stmt->execute([$jsonStr]);
            jsonResponse(['success' => true, 'message' => 'Site copy published live to MySQL database']);
        } catch (Exception $e) {
            jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    saveJsonData('site_copy', $content);
    jsonResponse(['success' => true, 'message' => 'Site copy saved in local fallback']);
}

jsonResponse(['error' => 'Method not allowed'], 405);
