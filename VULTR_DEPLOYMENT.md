# Configuración de Servidor Vultr para MERS_IASi_Study
# Para uso en el hackathon "The AI Championship 2025"

## Pasos para desplegar en Vultr

### 1. Crear instancia en Vultr
```bash
# Crear instancia (via CLI de Vultr o dashboard web)
# Configuración recomendada:
# - OS: Ubuntu 22.04 LTS
# - Plan: $6/month (1 vCPU, 1GB RAM, 25GB SSD)
# - Region: Más cercana a tu ubicación
```

### 2. Configuración inicial del servidor
```bash
# Conectar via SSH
ssh root@your-vultr-ip

# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js y npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar PM2 para gestión de procesos
npm install -g pm2

# Instalar certificados SSL (opcional para HTTPS)
apt install -y certbot
```

### 3. Desplegar el proxy MERS
```bash
# Crear directorio de aplicación
mkdir -p /var/www/mers-proxy
cd /var/www/mers-proxy

# Copiar archivos del proyecto (usa scp o git)
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git .

# Instalar dependencias del proxy
cd vultr-proxy
npm install express http-proxy-middleware cors dotenv

# Configurar variables de entorno
cat > .env << 'EOF'
PORT=3001
NODE_ENV=production
MERS_API_TOKEN=your-google-cloud-api-token
RAINDROP_API_KEY=your-raindrop-api-key
CORS_ORIGINS=https://your-raindrop-app.com,https://mers-demo.com
EOF

# Iniciar con PM2
pm2 start server.js --name "mers-vultr-proxy"
pm2 startup
pm2 save
```

### 4. Configurar Nginx (Reverse Proxy)
```bash
# Instalar Nginx
apt install -y nginx

# Configurar sitio
cat > /etc/nginx/sites-available/mers-proxy << 'EOF'
server {
    listen 80;
    server_name your-vultr-domain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Habilitar sitio
ln -s /etc/nginx/sites-available/mers-proxy /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 5. Configurar firewall
```bash
# Configurar ufw
ufw enable
ufw allow ssh
ufw allow 'Nginx Full'
ufw status
```

### 6. URLs finales para el hackathon
```
Proxy Health Check: http://your-vultr-domain.com/api/health
REC Endpoint: http://your-vultr-domain.com/api/rec
Chat Endpoint: http://your-vultr-domain.com/api/chat
Vision Endpoint: http://your-vultr-domain.com/api/vision
```

## Variables de entorno necesarias

```env
# Vultr Server (.env)
PORT=3001
NODE_ENV=production
MERS_API_TOKEN=<your-google-cloud-token>
RAINDROP_API_KEY=<your-raindrop-starterkit-key>
CORS_ORIGINS=https://your-raindrop-app.com

# Frontend React (para desarrollo local)
REACT_APP_VULTR_PROXY_URL=http://your-vultr-domain.com
REACT_APP_RAINDROP_API_KEY=<your-raindrop-key>
REACT_APP_GOOGLE_API_KEY=<your-google-gemini-key>
```

## Monitoreo y logs
```bash
# Ver logs del proxy
pm2 logs mers-vultr-proxy

# Monitoreo del sistema
pm2 monit

# Reiniciar si es necesario
pm2 restart mers-vultr-proxy
```

## Para el video de demostración
1. Mostrar dashboard de Vultr con la instancia activa
2. Hacer request a /api/health para mostrar que está funcionando
3. Demostrar el flujo: Raindrop → Vultr → Google Cloud
4. Mostrar los logs en tiempo real durante la demo