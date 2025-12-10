#!/bin/bash
# Script de configuración de Entorno para MERS Hackathon Server
# PREPARA EL SERVIDOR PARA DESPLIEGUES. NO INSTALA LA APP.

echo "🚀 INICIANDO CONFIGURACIÓN DE ENTORNO MERS..."

# 1. Actualizar sistema
echo "🔄 Actualizando paquetes del sistema..."
apt-get update -y && apt-get upgrade -y

# 2. Instalar dependencias clave (Node.js, PM2)
echo "📦 Instalando Node.js v20 y PM2..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2

# 3. Crear el directorio de despliegue
# Esta es la ruta que el script deploy.sh espera.
DEPLOY_DIR="/var/www/mers-proxy"
echo "📁 Creando directorio de despliegue en $DEPLOY_DIR..."
mkdir -p $DEPLOY_DIR
# Asignar propiedad al usuario no-root si existiera, o mantener como root por simplicidad del hackathon.
# chown -R www-data:www-data $DEPLOY_DIR 

# 4. Configurar el Firewall (UFW)
echo "🔥 Configurando firewall..."
ufw allow 22/tcp  # SSH
ufw allow 3001/tcp # MERS Proxy Port
ufw --force enable

# 5. Configurar PM2 para que se inicie al arrancar el sistema
# El comando de inicio real lo ejecutará deploy.sh
pm2 startup

echo "✅ CONFIGURACIÓN DE ENTORNO COMPLETADA!"
echo "   El servidor está listo para recibir despliegues con deploy.sh"
echo "   Puertos abiertos: 22 (SSH), 3001 (Proxy)"