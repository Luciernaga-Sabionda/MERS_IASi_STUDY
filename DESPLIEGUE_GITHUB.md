# 🚀 Guía de Despliegue en GitHub

## 📋 Pasos para Desplegar

### 1. Verificar que los cambios estén guardados localmente

```bash
# Ver el estado de los archivos
git status

# Agregar todos los cambios
git add .

# Hacer commit con un mensaje descriptivo
git commit -m "🚀 Configuración para despliegue en GitHub Pages"
```

### 2. Configurar GitHub Pages (Solo la primera vez)

1. Ve a tu repositorio en GitHub: https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Source**, selecciona **GitHub Actions**

### 3. Hacer Push al repositorio

```bash
# Enviar los cambios a GitHub
git push origin master
```

### 4. Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio de GitHub
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que complete (aproximadamente 1-2 minutos)
4. Una vez completado con ✅, tu sitio estará disponible en:
   
   **🌐 https://luciernaga-sabionda.github.io/MERS_IASi_STUDY/**

## 🔧 Comandos Útiles

### Construir localmente antes de hacer push
```bash
npm run build
```

### Previsualizar el build localmente
```bash
npm run preview
```

### Forzar un nuevo despliegue
```bash
# Ir a GitHub → Actions → Deploy to GitHub Pages → Run workflow
```

## ⚠️ Importante: Backend

El frontend se desplegará en GitHub Pages, pero el **backend (servidor Node.js) no puede ejecutarse en GitHub Pages** porque es solo para archivos estáticos.

### Opciones para el Backend:

1. **Vultr** (Ya configurado - Recomendado)
   - Servidor: 207.148.31.144:3002
   - Sigue las instrucciones en `PUBLIC_DEPLOYMENT.md`

2. **Railway** (Alternativa gratuita)
   - Ve a: https://railway.app/
   - Conecta tu repositorio
   - Despliega solo la carpeta `server/`

3. **Render** (Alternativa gratuita)
   - Ve a: https://render.com/
   - Crea un nuevo "Web Service"
   - Conecta tu repositorio
   - Build Command: `npm install`
   - Start Command: `node server/start-server.js`

## 📊 Checklist de Despliegue

- [ ] ✅ Configuración de GitHub Pages completada
- [ ] ✅ Workflow de GitHub Actions funcionando
- [ ] ✅ Build exitoso localmente
- [ ] ✅ Variables de entorno configuradas (si aplica)
- [ ] ⚠️ Backend desplegado por separado
- [ ] ✅ URL del backend actualizada en el código (si cambió)
- [ ] ✅ Probado en el navegador

## 🐛 Solución de Problemas

### El sitio no carga correctamente
- Verifica que la configuración `base: '/MERS_IASi_STUDY/'` esté en `vite.config.ts`
- Revisa los logs en GitHub Actions

### Error 404 en recursos
- Asegúrate de que la base URL sea correcta
- Verifica que los archivos se hayan generado en `dist/`

### El chatbot no funciona
- El chatbot requiere el backend activo
- Verifica que el servidor backend esté corriendo y accesible
- Actualiza la URL del proxy en `vite.config.ts` con la URL pública del backend

## 🎯 URLs Finales

- **Frontend (GitHub Pages):** https://luciernaga-sabionda.github.io/MERS_IASi_STUDY/
- **Backend (Debes desplegarlo):** http://207.148.31.144:3002 (o tu servidor)
- **Repositorio:** https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY

---

**💡 Tip:** Cada vez que hagas `git push` a la rama `master` o `main`, GitHub automáticamente reconstruirá y desplegará tu sitio.
