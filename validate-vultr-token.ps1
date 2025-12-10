# Validar el token de Vultr de forma segura sin exponerlo
param(
    [Parameter(Mandatory=$false)]
    [string]$Token
)

if (-not $Token) {
    if ($env:VULTR_API_TOKEN) {
        $Token = $env:VULTR_API_TOKEN
    } else {
        Write-Error "No se recibió token. Pasa -Token '<VULTR_TOKEN>' o define VULTR_API_TOKEN en el entorno."
        exit 1
    }
}

$headers = @{ Authorization = "Bearer $Token" }
try {
    $resp = Invoke-RestMethod -Uri "https://api.vultr.com/v2/account" -Headers $headers -Method Get -ErrorAction Stop
    Write-Host "✅ Vultr token válido. Cuenta:" -ForegroundColor Green
    $resp | ConvertTo-Json -Depth 4
    exit 0
} catch {
    Write-Host "❌ Error validando Vultr token:" $_.Exception.Message -ForegroundColor Red
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
        Write-Host ("HTTP Status: {0}" -f $_.Exception.Response.StatusCode)
    }
    exit 2
}# validate-vultr-token.ps1
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$envFile = Join-Path $repoRoot '.env'
if (-not (Test-Path $envFile)) { Write-Error ".env no encontrado"; exit 2 }
$env = Get-Content -Raw -Path $envFile
if ($env -match 'VULTR_API_TOKEN\s*=\s*(.+)') { $token=$matches[1].Trim() } else { Write-Error 'VULTR_API_TOKEN no encontrado en .env'; exit 3 }
Write-Host "Probando token (parcial):" ($token.Length -gt 8 ? $token.Substring(0,4) + '...' + $token.Substring($token.Length-4) : $token)

try {
  $resp = Invoke-WebRequest -Uri 'https://api.vultr.com/v2/account' -Headers @{ Authorization = "Bearer $token" } -UseBasicParsing -ErrorAction Stop
  Write-Host "HTTP: $($resp.StatusCode) $($resp.StatusDescription)"
  if ($resp.Content) {
    try { $j = $resp.Content | ConvertFrom-Json; $j | ConvertTo-Json -Depth 20 | Write-Host } catch { Write-Host $resp.Content }
  }
} catch {
  Write-Host "ERROR: $($_.Exception.Message)"
  if ($_.Exception.Response) {
    try {
      $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
      $body = $reader.ReadToEnd()
      Write-Host "Response body:"
      Write-Host $body
    } catch {
      Write-Host "No body disponible." 
    }
  }
  exit 4
}