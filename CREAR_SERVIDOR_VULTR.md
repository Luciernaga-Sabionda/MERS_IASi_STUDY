# 🚀 INSTRUCCIONES PARA CREAR SERVIDOR VULTR MANUALMENTE

Ya que la API está teniendo problemas con PowerShell, vamos a crear el servidor desde el dashboard web (más rápido):

## PASO 1: Ir al Dashboard
1. Ve a: https://my.vultr.com/
2. Click "Deploy New Server" (botón azul)

## PASO 2: Configurar Servidor
### Tipo de Servidor:
- ✅ **Cloud Compute - Regular Performance**

### Ubicación:
- ✅ **Mexico City, Mexico** (más cercano a Colombia)

### Sistema Operativo:
- ✅ **Ubuntu 22.04 LTS x64**

### Tamaño del Servidor:
- ✅ **$6/month - 1 vCPU, 1024 MB Memory, 25 GB SSD**

### Configuraciones Adicionales:
- **Server Hostname:** `mers-hackathon-proxy`
- **Server Label:** `MERS Hackathon Proxy`
- **Auto Backups:** NO (para ahorrar créditos)
- **IPv6:** NO necesario
- **Firewall:** Por defecto está bien

## PASO 3: Deploy
1. **Click "Deploy Now"**
2. **Esperar 2-3 minutos** hasta que el status sea "Running"
3. **Copiar la IP Address** que aparezca

## PASO 4: Información que Necesito
Una vez creado el servidor, necesito:
1. **📍 IP Address** (algo como: 45.77.xxx.xxx)
2. **🔑 Root Password** (aparece en la página del servidor)

## PASO 5: SSH Setup (Te ayudo después)
Con esa información podremos:
- ✅ Conectar via SSH
- ✅ Instalar Node.js y dependencias
- ✅ Clonar nuestro código MERS
- ✅ Iniciar el proxy server
- ✅ Obtener URL pública funcionando

---

⏰ **Tiempo estimado:** 5 minutos para crear + 10 minutos para configurar = **15 minutos total**

🎯 **Resultado:** Servidor funcionando con URL pública para conectar con Raindrop

¿Procedes con crear el servidor desde el dashboard?