# 🌐 MERS Public Deployment

## Public Frontend (GitHub Pages)
**URL:** https://luciernaga-sabionda.github.io/MERS_IASi_STUDY/

The frontend is already configured for GitHub Pages. The automatic workflow will deploy after each push.

## Backend on Vultr (REQUIRED)

For the chatbot and APIs to work, you must deploy the backend on Vultr:

### Step 1: Connect via SSH
```bash
ssh root@207.148.31.144
# Password: P%6gjRE!p[cjXj,W
```

### Step 2: Run installation (copy everything together)
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

### Step 3: Verify operation
```bash
curl http://localhost:3002/health
```

## Final URLs for Evaluators

- **Frontend:** https://luciernaga-sabionda.github.io/MERS_IASi_STUDY/
- **Backend API:** http://207.148.31.144:3002/health

Once the backend is deployed, update `vite.config.ts` with:
```typescript
proxy: {
  '/api': {
    target: 'http://207.148.31.144:3002',
    changeOrigin: true
  }
}
```

And rebuild: `npm run build && git add -A && git commit -m "Update backend URL" && git push`