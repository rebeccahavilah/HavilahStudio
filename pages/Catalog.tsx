import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { AppRoute, LashModel } from '../types';
import { Edit2, Check, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LASH_MODELS } from '../constants'; // Fallback only

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState<LashModel[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Data from Supabase
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('lash_models')
        .select('*')
        .eq('category', 'lash')
        .eq('active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedModels: LashModel[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          maintenancePrice: item.maintenance_price,
          imagePlaceholder: item.image_url
        }));
        setModels(mappedModels);
      } else {
        setModels(LASH_MODELS as any); 
      }
    } catch (err) {
      console.warn("Error fetching catalog (using fallback):", JSON.stringify(err, null, 2));
      setModels(LASH_MODELS as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const triggerImageUpload = (id: string) => {
    setEditingId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingId) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `catalog/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('app-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('app-images')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('lash_models')
        .update({ image_url: publicUrl })
        .eq('id', editingId);

      if (dbError) throw dbError;

      setModels(prev => prev.map(m => m.id === editingId ? { ...m, imagePlaceholder: publicUrl } : m));

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem.');
    } finally {
      setUploading(false);
      setEditingId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-havilah-black"><Loader2 className="animate-spin text-havilah-gold" /></div>;
  }

  return (
    <div className="animate-fade-in pb-10">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-serif text-4xl text-havilah-gold mb-2">Catálogo Premium</h1>
          <p className="text-havilah-champagne/60 max-w-xl">
            Descubra a arte do olhar. Cada modelo é desenhado para realçar sua beleza única com sofisticação.
          </p>
        </div>

        <Button 
          variant={isEditMode ? "primary" : "outline"}
          onClick={() => setIsEditMode(!isEditMode)}
          className="!py-2 !px-4 flex items-center gap-2"
        >
          {isEditMode ? <><Check size={18} /> Concluir</> : <><Edit2 size={18} /> Editar Fotos</>}
        </Button>
      </header>

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => (
          <div key={model.id} className="group bg-havilah-card rounded-xl overflow-hidden border border-havilah-gold/5 hover:border-havilah-gold/30 transition-all duration-300 flex flex-col h-full relative">
            
            <div className="relative h-64 overflow-hidden">
              <img 
                src={model.imagePlaceholder} 
                alt={model.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1000&auto=format&fit=crop"; // Fallback
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-havilah-black via-transparent to-transparent opacity-80 pointer-events-none"></div>

              {/* Admin Overlay */}
              {isEditMode && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-20 animate-fade-in">
                  <button 
                    onClick={() => triggerImageUpload(model.id)}
                    disabled={uploading}
                    className="bg-havilah-gold text-havilah-black px-4 py-3 rounded-lg font-medium flex items-center gap-2 hover:scale-105 transition-transform shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {uploading && editingId === model.id ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18} />} 
                    Trocar Foto
                  </button>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <h3 className="font-serif text-2xl text-havilah-white">{model.name}</h3>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-havilah-champagne/70 text-sm leading-relaxed mb-6 flex-1">
                {model.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-havilah-gold/10">
                <span className="text-havilah-gold font-medium">R$ {model.price}</span>
                <Button 
                  variant="outline" 
                  className="!py-2 !px-4 !text-xs"
                  onClick={() => navigate(AppRoute.BOOKING)}
                  disabled={isEditMode}
                >
                  Agendar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;