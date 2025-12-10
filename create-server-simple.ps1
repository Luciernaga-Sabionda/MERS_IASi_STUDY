# Crear servidor Vultr simple
$headers = @{
    "Authorization" = "Bearer IAHRBFXBTUJ5Z5YHUJ5SO7RPER63M54R2PQA"
    "Content-Type" = "application/json"
}

$body = '{"region":"mex","plan":"vc2-1c-1gb","os_id":387,"label":"MERS-Hackathon-Proxy"}'

$response = Invoke-RestMethod -Uri "https://api.vultr.com/v2/instances" -Method POST -Headers $headers -Body $body

Write-Host "Servidor creado: $($response.instance.id)"
Write-Host "Label: $($response.instance.label)"