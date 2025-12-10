#!/bin/bash
# 🚀 CREAR SERVIDOR VULTR PARA MERS HACKATHON

echo "🚀 MERS Hackathon - Creación de Servidor Vultr"
echo "================================================"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Verificar que VULTR_API_TOKEN está configurado
if [ -z "$VULTR_API_TOKEN" ]; then
    echo -e "${RED}❌ Error: La variable de entorno VULTR_API_TOKEN no está configurada.${NC}"
    echo "   Por favor, configúrala antes de ejecutar el script:"
    echo "   export VULTR_API_TOKEN='tu_token_aqui'"
    exit 1
fi

echo -e "${GREEN}✅ VULTR_API_TOKEN encontrado.${NC}"
echo "   Iniciando la creación de la instancia..."

# 2. Datos de la instancia (modificables si es necesario)
REGION="mex"
PLAN="vc2-1c-1gb"
OS_ID=387 # Debian 11 x64
LABEL="MERS-Hackathon-Proxy-$(date +%s)" # Etiqueta única para evitar conflictos

# 3. Llamada a la API de Vultr
RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $VULTR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"region\": \"$REGION\",
    \"plan\": \"$PLAN\",
    \"os_id\": $OS_ID,
    \"label\": \"$LABEL\"
  }" \
  "https://api.vultr.com/v2/instances")

# 4. Procesar la respuesta
if echo "$RESPONSE" | grep -q '"instance"'; then
    INSTANCE_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*' | sed 's/"id":"//')
    IP=$(echo "$RESPONSE" | grep -o '"main_ip":"[^"]*' | sed 's/"main_ip":"//')
    STATUS=$(echo "$RESPONSE" | grep -o '"status":"[^"]*' | sed 's/"status":"//')
    
    echo -e "\n${GREEN}🎉 ¡Instancia creada con éxito!${NC}"
    echo "--------------------------------"
    echo "ID:      $INSTANCE_ID"
    echo "IP:      $IP"
    echo "Estado:  $STATUS"
    echo "Región:  $REGION"
    echo "Plan:    $PLAN"
    echo "--------------------------------"
    echo "La instancia puede tardar unos minutos en estar completamente activa."

else
    echo -e "\n${RED}❌ Error al crear la instancia.${NC}"
    echo "Respuesta de la API de Vultr:"
    echo "$RESPONSE"
    exit 1
fi