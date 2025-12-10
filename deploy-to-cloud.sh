#!/bin/bash

echo "🚀 Desplegando MERS_IASi_Study..."

# 1. Verificar que estamos en la rama correcta
echo "📋 Verificando rama actual..."
BRANCH=$(git branch --show-current)
echo "Rama actual: $BRANCH"

# 2. Hacer commit de todos los cambios
echo "💾 Guardando cambios..."
git add .
git commit -m "🚀 Preparar para despliegue en producción - Desafío LiquidMetal" || echo "No hay cambios para commitear"

# 3. Push a GitHub
echo "📤 Subiendo a GitHub..."
git push origin $BRANCH

echo ""
echo "✅ ¡Listo para desplegar!"
echo ""
echo "🎯 PRÓXIMOS PASOS:"
echo ""
echo "1️⃣  FRONTEND (Vercel):"
echo "   → Ve a: https://vercel.com/new"
echo "   → Conecta tu repo: Luciernaga-Sabionda/MERS_IASi_STUDY"
echo ""
echo "2️⃣  BACKEND (Render):"
echo "   → Ve a: https://render.com/create"
echo "   → Configura variables desde tu .env.local"
echo ""
echo "⚠️  IMPORTANTE: Agrega las claves API MANUALMENTE en el panel"
echo "    NUNCA las incluyas en el código público"
echo ""
echo "📖 Lee DEPLOYMENT_GUIDE.md para más detalles"
