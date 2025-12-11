# Script PowerShell para crear servidor Vultr - MERS Hackathon

# 1. Verificar que la variable de entorno esta configurada
if (-not $env:VULTR_API_TOKEN) {
    Write-Host "Error: La variable de entorno VULTR_API_TOKEN no esta configurada." -ForegroundColor Red
    Write-Host "Por favor, configurala antes de ejecutar el script:"
    Write-Host "`$env:VULTR_API_TOKEN='tu_token_aqui'"
    exit 1
}

Write-Host "VULTR_API_TOKEN encontrado." -ForegroundColor Green

# 2. Configurar headers y body para la solicitud
$headers = @{
    "Authorization" = "Bearer $env:VULTR_API_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    region = "mex"
    plan = "vc2-1c-0.5gb"
    os_id = 1743
    label = "MERS-Hackathon-Proxy-$(Get-Date -UFormat %s)"
    hostname = "mers-proxy"
    tag = "hackathon-ai-championship"
} | ConvertTo-Json

Write-Host "Creando servidor Vultr para MERS Hackathon..."
Write-Host "Region: Mexico City"
Write-Host "Plan: 1 vCPU, 1GB RAM"

# 3. Ejecutar la llamada a la API
try {
    $response = Invoke-RestMethod -Uri "https://api.vultr.com/v2/instances" -Method POST -Headers $headers -Body $body
    
    Write-Host "Servidor creado exitosamente!" -ForegroundColor Green
    Write-Host "ID: $($response.instance.id)"
    Write-Host "Label: $($response.instance.label)"
    Write-Host "Region: $($response.instance.region)"
    
    # Guardar ID del servidor
    $response.instance.id | Out-File -FilePath ".vultr-server-id" -Encoding utf8
    
    Write-Host "El servidor estara listo en 2-3 minutos..."
    
} catch {
    Write-Host "Error creando servidor:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
