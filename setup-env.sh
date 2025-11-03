# 🔧 CONFIGURACIÓN DE VARIABLES - MERS Hackathon
# Ejecuta estos comandos en tu terminal después de obtener las keys

# Crear archivo .env para desarrollo local
echo "# MERS Hackathon - Variables de entorno" > .env
echo "GOOGLE_API_KEY=tu_google_api_key_aqui" >> .env
echo "VULTR_API_TOKEN=tu_vultr_token_aqui" >> .env  
echo "RAINDROP_API_KEY=tu_raindrop_key_aqui" >> .env
echo "NODE_ENV=development" >> .env

# Para PowerShell (Windows)
$env:GOOGLE_API_KEY="tu_google_api_key_aqui"
$env:VULTR_API_TOKEN="tu_vultr_token_aqui"
$env:RAINDROP_API_KEY="tu_raindrop_key_aqui"

# Para Bash (Linux/Mac)
export GOOGLE_API_KEY="tu_google_api_key_aqui"
export VULTR_API_TOKEN="tu_vultr_token_aqui"  
export RAINDROP_API_KEY="tu_raindrop_key_aqui"

# Verificar configuración
echo "Google API Key: $GOOGLE_API_KEY"
echo "Vultr Token: $VULTR_API_TOKEN"
echo "Raindrop Key: $RAINDROP_API_KEY"