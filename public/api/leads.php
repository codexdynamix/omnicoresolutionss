<?php
/**
 * Omnicore Solutions - CRM Leads & Public Quote Requests API
 */

require_once __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$method = $_SERVER['REQUEST_METHOD'];

$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?: [];

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM omnicore_crm_leads ORDER BY created_at DESC");
            $leads = $stmt->fetchAll();
            jsonResponse(['success' => true, 'leads' => $leads]);
        } catch (Exception $e) {
            error_log("[Leads GET] " . $e->getMessage());
        }
    }

    $fallbackLeads = getJsonData('leads', []);
    jsonResponse(['success' => true, 'leads' => $fallbackLeads]);
}

if ($method === 'POST') {
    $id = trim($body['id'] ?? '') ?: ('LEAD-' . date('Ymd') . '-' . substr(bin2hex(random_bytes(4)), 0, 5));
    $name = trim($body['name'] ?? 'Inbound Client');
    $organization = trim($body['organization'] ?? '');
    $phone = trim($body['phone'] ?? '');
    $email = trim($body['email'] ?? '');
    $location = trim($body['location'] ?? 'Harare');
    $province = trim($body['province'] ?? 'Harare');
    $service = trim($body['service'] ?? 'Mining Equipment');
    $equipmentInterest = trim($body['equipmentInterest'] ?? $body['equipment_interest'] ?? '');
    $intent = trim($body['intent'] ?? 'Buy');
    $dealValue = floatval($body['dealValue'] ?? $body['deal_value'] ?? 10000);
    $priority = trim($body['priority'] ?? 'High');
    $stage = trim($body['stage'] ?? 'Lead');
    $notes = trim($body['notes'] ?? $body['message'] ?? '');
    $source = trim($body['source'] ?? 'website_quote_form');
    $timeline = json_encode([
        [
            'id' => 'tl-' . time(),
            'timestamp' => date('c'),
            'type' => 'inbound_request',
            'author' => 'System (Harare Desk)',
            'message' => 'New lead received via website: ' . ($notes ?: 'Interested in ' . ($service ?: 'machinery'))
        ]
    ]);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO omnicore_crm_leads 
                (id, name, organization, phone, email, location, province, service, equipment_interest, intent, deal_value, priority, stage, notes, timeline_json, source, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
                ON DUPLICATE KEY UPDATE 
                name = VALUES(name), organization = VALUES(organization), phone = VALUES(phone), 
                email = VALUES(email), notes = VALUES(notes), updated_at = NOW()
            ");
            $stmt->execute([
                $id, $name, $organization, $phone, $email, $location, $province, $service,
                $equipmentInterest, $intent, $dealValue, $priority, $stage, $notes, $timeline, $source
            ]);

            jsonResponse([
                'success' => true,
                'message' => 'Lead captured successfully',
                'leadId' => $id
            ], 201);
        } catch (Exception $e) {
            error_log("[Leads POST Error] " . $e->getMessage());
        }
    }

    // Flat file fallback
    $current = getJsonData('leads', []);
    $newLead = [
        'id' => $id,
        'name' => $name,
        'organization' => $organization,
        'phone' => $phone,
        'email' => $email,
        'location' => $location,
        'province' => $province,
        'service' => $service,
        'equipmentInterest' => $equipmentInterest,
        'intent' => $intent,
        'dealValue' => $dealValue,
        'priority' => $priority,
        'stage' => $stage,
        'notes' => $notes,
        'createdAt' => date('c'),
        'updatedAt' => date('c')
    ];
    array_unshift($current, $newLead);
    saveJsonData('leads', $current);

    jsonResponse(['success' => true, 'message' => 'Lead saved in local fallback', 'leadId' => $id], 201);
}

if ($method === 'PUT' || $method === 'PATCH') {
    $id = trim($body['id'] ?? $_GET['id'] ?? '');
    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Lead ID required'], 400);
    }

    if ($pdo) {
        try {
            $fields = [];
            $values = [];

            if (isset($body['stage'])) { $fields[] = "stage = ?"; $values[] = $body['stage']; }
            if (isset($body['priority'])) { $fields[] = "priority = ?"; $values[] = $body['priority']; }
            if (isset($body['dealValue']) || isset($body['deal_value'])) { 
                $fields[] = "deal_value = ?"; 
                $values[] = floatval($body['dealValue'] ?? $body['deal_value']); 
            }
            if (isset($body['notes'])) { $fields[] = "notes = ?"; $values[] = $body['notes']; }
            if (isset($body['name'])) { $fields[] = "name = ?"; $values[] = $body['name']; }
            if (isset($body['phone'])) { $fields[] = "phone = ?"; $values[] = $body['phone']; }
            if (isset($body['email'])) { $fields[] = "email = ?"; $values[] = $body['email']; }
            if (isset($body['location'])) { $fields[] = "location = ?"; $values[] = $body['location']; }
            if (isset($body['province'])) { $fields[] = "province = ?"; $values[] = $body['province']; }
            if (isset($body['timeline_json'])) { $fields[] = "timeline_json = ?"; $values[] = $body['timeline_json']; }

            if (!empty($fields)) {
                $fields[] = "updated_at = NOW()";
                $sql = "UPDATE omnicore_crm_leads SET " . implode(", ", $fields) . " WHERE id = ?";
                $values[] = $id;
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
                jsonResponse(['success' => true, 'message' => 'Lead updated successfully']);
            }
        } catch (Exception $e) {
            jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => true, 'message' => 'Lead updated in fallback mode']);
}

if ($method === 'DELETE') {
    $id = trim($body['id'] ?? $_GET['id'] ?? '');
    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Lead ID required'], 400);
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM omnicore_crm_leads WHERE id = ?");
            $stmt->execute([$id]);
            jsonResponse(['success' => true, 'message' => 'Lead deleted']);
        } catch (Exception $e) {
            jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => true, 'message' => 'Lead deleted']);
}

jsonResponse(['error' => 'Method not allowed'], 405);
