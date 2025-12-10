# Script PowerShell para crear servidor Vultr - MERS Hackathon
# VERSIÓN CORREGIDA: Usa variable de entorno para el API token.

# 1. Verificar que la variable de entorno está configurada
if (-not $env:VULTR_API_TOKEN) {
    Write-Host "❌ Error: La variable de entorno VULTR_API_TOKEN no está configurada." -ForegroundColor Red
    Write-Host "   Por favor, configúrala antes de ejecutar el script:"
    Write-Host "   `$env:VULTR_API_TOKEN='tu_token_aqui'`"
    exit 1
}

Write-Host "✅ VULTR_API_TOKEN encontrado." -ForegroundColor Green

# 2. Configurar headers y body para la solicitud
$headers = @{
    "Authorization" = "Bearer $env:VULTR_API_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    region = "mex"
    plan = "vc2-1c-1gb"
    os_id = 387
    label = "MERS-Hackathon-Proxy-PS-$(Get-Date -UFormat %s)" # Etiqueta única
    hostname = "mers-proxy-ps"
    tag = "hackathon-ai-championship"
} | ConvertTo-Json

Write-Host "🌐 Creando servidor Vultr para MERS Hackathon..."
Write-Host "📍 Región: Mexico City"
Write-Host "💻 Plan: 1 vCPU, 1GB RAM (`$6/month)"

# 3. Ejecutar la llamada a la API
try {
    $response = Invoke-RestMethod -Uri "https://api.vultr.com/v2/instances" -Method POST -Headers $headers -Body $body
    
    Write-Host "✅ Servidor creado exitosamente!" -ForegroundColor Green
    Write-Host "🆔 ID: $($response.instance.id)"
    Write-Host "🏷️  Label: $($response.instance.label)"
    Write-Host "📍 Región: $($response.instance.region)"
    Write-Host "💰 Costo: `$($response.instance.monthly_cost)"
    
    # Guardar ID del servidor
    $response.instance.id | Out-File -FilePath ".vultr-server-id" -Encoding utf8
    
    Write-Host "`n⏳ El servidor estará listo en 2-3 minutos..."
    # Asumo que existe un script 'check-vultr-server.ps1' aunque no lo vea en la lista
    Write-Host "🔄 Ejecuta: `.\check-vultr-server.ps1` para verificar estado"
    
} catch {
    Write-Host "❌ Error creando servidor:" -ForegroundColor Red
    # Imprimir el error de forma más detallada
    $errorDetails = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($errorDetails)
    $errorText = $reader.ReadToEnd()
    Write-Host "Respuesta de la API: $errorText"
}