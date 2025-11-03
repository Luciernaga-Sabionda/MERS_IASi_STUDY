# 🌐 CONFIGURACIÓN VULTR PARA MERS_IASi_Study
# Script específico para tu cuenta my.vultr.com

## PASO 1: Obtener API Token de Vultr

1. Ve a: https://my.vultr.com/settings/#settingsapi
2. Click "Generate API Key"
3. Copia el token generado
4. Guárdalo como: `VULTR_API_TOKEN`

## PASO 2: Crear instancia para MERS

### Opción A: Via Dashboard Web
1. Ve a: https://my.vultr.com/deploy/
2. Configura:
   - **Server Type**: Cloud Compute - Regular Performance
   - **Location**: New York (NJ) o el más cercano a ti
   - **Operating System**: Ubuntu 22.04 LTS x64
   - **Server Size**: $6/month (1 vCPU, 1GB RAM, 25GB SSD)
   - **Hostname**: mers-hackathon-proxy

### Opción B: Via CLI (más rápido)
```bash
# Instalar Vultr CLI
curl -L https://github.com/vultr/vultr-cli/releases/latest/download/vultr-cli-windows-amd64.zip -o vultr-cli.zip
# O descargar desde: https://github.com/vultr/vultr-cli/releases

# Configurar API
vultr-cli configure
# Pegar tu VULTR_API_TOKEN cuando pregunte

# Crear instancia
vultr-cli instance create \
  --region "ewr" \
  --plan "vc2-1c-1gb" \
  --os 387 \
  --label "mers-hackathon-proxy"
```

## PASO 3: Configurar el servidor

Una vez creada la instancia, obtendrás:
- **IP Address**: Tu IP pública (ej: 144.202.xx.xx)
- **Root Password**: Para acceso SSH

### Conectar via SSH
```bash
# Usar tu IP real
ssh root@144.202.xx.xx
# Introducir password cuando pregunte
```

### Setup automatizado en el servidor
```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar PM2
npm install -g pm2

# Crear directorio
mkdir -p /var/www/mers-proxy
cd /var/www/mers-proxy

# Clonar el proyecto
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git .

# Ir al directorio del proxy
cd vultr-proxy

# Instalar dependencias
npm install

# Crear archivo .env con TUS datos reales
cat > .env << 'EOF'
PORT=3001
NODE_ENV=production
VULTR_API_TOKEN=tu_vultr_api_token_aqui
RAINDROP_API_KEY=tu_raindrop_key_aqui
GOOGLE_API_KEY=tu_google_gemini_key_aqui
CORS_ORIGINS=https://api.raindrop.ai,https://liquidmetal.run
EOF

# Iniciar con PM2
pm2 start server.js --name "mers-vultr-proxy"
pm2 startup
pm2 save

# Verificar que funciona
curl http://localhost:3001/api/health
```

## PASO 4: Configurar dominio (opcional pero recomendado)

### Con Vultr DNS (gratis)
1. Ve a: https://my.vultr.com/dns/
2. Add Domain: ej. `mers-demo.tu-dominio.com`
3. Create A Record:
   - Name: mers-demo
   - Data: Tu IP de Vultr
   - TTL: 300

### URLs finales
- **Health Check**: http://tu-ip-vultr:3001/api/health
- **Demo Status**: http://tu-ip-vultr:3001/api/demo/status
- **SmartMemory**: http://tu-ip-vultr:3001/api/smartmemory

## PASO 5: Testing inicial

```bash
# Test local (desde tu PC)
curl http://tu-ip-vultr:3001/api/health

# Debería devolver algo como:
{
  "status": "healthy",
  "service": "MERS-Vultr-Proxy-IASi-Study",
  "hackathon": "The AI Championship 2025",
  "connections": {
    "googleCloud": "active",
    "raindrop": "ready",
    "vultr": "operational"
  }
}
```

## VARIABLES QUE NECESITAS OBTENER:

1. **VULTR_API_TOKEN**: De my.vultr.com/settings/#settingsapi
2. **RAINDROP_API_KEY**: De liquidmetal.run (buscar sección API/StarterKit)
3. **GOOGLE_API_KEY**: De Google Cloud Console → APIs & Services → Credentials

## SIGUIENTE PASO:
Una vez tengas Vultr funcionando, podremos configurar la integración completa con Raindrop.