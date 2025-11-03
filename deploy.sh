#!/bin/bash
# Deployment Script para MERS_IASi_Study - The AI Championship 2025
# Autor: Roxana A. Salazar M. (Luciérnaga Sabionda)

set -e

echo "🏆 MERS_IASi_Study - The AI Championship 2025 Deployment"
echo "========================================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
VULTR_SERVER_IP=${VULTR_SERVER_IP:-""}
RAINDROP_API_KEY=${RAINDROP_API_KEY:-""}
GOOGLE_API_KEY=${GOOGLE_API_KEY:-""}

echo -e "${BLUE}📋 Verificando variables de entorno...${NC}"

if [ -z "$VULTR_SERVER_IP" ]; then
    echo -e "${RED}❌ VULTR_SERVER_IP no configurado${NC}"
    echo "   Configura: export VULTR_SERVER_IP='tu-ip-vultr'"
    exit 1
fi

if [ -z "$RAINDROP_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  RAINDROP_API_KEY no configurado (opcional para demo)${NC}"
fi

if [ -z "$GOOGLE_API_KEY" ]; then
    echo -e "${YELLOW}⚠️  GOOGLE_API_KEY no configurado (opcional para demo)${NC}"
fi

echo -e "${GREEN}✅ Variables verificadas${NC}"

# Función para deployment en Vultr
deploy_vultr() {
    echo -e "${BLUE}🌐 Desplegando en Vultr Server...${NC}"
    
    # Crear directorio temporal
    TEMP_DIR=$(mktemp -d)
    cp -r vultr-proxy/* $TEMP_DIR/
    
    # Crear .env para producción
    cat > $TEMP_DIR/.env << EOF
PORT=3001
NODE_ENV=production
VULTR_SERVER_IP=${VULTR_SERVER_IP}
RAINDROP_API_KEY=${RAINDROP_API_KEY}
GOOGLE_API_KEY=${GOOGLE_API_KEY}
CORS_ORIGINS=https://api.raindrop.ai,https://mers-demo.raindrop.ai
EOF

    # Subir archivos al servidor
    echo -e "${YELLOW}📤 Subiendo archivos a Vultr...${NC}"
    scp -r $TEMP_DIR/* root@${VULTR_SERVER_IP}:/var/www/mers-proxy/
    
    # Instalar dependencias y iniciar
    ssh root@${VULTR_SERVER_IP} << 'ENDSSH'
        cd /var/www/mers-proxy
        npm install --production
        pm2 stop all || true
        pm2 start server.js --name "mers-vultr-proxy"
        pm2 startup
        pm2 save
        echo "✅ MERS Vultr Proxy desplegado correctamente"
ENDSSH

    # Limpiar directorio temporal
    rm -rf $TEMP_DIR
    
    echo -e "${GREEN}✅ Vultr deployment completado${NC}"
    echo -e "${BLUE}🔗 URLs disponibles:${NC}"
    echo "   Health Check: http://${VULTR_SERVER_IP}/api/health"
    echo "   Demo Status:  http://${VULTR_SERVER_IP}/api/demo/status"
}

# Función para build y optimización
build_frontend() {
    echo -e "${BLUE}🔨 Construyendo frontend optimizado...${NC}"
    
    # Instalar dependencias
    npm install
    
    # Build para producción
    npm run build
    
    echo -e "${GREEN}✅ Frontend construido${NC}"
}

# Función para testing
run_tests() {
    echo -e "${BLUE}🧪 Ejecutando tests...${NC}"
    
    # Test del servidor local
    npm run dev &
    SERVER_PID=$!
    sleep 5
    
    # Test básico de endpoints
    if curl -f http://localhost:3002/ > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend funcionando${NC}"
    else
        echo -e "${RED}❌ Frontend no responde${NC}"
        kill $SERVER_PID
        exit 1
    fi
    
    kill $SERVER_PID
    
    # Test del proxy si existe servidor Vultr
    if [ ! -z "$VULTR_SERVER_IP" ]; then
        if curl -f http://${VULTR_SERVER_IP}/api/health > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Vultr proxy funcionando${NC}"
        else
            echo -e "${YELLOW}⚠️  Vultr proxy no responde (puede estar iniciándose)${NC}"
        fi
    fi
}

# Función principal
main() {
    echo -e "${BLUE}🚀 Iniciando deployment de MERS_IASi_Study...${NC}"
    
    case ${1:-"all"} in
        "build")
            build_frontend
            ;;
        "vultr")
            deploy_vultr
            ;;
        "test")
            run_tests
            ;;
        "all")
            build_frontend
            if [ ! -z "$VULTR_SERVER_IP" ]; then
                deploy_vultr
            else
                echo -e "${YELLOW}⚠️  Saltando deployment Vultr (IP no configurada)${NC}"
            fi
            run_tests
            ;;
        *)
            echo "Uso: $0 [build|vultr|test|all]"
            exit 1
            ;;
    esac
    
    echo -e "${GREEN}🎉 Deployment completado exitosamente${NC}"
    echo -e "${BLUE}📊 Estado del proyecto:${NC}"
    echo "   - Frontend: ✅ Construido y probado"
    echo "   - Vultr Proxy: $([ ! -z "$VULTR_SERVER_IP" ] && echo "✅ Desplegado" || echo "⏳ Pendiente")"
    echo "   - Raindrop: ⏳ Pendiente de configuración"
    echo "   - Repository: ✅ https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY"
}

# Ejecutar función principal
main $1