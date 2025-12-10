# Script: reinstalador de Vultr usando user_data
# Lee .env para VULTR_API_TOKEN y quick-setup.sh para enviarlo como user_data

$instance = '72cadc6d-ec31-4d19-ba22-3e25578d542c'
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$envFile = Join-Path $repoRoot '.env'
if (-Not (Test-Path $envFile)) {
  Write-Error ".env no encontrado en $repoRoot"
  exit 2
}
$env = Get-Content -Raw -Path $envFile
$token = $null
if ($env -match 'VULTR_API_TOKEN\s*=\s*(.+)') { $token=$matches[1].Trim() }
if (-not $token) {
  Write-Error 'VULTR_API_TOKEN no encontrado en .env'
  exit 3
}

$scriptFile = Join-Path $repoRoot 'quick-setup.sh'
if (-Not (Test-Path $scriptFile)) {
  Write-Error "quick-setup.sh no encontrado en $repoRoot"
  exit 4
}
$script = Get-Content -Raw -Path $scriptFile

$body = @{ user_data = $script }
$bodyJson = $body | ConvertTo-Json -Depth 20

Write-Host "Enviando petición de reinstalación a Vultr para instancia $instance..."

# Usar Invoke-WebRequest para capturar status y cuerpo en errores
try {
  $response = Invoke-WebRequest -Uri "https://api.vultr.com/v2/instances/$instance/reinstall" -Method Post -Headers @{ 'Authorization' = "Bearer $token"; 'Content-Type' = 'application/json' } -Body $bodyJson -UseBasicParsing -ErrorAction Stop
  # Si llegamos aquí, fue 2xx
  Write-Host "Respuesta HTTP: $($response.StatusCode) $($response.StatusDescription)"
  if ($response.Content) {
    Write-Host "Body de la respuesta (formateado si es JSON):"
    try { $json = $response.Content | ConvertFrom-Json; $json | ConvertTo-Json -Depth 100 | Write-Host } catch { Write-Host $response.Content }
  }
  Write-Host "Listo. Si la llamada fue aceptada, la instancia empezará a reinstalarse. Revisa en el Dashboard de Vultr o con la API el estado de la instancia."
} catch {
  # Si Invoke-WebRequest falla, capturamos la respuesta HTTP si está disponible
  $err = $_
  Write-Error "Error en la llamada a la API: $($err.Exception.Message)"
  if ($err -and $err.Exception -and $err.Exception.Response) {
    try {
      $statusCode = $err.Exception.Response.StatusCode.value__
      $statusDesc = $err.Exception.Response.StatusDescription
      Write-Host "HTTP $statusCode - $statusDesc"
    } catch {}
    try {
      $reader = New-Object System.IO.StreamReader($err.Exception.Response.GetResponseStream())
      $bodyText = $reader.ReadToEnd()
      Write-Host "Response body:"
      try { $json = $bodyText | ConvertFrom-Json; $json | ConvertTo-Json -Depth 100 | Write-Host } catch { Write-Host $bodyText }
    } catch {
      Write-Host "No se pudo leer el body de la respuesta de error."
    }
  }
  exit 5
}