import React, { useEffect, useState } from 'react';

export const ApiStatus: React.FC = () => {
  const [ok, setOk] = useState<boolean | null>(null);
  const [msg, setMsg] = useState<string>('');
  const [missingKey, setMissingKey] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const resp = await fetch('/api/health');
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const j = await resp.json();
        if (!cancelled) {
          setOk(true);
          setMissingKey(!!j?.missingApiKey);
          setMsg(j?.missingApiKey ? 'Proxy conectado (API key ausente)' : 'Proxy conectado');
        }
      } catch (e: any) {
        if (!cancelled) {
          setOk(false);
          setMsg('Proxy inaccesible. Inicia npm run server.');
        }
      }
    };
    check();
    const id = setInterval(check, 10000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  if (ok === null) return null;

  return (
    <div className={`text-xs px-3 py-1 rounded-md inline-flex items-center gap-2 ${ok ? (missingKey ? 'bg-yellow-700 text-white' : 'bg-green-700 text-white') : 'bg-red-700 text-white'}`}>
      <span className={`w-2 h-2 rounded-full ${ok ? (missingKey ? 'bg-yellow-300' : 'bg-green-300') : 'bg-red-300'}`} />
      {msg}
    </div>
  );
};
