# update-vultr-token.ps1
# Backup .env and replace or add VULTR_API_TOKEN with the provided value.
param(
  [Parameter(Mandatory=$false, HelpMessage='Si quieres pasar el token como argumento, usa -Token <VALUE>. Si no, el script pedirá interactivamente.')]
  [string]$Token
)

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$envPath = Join-Path $repoRoot '.env'
if (-not (Test-Path $envPath)) {
  Write-Error ".env no encontrado en $repoRoot"
  exit 2
}

if (-not $Token) {
  $Token = Read-Host -Prompt 'Introduce el nuevo VULTR API TOKEN (se mostrará en pantalla)'
}
if (-not $Token) {
  Write-Error 'No se proporcionó token. Abortando.'
  exit 3
}

# Backup
$backup = "$envPath.bak.$((Get-Date).ToString('yyyyMMddHHmmss'))"
Copy-Item -Path $envPath -Destination $backup -Force
Write-Host "Backup .env -> $backup"

# Read and replace or append
$content = Get-Content -Path $envPath -Raw
if ($content -match 'VULTR_API_TOKEN\s*=') {
  $newContent = $content -replace 'VULTR_API_TOKEN\s*=.*', "VULTR_API_TOKEN=$Token"
} else {
  $newContent = $content + "`nVULTR_API_TOKEN=$Token`n"
}

Set-Content -Path $envPath -Value $newContent -Encoding UTF8
Write-Host ".env actualizado con nuevo VULTR_API_TOKEN"

# Show the updated line (masked)
$masked = $Token
if ($masked.Length -gt 8) { $masked = $masked.Substring(0,4) + '...' + $masked.Substring($masked.Length-4) }
Write-Host "Nuevo VULTR_API_TOKEN (parcial): $masked"
Write-Host "Ahora puedes volver a ejecutar .\reinstall-vultr-with-userdata.ps1 para intentar la Opción B, o ejecutar el script manualmente por SCP/SSH (Opción A)."