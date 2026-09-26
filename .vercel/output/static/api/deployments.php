<?php
/**
 * Omnicore Solutions - Field Deployments & Hire Plant API
 */

require_once __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$method = $_SERVER['REQUEST_METHOD'];

$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?: [];

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM omnicore_deployments ORDER BY start_date DESC");
            $rows = $stmt->fetchAll();
            jsonResponse(['success' => true, 'deployments' => $rows]);
        } catch (Exception $e) {
            error_log("[Deployments GET] " . $e->getMessage());
        }
    }

    $fallback = getJsonData('deployments', []);
    jsonResponse(['success' => true, 'deployments' => $fallback]);
}

if ($method === 'POST') {
    $id = trim($body['id'] ?? '') ?: ('DEP-' . date('Y') . '-' . substr(bin2hex(random_bytes(3)), 0, 4));
    $plant = trim($body['plant'] ?? 'Hire Machinery');
    $category = trim($body['category'] ?? 'hire');
    $sku = trim($body['sku'] ?? '');
    $image = trim($body['image'] ?? '/images/excavator.jpg');
    $client = trim($body['client'] ?? 'Client Site');
    $site = trim($body['site'] ?? 'Harare');
    $province = trim($body['province'] ?? 'Harare');
    $operator = trim($body['operator'] ?? 'Wet Rate');
    $dailyRateUsd = floatval($body['dailyRateUSD'] ?? $body['daily_rate_usd'] ?? 0);
    $status = trim($body['status'] ?? 'Active on Site');
    $startDate = trim($body['startDate'] ?? $body['start_date'] ?? date('Y-m-d'));
    $scheduledReturn = trim($body['scheduledReturn'] ?? $body['scheduled_return'] ?? date('Y-m-d', strtotime('+30 days')));
    $contractRef = trim($body['contractRef'] ?? $body['contract_ref'] ?? '');
    $contactPerson = trim($body['contactPerson'] ?? $body['contact_person'] ?? '');
    $contactPhone = trim($body['contactPhone'] ?? $body['contact_phone'] ?? '');
    $notes = trim($body['notes'] ?? '');

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO omnicore_deployments
                (id, plant, category, sku, image, client, site, province, operator, daily_rate_usd, status, start_date, scheduled_return, contract_ref, contact_person, contact_phone, notes, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
                ON DUPLICATE KEY UPDATE
                plant = VALUES(plant), client = VALUES(client), site = VALUES(site), status = VALUES(status), updated_at = NOW()
            ");
            $stmt->execute([
                $id, $plant, $category, $sku, $image, $client, $site, $province, $operator,
                $dailyRateUsd, $status, $startDate, $scheduledReturn, $contractRef, $contactPerson, $contactPhone, $notes
            ]);
            jsonResponse(['success' => true, 'message' => 'Deployment record saved', 'id' => $id], 201);
        } catch (Exception $e) {
            jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => true, 'message' => 'Saved in fallback', 'id' => $id], 201);
}

if ($method === 'DELETE') {
    $id = trim($body['id'] ?? $_GET['id'] ?? '');
    if ($pdo && $id) {
        $stmt = $pdo->prepare("DELETE FROM omnicore_deployments WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['success' => true, 'message' => 'Deployment deleted']);
    }
    jsonResponse(['success' => true, 'message' => 'Deleted']);
}

jsonResponse(['error' => 'Method not allowed'], 405);
