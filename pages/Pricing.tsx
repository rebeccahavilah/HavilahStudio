import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { AppRoute, LashModel } from '../types';
import { Check, Edit2, Loader2, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LASH_MODELS } from '../constants';
// 1. IMPORTANTE: Importamos o contexto de autenticação
import { useAuth } from '../contexts/AuthContext';

interface AdditionalService {
  id: string;
  name: string;
  price: number;
}

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  // 2. IMPORTANTE: Pegamos a informação do usuário logado
  const { user } = useAuth();
  
  const [models, setModels] = useState<LashModel[]>([]);
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch Lash Models
      const { data: lashData, error: lashError } = await supabase
        .from('lash_models')
        .select('*')
        .eq('category', 'lash')
        .eq('active', true)
        .order('created_at', { ascending: true });

      if (lashError) throw lashError;

      if (lashData && lashData.length > 0) {
        setModels(lashData.map((d: any) => ({
           id: d.id,
           name: d.name,
           description: d.description,
           imagePlaceholder: d.image_url,
           price: d.price,
           maintenancePrice: d.maintenance_price
        })));
      } else {
         // Fallback/Seed for first run
         setModels(LASH_MODELS as any);
      }

      // Fetch Additional Services
      const { data: addData, error: addError } = await supabase
        .from('lash_models')
        .select('*')
        .eq('category', 'additional')
        .eq('active', true)
        .order('created_at', { ascending: true });
      
      if (addError) throw addError;

      if (addData && addData.length > 0) {
        setAdditionalServices(addData.map((d: any) => ({
          id: d.id,
          name: d.name,
          price: d.price
        })));
      } else {
        setAdditionalServices([
          { id: 'rem_out', name: 'Remoção de Cílios (outro profissional)', price: 40 },
          { id: 'rem_our', name: 'Remoção (nossa aplicação)', price: 30 },
          { id: 'hygiene', name: 'Higienização Profunda', price: 20 },
        ]);
      }

    } catch (e) {
      console.warn("Error fetching pricing (using fallback):", JSON.stringify(e, null, 2));
      setModels(LASH_MODELS as any);
      setAdditionalServices([
          { id: 'rem_out', name: 'Remoção de Cílios (outro profissional)', price: 40 },
          { id: 'rem_our', name: 'Remoção (nossa aplicação)', price: 30 },
          { id: 'hygiene', name: 'Higienização Profunda', price: 20 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (id: string, field: 'price' | 'maintenancePrice', value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) && value !== '') return;
    setModels(prev => prev.map(m => m.id === id ? { ...m, [field]: value === '' ? undefined : numValue } : m));
  };

  const handleServicePriceChange = (id: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    setAdditionalServices(prev => prev.map(s => s.id === id ? { ...s, price: numValue } : s));
  };

  const isUUID = (id: string) => id.length === 36 && id.includes('-');

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // 1. Update Models
      for (const model of models) {
        const payload: any = {
          name: model.name,
          description: model.description,
          price: model.price,
          maintenance_price: model.maintenancePrice,
          category: 'lash',
          active: true
        };
        if (isUUID(model.id)) {
          payload.id = model.id;
        }

        const { error } = await supabase.from('lash_models').upsert(payload);
        if (error) console.error("Error updating lash", error);
      }

      // 2. Update Additional Services
      for (const service of additionalServices) {
        const payload: any = {
           name: service.name,
           price: service.price,
           category: 'additional',
           active: true
        };
        if (isUUID(service.id)) {
          payload.id = service.id;
        }

        const { error } = await supabase.from('lash_models').upsert(payload);
        if (error) console.error("Error updating service", error);
      }

      setIsEditMode(false);
      await fetchData();
      alert("Alterações salvas com sucesso!");

    } catch (e) {
      alert("Erro ao salvar alterações.");
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-havilah-gold">Carregando...</div>;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="text-center md:text-left w-full md:w-auto">
          <h1 className="font-serif text-3xl text-havilah-gold mb-2">Investimento</h1>
          <p className="text-havilah-champagne/60 text-sm md:text-base">Transparência e valor em cada detalhe.</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end">
           {/* 3. IMPORTANTE: O botão só aparece SE 'user' existir */}
           {user && (
             <Button 
               variant={isEditMode ? "primary" : "outline"}
               onClick={() => isEditMode ? saveChanges() : setIsEditMode(true)}
               disabled={isSaving}
               className="!py-2 !px-4 flex items-center gap-2 text-sm"
             >
               {isSaving ? <Loader2 className="animate-spin" size={16} /> : isEditMode ? <><Check size={16} /> Salvar</> : <><Edit2 size={16} /> Editar Preços</>}
             </Button>
           )}
        </div>
      </header>

      {/* Pricing Table */}
      <div className="bg-havilah-card border border-havilah-gold/10 rounded-2xl overflow-hidden mb-12 shadow-xl">
        <div className="grid grid-cols-12 bg-havilah-gold/5 text-havilah-gold text-[10px] md:text-xs uppercase tracking-wider font-semibold py-4 px-4 md:px-6 border-b border-havilah-gold/10 gap-2">
          <div className="col-span-6 md:col-span-5 flex items-center">Procedimento</div>
          <div className="col-span-3 md:col-span-3 text-right flex items-center justify-end">Aplicação</div>
          <div className="col-span-3 md:col-span-4 text-right flex items-center justify-end leading-tight">
            <span className="hidden md:inline">Manutenção (20 dias)</span>
            <span className="md:hidden">Manut.</span>
          </div>
        </div>

        {models.map((model, idx) => (
          <div key={model.id} className={`grid grid-cols-12 py-4 md:py-5 px-4 md:px-6 items-center hover:bg-havilah-gold/5 transition-colors gap-2 ${idx !== models.length - 1 ? 'border-b border-havilah-gold/5' : ''}`}>
            
            <div className="col-span-6 md:col-span-5 font-medium text-havilah-champagne text-sm md:text-base truncate pr-2">
              {model.name}
            </div>
            
            <div className="col-span-3 md:col-span-3 text-right text-havilah-white flex justify-end text-sm md:text-base">
              {/* Só permite editar se o modo de edição estiver ativo E o usuário logado (redundância de segurança) */}
              {isEditMode && user ? (
                <div className="flex items-center gap-1 justify-end w-full">
                  <input 
                    type="number" 
                    value={model.price}
                    onChange={(e) => handlePriceChange(model.id, 'price', e.target.value)}
                    className="w-full max-w-[60px] bg-havilah-black border border-havilah-gold/30 rounded px-1 py-1 text-right text-havilah-white focus:outline-none focus:border-havilah-gold text-sm"
                  />
                </div>
              ) : (
                `R$ ${model.price}`
              )}
            </div>
            
            <div className="col-span-3 md:col-span-4 text-right text-havilah-champagne/70 flex justify-end text-sm md:text-base">
              {isEditMode && user ? (
                <div className="flex items-center gap-1 justify-end w-full">
                  <input 
                    type="number" 
                    value={model.maintenancePrice || ''}
                    placeholder="-"
                    onChange={(e) => handlePriceChange(model.id, 'maintenancePrice', e.target.value)}
                    className="w-full max-w-[60px] bg-havilah-black border border-havilah-gold/30 rounded px-1 py-1 text-right text-havilah-white focus:outline-none focus:border-havilah-gold text-sm"
                  />
                </div>
              ) : (
                model.maintenancePrice ? `R$ ${model.maintenancePrice}` : '-'
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-2xl text-havilah-gold mb-6 text-center">Combos Especiais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-gradient-to-br from-havilah-card to-black border border-havilah-gold/20 p-6 md:p-8 rounded-xl relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 bg-havilah-gold text-black text-[10px] font-bold px-3 py-1 uppercase shadow-md">Best Seller</div>
          <h3 className="font-serif text-xl text-havilah-white mb-2">Combo Glamour</h3>
          <div className="text-3xl font-serif text-havilah-gold mb-4">R$ 230</div>
          <ul className="space-y-3 mb-8 text-sm text-havilah-champagne/70">
            <li className="flex items-start gap-2"><Check size={16} className="text-havilah-gold mt-0.5" /> <span>Aplicação Volume Havilah</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-havilah-gold mt-0.5" /> <span>Kit de Cuidados (Shampoo + Pincel)</span></li>
            <li className="flex items-start gap-2"><Check size={16} className="text-havilah-gold mt-0.5" /> <span>1ª Manutenção Inclusa</span></li>
          </ul>
          <Button fullWidth variant="outline" onClick={() => navigate(AppRoute.BOOKING)}>Quero este</Button>
        </div>

        <div className="bg-havilah-card border border-havilah-gold/10 p-6 md:p-8 rounded-xl h-full">
          <h3 className="font-serif text-xl text-havilah-white mb-2">Serviços Adicionais</h3>
          <ul className="space-y-4 mt-6">
            {additionalServices.map((service) => (
              <li key={service.id} className="flex justify-between items-center text-sm border-b border-havilah-gold/5 pb-3 last:border-0">
                <span className="text-havilah-champagne pr-2">{service.name}</span>
                <span className="text-havilah-gold font-medium whitespace-nowrap">
                  {isEditMode && user ? (
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-xs">R$</span>
                      <input 
                        type="number" 
                        value={service.price}
                        onChange={(e) => handleServicePriceChange(service.id, e.target.value)}
                        className="w-16 bg-havilah-black border border-havilah-gold/30 rounded px-2 py-1 text-right text-havilah-white focus:outline-none focus:border-havilah-gold"
                      />
                    </div>
                  ) : (
                    `R$ ${service.price}`
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;    