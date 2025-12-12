# 🔧 Solución: Configurar GitHub Pages

## ❌ Error Detectado:
```
Get Pages site failed. Please verify that the repository has Pages enabled 
and configured to build using GitHub Actions
HttpError: Not Found
```

## ✅ Solución: Habilitar GitHub Pages

### Paso 1: Ve a la configuración del repositorio

1. Abre tu navegador y ve a:
   ```
   https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY/settings/pages
   ```

2. O navega manualmente:
   - Ve a tu repositorio: https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY
   - Haz clic en **"Settings"** (⚙️ Configuración)
   - En el menú lateral izquierdo, busca **"Pages"**

### Paso 2: Configurar la fuente de GitHub Pages

En la página de GitHub Pages:

1. En la sección **"Build and deployment"**
2. En **"Source"**, selecciona: **"GitHub Actions"**
3. ✅ Guarda automáticamente (no hay botón de guardar)

**Captura de lo que debes ver:**
```
┌─────────────────────────────────────┐
│ Build and deployment                │
│                                     │
│ Source: [GitHub Actions ▼]         │
│                                     │
│ ✓ Your site is ready to be         │
│   published at...                   │
└─────────────────────────────────────┘
```

### Paso 3: Hacer push del workflow actualizado

En tu terminal, ejecuta:

```bash
# Agregar los cambios
git add .github/workflows/deploy-pages.yml

# Hacer commit
git commit -m "🔧 Fix: Actualizar workflow para GitHub Pages"

# Hacer push
git push origin master
```

### Paso 4: Verificar el despliegue

1. Ve a: https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY/actions
2. Deberías ver el workflow ejecutándose
3. Espera a que complete (✅ verde)

---

## 🎯 Resultado Esperado:

Después de seguir estos pasos, tu sitio estará disponible en:

**https://luciernaga-sabionda.github.io/MERS_IASi_STUDY/**

---

## 📋 Checklist:

- [ ] Ir a Settings → Pages
- [ ] Cambiar Source a "GitHub Actions"
- [ ] Hacer push del workflow actualizado
- [ ] Verificar en Actions que el workflow corre sin errores
- [ ] Acceder a la URL del sitio desplegado

---

## 🐛 Si aún tienes problemas:

### Problema: No encuentro la opción "Pages" en Settings
**Solución:** Verifica que el repositorio sea público. GitHub Pages gratis solo funciona en repos públicos.

### Problema: No veo "GitHub Actions" en Source
**Solución:** 
1. Asegúrate de tener permisos de administrador en el repo
2. Ve a Settings → Actions → General
3. Habilita "Allow all actions and reusable workflows"

### Problema: El workflow falla con "permissions"
**Solución:**
1. Ve a Settings → Actions → General
2. En "Workflow permissions", selecciona "Read and write permissions"
3. Marca "Allow GitHub Actions to create and approve pull requests"

---

## 💡 Tip Importante:

Una vez que GitHub Pages esté habilitado, cualquier push a la rama `master` o `main` automáticamente reconstruirá y desplegará tu sitio.

---

¿Necesitas ayuda con algún paso? ¡Pregúntame!
