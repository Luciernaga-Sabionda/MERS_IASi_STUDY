import React, { useState } from 'react';
import { SpinnerIcon } from './Icons';

interface RaindropResult {
  success: boolean;
  data?: any;
  error?: string;
}

export const RaindropDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RaindropResult | null>(null);
  const [collectionName, setCollectionName] = useState('MERS Demo Collection');
  const [bookmarkUrl, setBookmarkUrl] = useState('https://github.com/Luciernaga-Sabionda/MERS_IASi_STUDY');
  const [searchQuery, setSearchQuery] = useState('MERS');

  const callRaindropTool = async (toolName: string, args: any) => {
    setLoading(true);
    setResult(null);
    
    try {
      const resp = await fetch('/api/raindrop/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolName, args })
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const data = await resp.json();
      setResult({ success: data.success, data: data.result });
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-purple-400 mb-2">🔗 Live Raindrop MCP Integration</h3>
        <p className="text-gray-400">18 MCP tools available - Real-time testing</p>
      </div>

      {/* Action tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* List Collections */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="font-bold text-white mb-3">📚 List Collections</h4>
          <button
            onClick={() => callRaindropTool('list-collections', {})}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition-colors font-semibold"
          >
            {loading ? <SpinnerIcon className="w-5 h-5 mx-auto" /> : 'Get Collections'}
          </button>
        </div>

        {/* Create Collection */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="font-bold text-white mb-3">➕ Create Collection</h4>
          <input
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-2 text-sm"
            placeholder="Collection name"
          />
          <button
            onClick={() => callRaindropTool('create-collection', { title: collectionName })}
            disabled={loading || !collectionName}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition-colors font-semibold"
          >
            {loading ? <SpinnerIcon className="w-5 h-5 mx-auto" /> : 'Create'}
          </button>
        </div>

        {/* Search Raindrops */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h4 className="font-bold text-white mb-3">🔍 Search Raindrops</h4>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-2 text-sm"
            placeholder="Search..."
          />
          <button
            onClick={() => callRaindropTool('search-raindrops', { query: searchQuery })}
            disabled={loading || !searchQuery}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded transition-colors font-semibold"
          >
            {loading ? <SpinnerIcon className="w-5 h-5 mx-auto" /> : 'Search'}
          </button>
        </div>
      </div>

      {/* Crear Bookmark */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-white mb-3">🔖 Crear Bookmark (Raindrop)</h4>
        <div className="flex gap-2">
          <input
            type="url"
            value={bookmarkUrl}
            onChange={(e) => setBookmarkUrl(e.target.value)}
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-sm"
            placeholder="URL del bookmark"
          />
          <button
            onClick={() => callRaindropTool('create-raindrop', { 
              link: bookmarkUrl,
              title: 'MERS IASi Study',
              tags: ['hackathon', 'ai', 'mers']
            })}
            disabled={loading || !bookmarkUrl}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white py-2 px-6 rounded transition-colors font-semibold"
          >
            {loading ? <SpinnerIcon className="w-5 h-5" /> : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Resultados */}
      {result && (
        <div className={`rounded-lg p-4 ${result.success ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'}`}>
          <div className="flex items-start gap-3">
            <div className="text-2xl">{result.success ? '✅' : '❌'}</div>
            <div className="flex-1">
              <div className="font-bold text-white mb-2">
                {result.success ? 'Operación Exitosa' : 'Error'}
              </div>
              {result.error && (
                <div className="text-red-300 text-sm">{result.error}</div>
              )}
              {result.data && (
                <pre className="bg-gray-950 rounded p-3 text-xs text-gray-300 overflow-auto max-h-64 mt-2">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Herramientas disponibles */}
      <div className="mt-6 bg-gray-900 rounded-lg p-4">
        <h4 className="font-bold text-cyan-400 mb-3">🛠️ 18 Herramientas MCP Disponibles</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-400">
          <div>✓ list-collections</div>
          <div>✓ create-collection</div>
          <div>✓ update-collection</div>
          <div>✓ delete-collection</div>
          <div>✓ list-raindrops</div>
          <div>✓ create-raindrop</div>
          <div>✓ update-raindrop</div>
          <div>✓ delete-raindrop</div>
          <div>✓ search-raindrops</div>
          <div>✓ list-tags</div>
          <div>✓ merge-tags</div>
          <div>✓ delete-tags</div>
          <div>✓ list-highlights</div>
          <div>✓ parse-url</div>
          <div>✓ check-url-exists</div>
          <div>✓ create-raindrops-bulk</div>
          <div>✓ get-collection</div>
          <div>✓ get-raindrop</div>
        </div>
      </div>
    </div>
  );
};
