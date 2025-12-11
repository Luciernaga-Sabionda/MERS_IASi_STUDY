#!/usr/bin/env pwsh

# MERS Vultr Active Deployment
# Despliega el backend de MERS en Vultr usando la API

$ErrorActionPreference = "Stop"

Write-Host "🌐 Iniciando despliegue de MERS en Vultr..." -ForegroundColor Cyan

# Verificar token de Vultr
if (-not $env:VULTR_API_TOKEN) {
    if (Test-Path ".env.local") {
        Get-Content ".env.local" | ForEach-Object {
            if ($_ -match "VULTR_API_TOKEN=(.+)") {
                $env:VULTR_API_TOKEN = $matches[1]
            }
        }
    }
}

if (-not $env:VULTR_API_TOKEN) {
    Write-Host "❌ VULTR_API_TOKEN no encontrado en .env.local" -ForegroundColor Red
    exit 1
}

$VULTR_TOKEN = $env:VULTR_API_TOKEN
$HEADERS = @{
    "Authorization" = "Bearer $VULTR_TOKEN"
    "Content-Type" = "application/json"
}

# Verificar token
Write-Host "🔐 Verificando token de Vultr..." -ForegroundColor Yellow
try {
    $accountResponse = Invoke-RestMethod -Uri "https://api.vultr.com/v2/account" -Headers $HEADERS -Method Get
    Write-Host "✅ Token válido - Account: $($accountResponse.account.email)" -ForegroundColor Green
} catch {
    Write-Host "❌ Token inválido: $_" -ForegroundColor Red
    exit 1
}

# Configuración del servidor
$SERVER_CONFIG = @{
    region = "ewr"  # New Jersey
    plan = "vc2-1c-1gb"  # 1 vCPU, 1GB RAM, 25GB SSD - $5/mes
    label = "mers-iasp-backend"
    os_id = 1743  # Ubuntu 22.04 LTS
    user_data = @"
#!/bin/bash
set -e

# Actualizar sistema
apt-get update && apt-get upgrade -y

# Instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Instalar git
apt-get install -y git

# Crear usuario para la app
useradd -m -s /bin/bash mers

# Clonar repositorio MERS
cd /home/mers
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git
cd MERS_IASi_STUDY

# Instalar dependencias
npm install

# Crear archivo .env con variables
cat > .env.local << 'EOF'
VITE_GEMINI_API_KEY=$env:VITE_GEMINI_API_KEY
PROXY_PORT=3002
NODE_ENV=production
EOF

# Cambiar ownership
chown -R mers:mers /home/mers

# Crear servicio systemd
cat > /etc/systemd/system/mers-backend.service << 'SYSTEMD'
[Unit]
Description=MERS Backend Server
After=network.target

[Service]
Type=simple
User=mers
WorkingDirectory=/home/mers/MERS_IASi_STUDY
ExecStart=/usr/bin/npm run server
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SYSTEMD

# Habilitar e iniciar servicio
systemctl daemon-reload
systemctl enable mers-backend
systemctl start mers-backend

# Instalar nginx como reverse proxy
apt-get install -y nginx

# Configurar nginx
cat > /etc/nginx/sites-available/mers << 'NGINX'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/mers /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

echo "✅ MERS Backend desplegado exitosamente"
"@
} | ConvertTo-Json -Depth 10

Write-Host "🚀 Creando servidor en Vultr..." -ForegroundColor Yellow
Write-Host "   Region: New Jersey (ewr)" -ForegroundColor Gray
Write-Host "   Plan: 1 vCPU, 1GB RAM, 25GB SSD (~`$5/mes)" -ForegroundColor Gray

try {
    $createResponse = Invoke-RestMethod -Uri "https://api.vultr.com/v2/instances" -Headers $HEADERS -Method Post -Body $SERVER_CONFIG
    
    $instanceId = $createResponse.instance.id
    $instanceIp = $createResponse.instance.main_ip
    
    Write-Host "✅ Servidor creado exitosamente" -ForegroundColor Green
    Write-Host "   ID: $instanceId" -ForegroundColor Cyan
    Write-Host "   IP: $instanceIp" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "⏳ El servidor se está inicializando (esto puede tardar 2-3 minutos)..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Información del Servidor:" -ForegroundColor Cyan
    Write-Host "   Dashboard: https://my.vultr.com/instances/$instanceId" -ForegroundColor Gray
    Write-Host "   Backend URL: http://$instanceIp" -ForegroundColor Green
    Write-Host "   Health Check: http://$instanceIp/health" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔍 Para verificar el estado:" -ForegroundColor Yellow
    Write-Host "   curl http://$instanceIp/health" -ForegroundColor Gray
    Write-Host ""
    
    # Guardar información del servidor
    $deploymentInfo = @{
        instanceId = $instanceId
        ip = $instanceIp
        region = "ewr"
        createdAt = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        backendUrl = "http://$instanceIp"
        healthCheck = "http://$instanceIp/health"
        dashboard = "https://my.vultr.com/instances/$instanceId"
    } | ConvertTo-Json -Depth 10
    
    $deploymentInfo | Out-File -FilePath "vultr-deployment-info.json" -Encoding utf8
    Write-Host "✅ Información guardada en: vultr-deployment-info.json" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error creando servidor: $_" -ForegroundColor Red
    Write-Host $_.Exception.Response -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Despliegue completado exitosamente" -ForegroundColor Green
Write-Host "🎉 MERS Backend ahora está en producción en Vultr" -ForegroundColor Cyan
