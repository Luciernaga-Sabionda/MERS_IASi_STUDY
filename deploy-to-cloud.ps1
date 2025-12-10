# 🚀 Desplegar MERS - PowerShell

Write-Host "🚀 Desplegando MERS_IASi_Study..." -ForegroundColor Cyan

# 1. Verificar rama actual
Write-Host "`n📋 Verificando rama actual..." -ForegroundColor Yellow
$branch = git branch --show-current
Write-Host "Rama actual: $branch" -ForegroundColor Green

# 2. Hacer commit de cambios
Write-Host "`n💾 Guardando cambios..." -ForegroundColor Yellow
git add .
git commit -m "🚀 Preparar para despliegue en producción - Desafío LiquidMetal"
if ($LASTEXITCODE -ne 0) {
    Write-Host "No hay cambios nuevos para commitear" -ForegroundColor Gray
}

# 3. Push a GitHub
Write-Host "`n📤 Subiendo a GitHub..." -ForegroundColor Yellow
git push origin $branch

Write-Host "`n✅ ¡Listo para desplegar!" -ForegroundColor Green
Write-Host "`n🎯 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  FRONTEND (Vercel):" -ForegroundColor White
Write-Host "   → Ve a: https://vercel.com/new" -ForegroundColor Gray
Write-Host "   → Conecta tu repo: Luciernaga-Sabionda/MERS_IASi_STUDY" -ForegroundColor Gray
Write-Host "   → Variables de entorno:" -ForegroundColor Gray
Write-Host "     VITE_API_URL=https://TU-BACKEND.onrender.com" -ForegroundColor DarkGray
Write-Host ""
Write-Host "2️⃣  BACKEND (Render):" -ForegroundColor White
Write-Host "   → Ve a: https://render.com/create" -ForegroundColor Gray
Write-Host "   → Selecciona Web Service" -ForegroundColor Gray
Write-Host "   → Conecta tu repo" -ForegroundColor Gray
Write-Host "   → Build Command: npm install" -ForegroundColor Gray
Write-Host "   → Start Command: npm run server" -ForegroundColor Gray
Write-Host "   → Variables de entorno: Cópialas de tu .env.local" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Las claves API deben agregarse MANUALMENTE" -ForegroundColor Yellow
Write-Host "    en el panel de Render. NO las compartas públicamente." -ForegroundColor Yellow
Write-Host ""
Write-Host "📖 Lee DEPLOYMENT_GUIDE.md para más detalles" -ForegroundColor Yellow
