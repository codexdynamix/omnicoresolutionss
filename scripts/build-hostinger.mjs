import { execSync, spawn } from "node:child_process";
import { existsSync, cpSync, mkdirSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { resolve, join, dirname } from "node:path";

console.log("[build:hostinger] Starting production build for Hostinger...");

const distDir = resolve("dist");

// 1. Clean existing dist directory
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true });
}
mkdirSync(distDir, { recursive: true });

// 2. Run Vite build to generate client assets and bundles
console.log("[build:hostinger] Running Vite production build...");
execSync("npx vite build", { stdio: "inherit" });

// 3. Copy static assets from build output
const staticOutput = resolve(".vercel/output/static");
if (existsSync(staticOutput)) {
  console.log("[build:hostinger] Copying static build output to dist/ ...");
  cpSync(staticOutput, distDir, { recursive: true });
}

// 4. Copy all public assets (images, logos, favicon, and PHP API)
const publicDir = resolve("public");
if (existsSync(publicDir)) {
  console.log("[build:hostinger] Copying public assets and PHP API to dist/ ...");
  cpSync(publicDir, distDir, { recursive: true });
}

// 5. Detect latest production JS and CSS bundles
const assetsDir = join(distDir, "assets");
let mainJsFile = "";
let mainCssFile = "";

if (existsSync(assetsDir)) {
  const assetFiles = readdirSync(assetsDir);
  const jsCandidates = assetFiles.filter((f) => f.startsWith("index-") && f.endsWith(".js"));
  if (jsCandidates.length > 0) {
    mainJsFile = jsCandidates[jsCandidates.length - 1];
  } else {
    const anyJs = assetFiles.find((f) => f.endsWith(".js") && !f.includes("chunk"));
    mainJsFile = anyJs || "index.js";
  }

  const cssCandidates = assetFiles.filter((f) => f.startsWith("styles-") && f.endsWith(".css"));
  if (cssCandidates.length > 0) {
    mainCssFile = cssCandidates[cssCandidates.length - 1];
  } else {
    const anyCss = assetFiles.find((f) => f.endsWith(".css"));
    mainCssFile = anyCss || "styles.css";
  }
}

console.log(`[build:hostinger] Detected production bundles: JS=${mainJsFile}, CSS=${mainCssFile}`);

// 6. Prerender all site routes
const ROUTES = [
  "/",
  "/catalogue",
  "/services",
  "/services/mining",
  "/services/hardware",
  "/services/hire",
  "/services/farming",
  "/services/industry",
  "/contact",
  "/quote",
  "/projects",
  "/insights",
  "/insights/hammer-mill-zimbabwe",
  "/insights/gold-processing-payback",
  "/insights/rainy-season-construction-hire",
  "/insights/feed-pellets-second-income",
  "/insights/fence-making-business-zimbabwe",
  "/admin",
];

async function isServerRunning(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function ensureLocalServer() {
  const checkUrl = "http://127.0.0.1:3000/";
  if (await isServerRunning(checkUrl)) {
    console.log("[build:hostinger] Found active server on http://127.0.0.1:3000");
    return { process: null, baseUrl: "http://127.0.0.1:3000" };
  }

  console.log("[build:hostinger] Starting temporary server to pre-render static HTML pages...");
  const child = spawn("node", ["scripts/with-app-env.mjs", "vite", "dev", "--host", "127.0.0.1", "--port", "3000"], {
    stdio: "ignore",
    detached: true,
  });

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 400));
    if (await isServerRunning(checkUrl)) {
      console.log("[build:hostinger] Temporary server ready on http://127.0.0.1:3000");
      return { process: child, baseUrl: "http://127.0.0.1:3000" };
    }
  }

  throw new Error("Could not start local rendering server for Hostinger pre-rendering.");
}

function processHtmlForProduction(rawHtml) {
  let html = rawHtml;

  // Replace dev entry script with production hashed bundle
  if (mainJsFile) {
    html = html.replace(
      /<script[^>]*src=["'][^"']*virtual:tanstack-start-dev-client-entry[^"']*["'][^>]*><\/script>/gi,
      `<script type="module" crossorigin src="/assets/${mainJsFile}"></script>`
    );
  }

  // Replace dev styles with production stylesheet
  if (mainCssFile) {
    html = html.replace(
      /<link[^>]*href=["'][^"']*@tanstack-start\/styles\.css[^"']*["'][^>]*\/?>/gi,
      `<link rel="stylesheet" crossorigin href="/assets/${mainCssFile}">`
    );
  }

  // Strip Vite dev-only scripts if present
  html = html.replace(/<script[^>]*src=["'][^"']*@vite\/client[^"']*["'][^>]*><\/script>/gi, "");
  html = html.replace(/<script[^>]*src=["'][^"']*@react-refresh[^"']*["'][^>]*><\/script>/gi, "");

  // Ensure resilient TSR fallback script is in head or body
  const tsrSafetyScript = `
<script>
  window.$R = window.$R || {};
  window.$R["tsr"] = window.$R["tsr"] || [];
  window.$_TSR = window.$_TSR || {
    h() { this.hydrated = true; },
    e() { this.streamEnded = true; },
    c() {},
    p(e) { typeof e === "function" && e(); },
    buffer: [],
    initialized: true,
    t: new Map(),
    router: { manifest: { routes: {} }, matches: [] }
  };
</script>`;

  if (!html.includes("window.$_TSR") && !html.includes("self.$_TSR")) {
    html = html.replace("</head>", `${tsrSafetyScript}\n</head>`);
  }

  return html;
}

async function renderAllRoutes() {
  const { process: serverProc, baseUrl } = await ensureLocalServer();

  try {
    for (const route of ROUTES) {
      const url = `${baseUrl}${route}`;
      try {
        const res = await fetch(url, {
          signal: AbortSignal.timeout(route === "/admin" ? 25000 : 8000),
        });
        if (!res.ok) {
          console.warn(`[build:hostinger] Warning: Fetch ${route} returned status ${res.status}`);
          if (route === "/admin") writeAdminSpaFallback();
          continue;
        }

        const rawHtml = await res.text();
        const finalHtml = processHtmlForProduction(rawHtml);

        // Determine destination paths
        let targetFile;
        if (route === "/") {
          targetFile = join(distDir, "index.html");
        } else {
          const subDir = join(distDir, route.replace(/^\//, ""));
          mkdirSync(subDir, { recursive: true });
          targetFile = join(subDir, "index.html");

          // Also write flat fallback (e.g. dist/catalogue.html)
          const flatFile = join(distDir, `${route.replace(/^\//, "")}.html`);
          mkdirSync(dirname(flatFile), { recursive: true });
          writeFileSync(flatFile, finalHtml, "utf8");
        }

        writeFileSync(targetFile, finalHtml, "utf8");
        console.log(`[build:hostinger] Pre-rendered: ${route} (${finalHtml.length} bytes)`);
      } catch (err) {
        console.error(`[build:hostinger] Error rendering route ${route}:`, err.message);
        if (route === "/admin") {
          writeAdminSpaFallback();
        }
      }
    }

    // Guarantee /admin is always on disk even if prerender skipped it
    const adminHtml = join(distDir, "admin.html");
    const adminDirHtml = join(distDir, "admin", "index.html");
    if (!existsSync(adminHtml) && !existsSync(adminDirHtml)) {
      writeAdminSpaFallback();
    }
  } finally {
    if (serverProc && typeof serverProc.kill === "function") {
      try {
        serverProc.kill();
      } catch {}
    }
  }
}

await renderAllRoutes();

function writeAdminSpaFallback() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Operations Backoffice · Omnicore</title>
  ${mainCssFile ? `<link rel="stylesheet" crossorigin href="/assets/${mainCssFile}">` : ""}
  <script>
    window.$R = window.$R || {};
    window.$R["tsr"] = window.$R["tsr"] || [];
    window.$_TSR = window.$_TSR || {
      h() { this.hydrated = true; },
      e() { this.streamEnded = true; },
      c() {},
      p(e) { typeof e === "function" && e(); },
      buffer: [],
      initialized: true,
      t: new Map(),
      router: { manifest: { routes: {} }, matches: [] }
    };
  </script>
  ${mainJsFile ? `<script type="module" crossorigin src="/assets/${mainJsFile}"></script>` : ""}
</head>
<body></body>
</html>`;
  mkdirSync(join(distDir, "admin"), { recursive: true });
  writeFileSync(join(distDir, "admin.html"), html, "utf8");
  writeFileSync(join(distDir, "admin", "index.html"), html, "utf8");
  console.log("[build:hostinger] Wrote SPA fallback for /admin");
}

// 7. Write production Apache / LiteSpeed .htaccess for Hostinger
const htaccessPath = join(distDir, ".htaccess");
const htaccessContent = `# ========================================================
# Hostinger Apache / LiteSpeed Configuration
# Omnicore Solutions - Pre-rendered Static + PHP/MySQL
# ========================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Allow direct access to PHP backend in /api/
  RewriteCond %{REQUEST_URI} ^/api/ [NC]
  RewriteRule ^ - [L]

  # Backoffice — map /admin before Hostinger/directory rules can 404 it
  RewriteRule ^admin$ /admin.html [L]
  RewriteRule ^admin/$ /admin.html [L]

  # Don't rewrite real existing files
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # Check if route.html exists (e.g. /catalogue -> /catalogue.html)
  RewriteCond %{DOCUMENT_ROOT}/$1.html -f
  RewriteRule ^([^/]+)/?$ $1.html [L]

  # Check if route/index.html exists (e.g. /services/mining -> /services/mining/index.html)
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.*)/?$ $1/index.html [L]

  # Fallback to index.html for client-side SPA routing
  RewriteRule . /index.html [L]
</IfModule>

# Caching & Compression for High Performance
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff2)$">
    Header set Cache-Control "max-age=2592000, public"
  </FilesMatch>
</IfModule>
`;

writeFileSync(htaccessPath, htaccessContent, "utf8");
console.log("[build:hostinger] Created production .htaccess");
console.log("[build:hostinger] Successfully finished Hostinger build in ./dist/");
