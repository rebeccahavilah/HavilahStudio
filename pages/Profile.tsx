import React, { useRef, useState } from 'react';
import { Clock, Heart, LogOut, Mail, Camera, Loader2, Edit } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, refreshProfile, signOut } = useAuth();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate(AppRoute.WELCOME);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0 || !user) {
        return;
      }
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload to 'avatars' bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 3. Update user_profiles Table
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({ 
            user_id: user.id,
            avatar_url: publicUrl,
            updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (updateError) throw updateError;
      
      await refreshProfile();
      alert("Foto atualizada com sucesso!");

    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Erro ao atualizar foto de perfil.');
    } finally {
      setUploading(false);
    }
  };

  // Safe data access
  const name = profile?.full_name || user?.user_metadata?.full_name || 'Usuário';
  const email = profile?.email || user?.email || '';
  const avatarUrl = profile?.avatar_url;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto pb-10">
      <header className="mb-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-28 h-28 rounded-full bg-havilah-gold border-4 border-havilah-card shadow-xl overflow-hidden flex items-center justify-center text-havilah-black font-serif text-4xl relative">
              {uploading ? (
                <Loader2 className="animate-spin text-havilah-black" />
              ) : avatarUrl ? (
                <img src={avatarUrl} alt="Perfil" className="w-full h-full object-cover" />
              ) : (
                initial
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 bg-havilah-gold text-havilah-black p-2 rounded-full border-2 border-havilah-black shadow-lg">
              <Camera size={14} />
            </div>
          </div>
          <button 
            onClick={handleAvatarClick}
            className="mt-3 text-xs text-havilah-gold hover:text-havilah-goldLight flex items-center gap-1"
          >
            <Edit size={12} /> Alterar foto
          </button>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*" 
        />

        <div className="flex-1">
          <h1 className="font-serif text-3xl text-havilah-white mb-1">{name}</h1>
          <p className="text-havilah-champagne/60 text-sm flex items-center justify-center md:justify-start gap-2 mb-2">
            <Mail size={14} /> {email}
          </p>
          <div className="inline-flex items-center gap-2 bg-havilah-gold/10 px-3 py-1 rounded-full border border-havilah-gold/20">
            <span className="w-2 h-2 bg-havilah-gold rounded-full"></span>
            <span className="text-havilah-gold text-xs font-medium uppercase tracking-wider">
              Cliente Vip
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-havilah-card border border-havilah-gold/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-havilah-gold/5">
            <h3 className="font-serif text-lg text-havilah-gold mb-4 flex items-center gap-2">
              <Heart size={18} /> Preferências
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase text-havilah-champagne/40 tracking-wider block mb-1">Olhos</span>
                <span className="text-havilah-white font-medium">{profile?.eye_shape || 'Não informado'}</span>
              </div>
              <div>
                <span className="text-xs uppercase text-havilah-champagne/40 tracking-wider block mb-1">Estilo Favorito</span>
                <span className="text-havilah-white font-medium">{profile?.style_preference || 'Não informado'}</span>
              </div>
              <div>
                 <span className="text-xs uppercase text-havilah-champagne/40 tracking-wider block mb-1">Experiência</span>
                 <span className="text-havilah-white font-medium">{profile?.experience_level || 'Não informado'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-havilah-card border border-havilah-gold/10 rounded-xl overflow-hidden">
          <div className="p-6">
            <h3 className="font-serif text-lg text-havilah-gold mb-4 flex items-center gap-2">
              <Clock size={18} /> Histórico
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-havilah-gold/5 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-havilah-white font-medium">Manutenção Volume Havilah</p>
                  <p className="text-xs text-havilah-champagne/50">15 de Outubro, 2023</p>
                </div>
                <span className="text-sm text-havilah-gold">R$ 100</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-havilah-gold/5 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-havilah-white font-medium">Aplicação Volume Premium</p>
                  <p className="text-xs text-havilah-champagne/50">20 de Setembro, 2023</p>
                </div>
                <span className="text-sm text-havilah-gold">R$ 250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2 mx-auto text-red-400 border-red-900/30 hover:border-red-500 hover:bg-red-900/10">
          <LogOut size={16} /> Sair da Conta
        </Button>
      </div>
    </div>
  );
};

export default Profile;