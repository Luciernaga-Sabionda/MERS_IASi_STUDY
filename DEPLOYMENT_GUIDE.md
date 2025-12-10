# 🚀 GUÍA DE DESPLIEGUE - MERS_IASi_Study

## 🌐 URLs Públicas para el Desafío LiquidMetal

### ⚠️ IMPORTANTE: Seguridad de Claves API

**NUNCA incluyas tus claves API reales en el código o documentación pública.**

Tus claves deben estar SOLO en:
- ✅ `.env.local` (en tu máquina, ignorado por Git)
- ✅ Panel de configuración de Vercel/Render (variables de entorno)
- ❌ NUNCA en commits de Git
- ❌ NUNCA en archivos públicos

---

### Opción 1: Despliegue Completo (Recomendado)

#### Frontend en Vercel
1. **Crear cuenta en Vercel**: https://vercel.com
2. **Conectar GitHub**: Autoriza Vercel a acceder a tu repo
3. **Importar proyecto**: 
   - Click en "Add New Project"
   - Selecciona `MERS_IASi_STUDY`
4. **Configurar variables de entorno**:
   ```
   VITE_API_URL=https://tu-backend.onrender.com
   ```
5. **Deploy**: Vercel detectará automáticamente Vite y hará el build

**Resultado**: Tu frontend estará en `https://mers-iasi-study.vercel.app`

#### Backend en Render
1. **Crear cuenta en Render**: https://render.com
2. **Nuevo Web Service**:
   - Conecta tu repo de GitHub
   - Build Command: `npm install`
   - Start Command: `npm run server`
3. **Variables de entorno** (en Render Dashboard):
   - Usa tus claves reales desde `.env.local`
   - Agregar manualmente en el panel web
   - Variables necesarias:
     - `VITE_GEMINI_API_KEY` (tu clave de Google AI Studio)
     - `VULTR_API_TOKEN` (tu token de Vultr)
     - `PORT=3002`
     - `NODE_ENV=production`
4. **Deploy**: Render construirá y desplegará automáticamente

**Resultado**: Tu backend estará en `https://mers-backend.onrender.com`

---

### Opción 2: Despliegue Rápido en Railway

1. **Crear cuenta**: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Variables de entorno**: Agrega las mismas variables del paso anterior
4. **Railway detectará automáticamente** Node.js y desplegará

---

## 📋 Checklist Pre-Despliegue

- [ ] Verificar que `.env` y `.env.local` están en `.gitignore`
- [ ] Confirmar que NO hay claves en el código
- [ ] Hacer commit de cambios limpios
- [ ] Push a GitHub: `git push origin master`
- [ ] Crear cuenta en Vercel/Render
- [ ] Configurar variables de entorno MANUALMENTE en el panel
- [ ] Hacer deploy
- [ ] Probar URLs públicas

---

## 🎯 URLs Finales

Una vez desplegado:
- Frontend: `https://mers-iasi-study.vercel.app`
- Backend: `https://mers-backend.onrender.com`
- GitHub: `https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY`

---

## 💡 Recomendación

Para el desafío LiquidMetal:
- **Frontend**: Vercel (rápido y confiable)
- **Backend**: Render (plan gratuito generoso)

Tiempo estimado: **10-15 minutos**
