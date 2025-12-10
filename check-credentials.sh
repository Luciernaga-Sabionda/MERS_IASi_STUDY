#!/bin/bash
# 🔍 VERIFICADOR DE CREDENCIALES PARA HACKATHON
# Verifica que todas las APIs estén configuradas correctamente

echo "🔍 MERS Hackathon - Verificación de Credenciales"
echo "================================================"

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar Google API
echo -e "\n📡 Verificando Google Gemini API..."
if [ -n "$GOOGLE_API_KEY" ]; then
    # Captura la respuesta (body) y el código de estado (status)
    RESPONSE_INFO=$(curl -s -w "%{http_code}" "https://generativelanguage.googleapis.com/v1/models?key=$GOOGLE_API_KEY")
    HTTP_CODE="${RESPONSE_INFO: -3}"
    RESPONSE_BODY="${RESPONSE_INFO: 0:$((${#RESPONSE_INFO}-3))}"

    if [ "$HTTP_CODE" = "200" ] && echo "$RESPONSE_BODY" | grep -q "models"; then
        echo -e "${GREEN}✅ Google Gemini API - FUNCIONANDO (HTTP 200)${NC}"
    else
        echo -e "${RED}❌ Google Gemini API - ERROR (HTTP $HTTP_CODE)${NC}"
        
        # Manejo específico del error 429
        if [ "$HTTP_CODE" = "429" ]; then
            echo -e "${RED}⚠️ POSIBLE ERROR DE CUOTA/LÍMITE. Revisa el uso de la API en Google AI Studio.${NC}"
        else
            echo "Respuesta detallada: $RESPONSE_BODY"
        fi
    fi
else
    echo -e "${YELLOW}⚠️ GOOGLE_API_KEY no configurado${NC}"
    echo "   Ve a: https://makersuite.google.com/app/apikey"
fi

# Verificar Vultr API
echo -e "\n🌐 Verificando Vultr API..."
if [ -n "$VULTR_API_TOKEN" ]; then
    response=$(curl -s -H "Authorization: Bearer $VULTR_API_TOKEN" "https://api.vultr.com/v2/account")
    if echo "$response" | grep -q "account"; then
        echo -e "${GREEN}✅ Vultr API - FUNCIONANDO${NC}"
        echo "   Cuenta verificada correctamente"
    else
        echo -e "${RED}❌ Vultr API - ERROR${NC}"
        echo "Response: $response"
    fi
else
    echo -e "${YELLOW}⚠️ VULTR_API_TOKEN no configurado${NC}"
    echo "   Ve a: https://my.vultr.com/settings/#settingsapi"
fi

# Verificar Raindrop/LiquidMetal API
if [ -n "$RAINDROP_API_KEY" ]; then
    echo -e "\n💧 Verificando Raindrop API..."
    # Intenta la llamada, utilizando 'x-api-key' en lugar de Bearer como práctica común de LiquidMetal
    response=$(curl -s -H "x-api-key: $RAINDROP_API_KEY" "https://api.liquidmetal.run/v1/health" || echo "endpoint_not_found")
    if [ "$response" != "endpoint_not_found" ]; then
        echo -e "${GREEN}✅ Raindrop API - FUNCIONANDO${NC}"
    else
        echo -e "${YELLOW}⚠️ Raindrop API - Endpoint no encontrado (normal en fase beta)${NC}"
        echo "   Token configurado: ${RAINDROP_API_KEY:0:8}..."
    fi
else
    echo -e "${YELLOW}⚠️ RAINDROP_API_KEY no configurado${NC}"
    echo "   Ve a: https://liquidmetal.run → API Keys o StarterKit"
fi

# Verificar instancias de Vultr
echo -e "\n📋 Verificando instancias de Vultr..."
if [ -n "$VULTR_API_TOKEN" ]; then
    instances=$(curl -s -H "Authorization: Bearer $VULTR_API_TOKEN" "https://api.vultr.com/v2/instances")
    if echo "$instances" | grep -q "instances"; then
        count=$(echo "$instances" | grep -o '"id"' | wc -l)
        echo -e "${GREEN}✅ Instancias activas: $count${NC}"
        
        # Mostrar IPs si existen instancias
        if [ "$count" -gt 0 ]; then
            echo "   Instancias encontradas:"
            echo "$instances" | grep -E '"label"|"main_ip"' | sed 's/.*"label": *"\([^"]*\)".*/   - \1/' | head -5
        fi
    else
        echo -e "${YELLOW}⚠️ No hay instancias activas en Vultr${NC}"
        echo "   Crea una instancia para el proxy server"
    fi
fi

# Resumen final
echo -e "\n📊 RESUMEN DE CONFIGURACIÓN:"
echo "================================"

if [ -n "$GOOGLE_API_KEY" ]; then
    echo -e "${GREEN}✅ Google Gemini${NC} - Configurado"
else
    echo -e "${RED}❌ Google Gemini${NC} - PENDIENTE"
fi

if [ -n "$VULTR_API_TOKEN" ]; then
    echo -e "${GREEN}✅ Vultr${NC} - Configurado"
else
    echo -e "${RED}❌ Vultr${NC} - PENDIENTE"
fi

if [ -n "$RAINDROP_API_KEY" ]; then
    echo -e "${GREEN}✅ Raindrop${NC} - Configurado"
else
    echo -e "${RED}❌ Raindrop${NC} - PENDIENTE"
fi

echo -e "\n🎯 PRÓXIMOS PASOS:"
if [ -z "$VULTR_API_TOKEN" ]; then
    echo "1. Configura VULTR_API_TOKEN desde my.vultr.com"
fi
if [ -z "$RAINDROP_API_KEY" ]; then
    echo "2. Obtén RAINDROP_API_KEY desde liquidmetal.run"
fi
if [ -z "$GOOGLE_API_KEY" ]; then
    echo "3. Configura GOOGLE_API_KEY desde Google AI Studio"
fi

echo -e "\n💡 Para configurar variables:"
echo "export VULTR_API_TOKEN='tu_token_aqui'"
echo "export RAINDROP_API_KEY='tu_key_aqui'" 
echo "export GOOGLE_API_KEY='tu_key_aqui'"