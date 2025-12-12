# 🌐 Despliegue Público de MERS

## Frontend Público (GitHub Pages)
**URL:** https://luciernaga-sabionda.github.io/MERS_IASi_STUDY/

El frontend ya está configurado para GitHub Pages. El workflow automático desplegará después de cada push.

## Backend en Vultr (REQUERIDO)

Para que el chatbot y las APIs funcionen, debes desplegar el backend en Vultr:

### Paso 1: Conectar por SSH
```bash
ssh root@207.148.31.144
# Password: P%6gjRE!p[cjXj,W
```

### Paso 2: Ejecutar instalación (copiar todo junto)
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && \
sudo apt-get install -y nodejs git && \
cd /root && \
git clone https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY.git && \
cd MERS_IASi_STUDY && \
npm install && \
cat > .env.local << 'EOF'
VITE_GEMINI_API_KEY=AIzaSyDwhcdqcEs9HlK3MJPVAmKyTUCvDociNV4
RAINDROP_TOKEN=b15b2227-da02-4088-af25-0c9e9f84290f
RAINDROP_TEST_TOKEN=b15b2227-da02-4088-af25-0c9e9f84290f
PORT=3002
EOF
sudo npm install -g pm2 && \
pm2 start server/proxy-server-fixed.js --name mers-backend && \
pm2 save && \
pm2 startup
```

### Paso 3: Verificar funcionamiento
```bash
curl http://localhost:3002/health
```

## URLs Finales para Evaluadores

- **Frontend:** https://luciernaga-sabionda.github.io/MERS_IASi_STUDY/
- **Backend API:** http://207.148.31.144:3002/health

Una vez desplegado el backend, actualiza `vite.config.ts` con:
```typescript
proxy: {
  '/api': {
    target: 'http://207.148.31.144:3002',
    changeOrigin: true
  }
}
```

Y reconstruye: `npm run build && git add -A && git commit -m "Update backend URL" && git push`
