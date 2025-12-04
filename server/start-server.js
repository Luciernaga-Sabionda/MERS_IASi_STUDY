// Wrapper para mantener el servidor activo
import('./proxy-server.js').catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Mantener el proceso vivo
process.stdin.resume();
