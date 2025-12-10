# 🎯 Script para ejecutar después de crear el servidor Vultr

# PASO 1: IP del servidor Vultr confirmada
$VULTR_IP = "155.138.224.137"  # ✅ SERVIDOR LISTO

# PASO 2: Configurar servidor automáticamente
Write-Host "🚀 Configurando servidor Vultr en $VULTR_IP..." -ForegroundColor Green

# Subir y ejecutar script de configuración
scp .\configure-vultr-server.sh root@${VULTR_IP}:/tmp/
ssh root@$VULTR_IP "chmod +x /tmp/configure-vultr-server.sh && /tmp/configure-vultr-server.sh"

Write-Host "✅ ¡Servidor configurado!" -ForegroundColor Green
Write-Host "🌐 URL del servidor: http://$VULTR_IP`:3001" -ForegroundColor Yellow
Write-Host "❤️ Health check: http://$VULTR_IP`:3001/health" -ForegroundColor Yellow

# PASO 3: Actualizar .env local con la URL del servidor
$envContent = Get-Content .env
$envContent = $envContent -replace "VITE_VULTR_PROXY_URL=.*", "VITE_VULTR_PROXY_URL=http://$VULTR_IP`:3001"
$envContent | Set-Content .env

Write-Host "📋 Archivo .env actualizado con la nueva URL" -ForegroundColor Green
Write-Host "🎉 ¡Listo para conectar con Raindrop Platform!" -ForegroundColor Magenta