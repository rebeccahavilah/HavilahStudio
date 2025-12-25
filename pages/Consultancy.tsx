import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/Button';
import { Upload, Sparkles, Loader2, Camera, X, SwitchCamera } from 'lucide-react';
import { analyzeImageForConsultancy } from '../services/geminiService';

export default function Consultancy() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        setResult(null); 
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCameraOpen(false);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip horizontally for selfie mirror effect
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
      }
      const base64 = canvas.toDataURL('image/jpeg');
      setImage(base64);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleAnalysis = async () => {
    if (!image) return;
    setLoading(true);
    // Extract base64 data only
    const base64Data = image.split(',')[1];
    const analysis = await analyzeImageForConsultancy(base64Data);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto pb-10">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-3xl text-havilah-gold mb-2">Consultoria Visagista IA</h1>
        <p className="text-havilah-champagne/60">
          Envie uma foto ou tire uma selfie para que nossa Inteligência Artificial recomende o design perfeito.
        </p>
      </header>

      <div className="bg-havilah-card border border-havilah-gold/10 p-8 rounded-2xl mb-8 text-center relative overflow-hidden">
        
        {isCameraOpen && (
          <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover transform -scale-x-100" 
            />
            <div className="absolute bottom-6 flex items-center gap-6">
               <button onClick={stopCamera} className="p-4 rounded-full bg-havilah-darkGray text-havilah-champagne border border-havilah-gold/30">
                 <X size={24} />
               </button>
               <button onClick={capturePhoto} className="p-6 rounded-full bg-havilah-gold text-havilah-black border-4 border-havilah-black shadow-lg shadow-havilah-gold/20 transform active:scale-95 transition-all">
                 <Camera size={32} />
               </button>
            </div>
          </div>
        )}

        {!image ? (
          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 border-2 border-dashed border-havilah-gold/30 rounded-xl p-8 cursor-pointer hover:bg-havilah-gold/5 transition-colors flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-havilah-gold/10 flex items-center justify-center text-havilah-gold">
                <Upload size={24} />
              </div>
              <p className="text-havilah-white font-medium text-sm">Carregar Foto</p>
            </div>

            <div 
              onClick={startCamera}
              className="flex-1 border-2 border-dashed border-havilah-gold/30 rounded-xl p-8 cursor-pointer hover:bg-havilah-gold/5 transition-colors flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-havilah-gold/10 flex items-center justify-center text-havilah-gold">
                <Camera size={24} />
              </div>
              <p className="text-havilah-white font-medium text-sm">Tirar Selfie</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img src={image} alt="Preview" className="max-h-80 mx-auto rounded-lg shadow-lg" />
            <button 
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />

        {image && !result && (
          <div className="mt-6">
            <Button onClick={handleAnalysis} disabled={loading} className="min-w-[200px]">
              {loading ? <><Loader2 className="animate-spin mr-2" /> Analisando...</> : <><Sparkles className="mr-2" /> Analisar meu Olhar</>}
            </Button>
          </div>
        )}
      </div>

      {result && (
        <div className="bg-gradient-to-br from-havilah-card to-black border border-havilah-gold/30 p-8 rounded-2xl shadow-xl animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6 border-b border-havilah-gold/10 pb-4">
            <Sparkles className="text-havilah-gold" />
            <h3 className="font-serif text-2xl text-havilah-white">Recomendação Personalizada</h3>
          </div>
          <div className="prose prose-invert prose-gold max-w-none text-havilah-champagne/80 whitespace-pre-line leading-relaxed">
            {result}
          </div>
          <div className="mt-8 text-center">
             <Button onClick={() => window.location.hash = '#/agendamento'}>Agendar este Estilo</Button>
          </div>
        </div>
      )}
    </div>
  );
};
