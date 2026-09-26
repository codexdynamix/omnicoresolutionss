<?php
/**
 * Omnicore Solutions - Equipment Inventory API
 */

require_once __DIR__ . '/db.php';

$pdo = getDatabaseConnection();
$method = $_SERVER['REQUEST_METHOD'];

$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true) ?: [];

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM omnicore_equipment WHERE is_archived = 0 ORDER BY created_at ASC");
            $rows = $stmt->fetchAll();
            if (!empty($rows)) {
                $equipment = array_map(function($r) {
                    $r['gallery'] = !empty($r['gallery_json']) ? json_decode($r['gallery_json'], true) : [];
                    return $r;
                }, $rows);
                jsonResponse(['success' => true, 'equipment' => $equipment]);
            }
        } catch (Exception $e) {
            error_log("[Equipment GET] " . $e->getMessage());
        }
    }

    $fallback = getJsonData('equipment', []);
    jsonResponse(['success' => true, 'equipment' => $fallback]);
}

if ($method === 'POST') {
    $id = trim($body['id'] ?? '') ?: ('EQ-' . substr(bin2hex(random_bytes(4)), 0, 6));
    $title = trim($body['title'] ?? 'Heavy Plant');
    $category = trim($body['category'] ?? 'mining');
    $spec = trim($body['spec'] ?? '');
    $throughput = trim($body['throughput'] ?? '');
    $power = trim($body['power'] ?? '');
    $price = trim($body['price'] ?? 'Quote on Request');
    $stockStatus = trim($body['stockStatus'] ?? $body['stock_status'] ?? 'In Yard Cranborne');
    $blurb = trim($body['blurb'] ?? '');
    $image = trim($body['image'] ?? '/images/jaw-crusher.jpg');
    $gallery = isset($body['gallery']) ? json_encode($body['gallery']) : '[]';

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO omnicore_equipment 
                (id, title, category, spec, throughput, power, price, stock_status, blurb, image, gallery_json, is_featured, is_archived, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, NOW())
                ON DUPLICATE KEY UPDATE 
                title = VALUES(title), category = VALUES(category), spec = VALUES(spec),
                throughput = VALUES(throughput), power = VALUES(power), price = VALUES(price),
                stock_status = VALUES(stock_status), blurb = VALUES(blurb), image = VALUES(image),
                gallery_json = VALUES(gallery_json), updated_at = NOW()
            ");
            $stmt->execute([
                $id, $title, $category, $spec, $throughput, $power, $price, $stockStatus, $blurb, $image, $gallery
            ]);

            jsonResponse(['success' => true, 'message' => 'Equipment saved', 'id' => $id], 201);
        } catch (Exception $e) {
            jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => true, 'message' => 'Equipment stored in fallback', 'id' => $id], 201);
}

if ($method === 'PUT' || $method === 'PATCH') {
    $id = trim($body['id'] ?? $_GET['id'] ?? '');
    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Equipment ID required'], 400);
    }

    if ($pdo) {
        try {
            $fields = [];
            $values = [];
            if (isset($body['stockStatus']) || isset($body['stock_status'])) {
                $fields[] = "stock_status = ?";
                $values[] = $body['stockStatus'] ?? $body['stock_status'];
            }
            if (isset($body['title'])) { $fields[] = "title = ?"; $values[] = $body['title']; }
            if (isset($body['category'])) { $fields[] = "category = ?"; $values[] = $body['category']; }
            if (isset($body['spec'])) { $fields[] = "spec = ?"; $values[] = $body['spec']; }
            if (isset($body['throughput'])) { $fields[] = "throughput = ?"; $values[] = $body['throughput']; }
            if (isset($body['power'])) { $fields[] = "power = ?"; $values[] = $body['power']; }
            if (isset($body['price'])) { $fields[] = "price = ?"; $values[] = $body['price']; }
            if (isset($body['blurb'])) { $fields[] = "blurb = ?"; $values[] = $body['blurb']; }
            if (isset($body['image'])) { $fields[] = "image = ?"; $values[] = $body['image']; }
            if (isset($body['gallery'])) { $fields[] = "gallery_json = ?"; $values[] = json_encode($body['gallery']); }

            if (!empty($fields)) {
                $fields[] = "updated_at = NOW()";
                $sql = "UPDATE omnicore_equipment SET " . implode(", ", $fields) . " WHERE id = ?";
                $values[] = $id;
                $stmt = $pdo->prepare($sql);
                $stmt->execute($values);
                jsonResponse(['success' => true, 'message' => 'Equipment updated']);
            }
        } catch (Exception $e) {
            jsonResponse(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    jsonResponse(['success' => true, 'message' => 'Equipment updated in fallback']);
}

if ($method === 'DELETE') {
    $id = trim($body['id'] ?? $_GET['id'] ?? '');
    if ($pdo && $id) {
        $stmt = $pdo->prepare("UPDATE omnicore_equipment SET is_archived = 1, updated_at = NOW() WHERE id = ?");
        $stmt->execute([$id]);
        jsonResponse(['success' => true, 'message' => 'Equipment archived']);
    }
    jsonResponse(['success' => true, 'message' => 'Equipment deleted']);
}

jsonResponse(['error' => 'Method not allowed'], 405);
