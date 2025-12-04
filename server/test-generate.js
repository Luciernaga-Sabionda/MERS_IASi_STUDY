(async ()=>{
  try {
    const res = await fetch('http://localhost:3002/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prompt: 'Di una breve presentación de MERS-IASi y su objetivo' })
    });
    console.log('STATUS', res.status);
    const txt = await res.text();
    console.log('BODY:', txt);
  } catch (e) {
    console.error('ERR', e);
  }
})();
