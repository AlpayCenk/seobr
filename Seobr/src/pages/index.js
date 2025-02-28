import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSEO = async () => {
    setLoading(true);
    const response = await fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, keyword })
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
          SEO Visionary 🔍
        </h1>

        {/* Eingabebereich */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <input
            type="text"
            placeholder="Website-URL (z. B. https://deineseite.de)"
            className="w-full p-3 border rounded-lg mb-4"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Haupt-Keyword (z. B. KI Marketing)"
            className="w-full p-3 border rounded-lg mb-4"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={analyzeSEO}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Analysiere...' : 'Kostenlos analysieren ✨'}
          </button>
        </div>

        {/* Ergebnisse */}
        {result && (
          <div className="space-y-8">
            {/* SEO-Score */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">SEO-Score: {result.score}/100</h2>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-purple-600 h-4 rounded-full"
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>
            </div>

            {/* Blog-Ideen */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">KI-generierte Blog-Ideen</h2>
              <ul className="list-disc pl-6 space-y-3">
                {result.content.map((idea, index) => (
                  <li key={index} className="text-gray-700">{idea}</li>
                ))}
              </ul>
            </div>

            {/* Bilder */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Bildvorschläge</h2>
              <div className="grid grid-cols-3 gap-4">
                {result.images.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    width={300}
                    height={200}
                    alt={`Bildvorschlag ${index + 1}`}
                    className="rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}