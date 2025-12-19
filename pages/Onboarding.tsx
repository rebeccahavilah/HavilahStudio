import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // State to hold preferences
  const [preferences, setPreferences] = useState({
    experienceLevel: '',
    stylePreference: '',
    eyeShape: ''
  });

  const handleSelection = (key: string, value: string) => {
    // Calculate new state immediately to avoid async closure issues
    const updatedPreferences = { ...preferences, [key]: value };
    setPreferences(updatedPreferences);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // If it's the last step, finish immediately with the updated data
      finishOnboarding(updatedPreferences);
    }
  };

  const finishOnboarding = async (finalData?: typeof preferences) => {
    if (!user) return;
    
    // Use data passed as argument or fallback to state (safety check)
    const dataToSave = finalData || preferences;

    setLoading(true);
    try {
      // 1. Save to user_profiles Table (Database)
      // Using UPSERT instead of UPDATE to ensure row exists
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          experience_level: dataToSave.experienceLevel,
          style_preference: dataToSave.stylePreference,
          eye_shape: dataToSave.eyeShape,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) throw error;

      // 2. Mark as completed in metadata
      await supabase.auth.updateUser({
        data: { onboarding_completed: true }
      });

      // 3. Refresh Context
      await refreshProfile();

      navigate(AppRoute.DASHBOARD);
    } catch (error) {
      console.error("Error saving onboarding:", error);
      alert("Erro ao salvar preferências. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-havilah-black flex items-center justify-center">
        <Loader2 className="animate-spin text-havilah-gold w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-havilah-black flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        <div className="mb-8 flex justify-center gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 w-8 rounded-full ${i <= step ? 'bg-havilah-gold' : 'bg-havilah-card'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-2xl text-havilah-champagne mb-4">Qual seu nível de experiência com cílios?</h2>
            <div className="space-y-3">
              {['Primeira vez', 'Já usei algumas vezes', 'Uso sempre / Viciada'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => handleSelection('experienceLevel', opt)} 
                  className="w-full p-4 rounded-lg border border-havilah-gold/20 bg-havilah-card text-havilah-champagne hover:border-havilah-gold hover:bg-havilah-gold/10 transition-all text-left"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-2xl text-havilah-champagne mb-4">Qual estilo você prefere?</h2>
            <div className="space-y-3">
              {['Bem natural e discreto', 'Volume moderado (Rímel)', 'Bem cheio e marcante', 'Não tenho certeza'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => handleSelection('stylePreference', opt)} 
                  className="w-full p-4 rounded-lg border border-havilah-gold/20 bg-havilah-card text-havilah-champagne hover:border-havilah-gold hover:bg-havilah-gold/10 transition-all text-left"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="font-serif text-2xl text-havilah-champagne mb-4">Como você descreveria seus olhos?</h2>
            <div className="space-y-3">
              {['Amendoados', 'Redondos / Grandes', 'Pequenos / Fechados', 'Caídos no canto externo'].map(opt => (
                <button 
                  key={opt} 
                  onClick={() => handleSelection('eyeShape', opt)} 
                  className="w-full p-4 rounded-lg border border-havilah-gold/20 bg-havilah-card text-havilah-champagne hover:border-havilah-gold hover:bg-havilah-gold/10 transition-all text-left"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;