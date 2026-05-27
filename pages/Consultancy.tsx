import { useState, useRef } from 'react';
import { sendImageForConsultancy } from '../services/geminiService';
import { Camera, Upload, Loader2, Sparkles, RotateCcw } from 'lucide-react';

export default function Consultancy() {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      const base64 = dataUrl.split(',')[1];
      setImage(base64);
      setResult('');
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleCamera = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
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

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult('');
    setError('');
  };

  return (
    <div className="animate-fade-in pb-10">

      {/* HEADER */}
      <header className="mb-10 text-center">
        <p className="text-havilah-gold/60 text-xs uppercase tracking-widest mb-2">Havilah Lash Studio</p>
        <h1 className="font-serif text-3xl text-havilah-gold mb-3">Consultoria de Cílios</h1>
        <div className="w-16 h-px bg-havilah-gold/40 mx-auto mb-3"></div>
        <p className="text-havilah-champagne/60 text-sm">Envie uma foto do seu rosto e nossa IA irá recomendar o estilo ideal para você.</p>
      </header>

      {!preview ? (
        /* BOTÕES DE UPLOAD */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">

          {/* BOTÃO GALERIA */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group relative rounded-2xl border border-havilah-gold/20 hover:border-havilah-gold/60 bg-havilah-card p-10 flex flex-col items-center gap-4 transition-all duration-300 hover:bg-havilah-darkGray cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full bg-havilah-gold/10 group-hover:bg-havilah-gold/20 flex items-center justify-center transition-all duration-300 border border-havilah-gold/30">
              <Upload size={32} className="text-havilah-gold" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg text-havilah-gold mb-1">Galeria</h3>
              <p className="text-havilah-champagne/50 text-sm">Escolha uma foto salva no seu dispositivo</p>
            </div>
            <div className="w-8 h-px bg-havilah-gold/30 group-hover:bg-havilah-gold/60 transition-all"></div>
          </button>

          {/* BOTÃO CÂMERA */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="group relative rounded-2xl border border-havilah-gold/20 hover:border-havilah-gold/60 bg-havilah-card p-10 flex flex-col items-center gap-4 transition-all duration-300 hover:bg-havilah-darkGray cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full bg-havilah-gold/10 group-hover:bg-havilah-gold/20 flex items-center justify-center transition-all duration-300 border border-havilah-gold/30">
              <Camera size={32} className="text-havilah-gold" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg text-havilah-gold mb-1">Câmera</h3>
              <p className="text-havilah-champagne/50 text-sm">Tire uma foto agora com sua câmera</p>
            </div>
            <div className="w-8 h-px bg-havilah-gold/30 group-hover:bg-havilah-gold/60 transition-all"></div>
          </button>

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleGallery} />
          <input ref={cameraInputRef} type="file" accept="image/*" capture="user" className="hidden" onChange={handleCamera} />
        </div>

      ) : (
        /* PREVIEW + ANÁLISE */
        <div className="max-w-2xl mx-auto space-y-6">

          {/* IMAGEM PREVIEW */}
          <div className="relative rounded-2xl overflow-hidden border border-havilah-gold/20" style={{ height: '320px' }}>
            <img src={preview} alt="Sua foto" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-havilah-gold/30 flex items-center justify-center text-havilah-gold hover:bg-havilah-gold hover:text-black transition-all"
            >
              <RotateCcw size={16} />
            </button>
            <div className="absolute bottom-4 left-4">
              <p className="text-havilah-champagne/70 text-xs">Foto selecionada</p>
            </div>
          </div>

          {/* BOTÃO ANALISAR */}
          {!result && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-havilah-gold text-havilah-black font-serif text-lg py-4 rounded-2xl hover:bg-havilah-goldLight disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Havilah está analisando...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analisar meu rosto
                </>
              )}
            </button>
          )}

          {/* ERRO */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* RESULTADO */}
          {result && (
            <div className="bg-havilah-card border border-havilah-gold/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-havilah-gold" />
                <h3 className="font-serif text-havilah-gold">Análise da Havilah</h3>
              </div>
              <div className="w-full h-px bg-havilah-gold/20"></div>
              <p className="text-havilah-champagne/80 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
              <button
                onClick={handleReset}
                className="w-full border border-havilah-gold/30 text-havilah-gold py-3 rounded-xl hover:bg-havilah-gold hover:text-black transition-all text-sm font-serif mt-4"
              >
                Nova Consultoria
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
