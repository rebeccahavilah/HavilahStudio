import { useState } from 'react';
import { sendImageForConsultancy } from '../services/geminiService';

export default function Consultancy() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      setImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError('');
    setResult('');

    try {
      const text = await sendImageForConsultancy(image);
      setResult(text);
    } catch (err: any) {
      setError(err.message || 'Erro na análise');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Consultoria de Cílios</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br /><br />
      <button onClick={handleAnalyze} disabled={!image || loading}>
        {loading ? 'Analisando...' : 'Analisar'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>{result}</div>}
    </div>
  );
}
