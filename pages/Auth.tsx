import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthProps {
  mode: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ mode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        // Note: If email confirmation is enabled in Supabase, session might be null here.
        // We'll proceed to onboarding if we have a user, or alert them if session is pending.
        if (data.user && !data.session) {
          alert("Cadastro realizado! Por favor, verifique seu email para confirmar a conta.");
          navigate(AppRoute.LOGIN);
        } else if (data.user) {
          navigate(AppRoute.ONBOARDING);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        navigate(AppRoute.DASHBOARD);
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-havilah-black flex flex-col p-6 relative">
      <button onClick={() => navigate(AppRoute.WELCOME)} className="absolute top-6 left-6 text-havilah-gold">
        <ArrowLeft />
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h2 className="font-serif text-3xl text-havilah-champagne mb-2">
          {mode === 'login' ? 'Bem-vinda de volta' : 'Criar sua conta'}
        </h2>
        <p className="text-havilah-champagne/50 mb-8">
          {mode === 'login' ? 'Acesse seu perfil exclusivo.' : 'Comece sua jornada de beleza.'}
        </p>

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/50 p-3 rounded-lg flex items-center gap-2 text-red-200 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-havilah-gold/70 mb-2">Nome Completo</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-havilah-card border border-havilah-gold/20 rounded-lg p-3 text-havilah-champagne focus:border-havilah-gold focus:outline-none transition-colors"
                placeholder="Seu nome"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs uppercase tracking-wider text-havilah-gold/70 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-havilah-card border border-havilah-gold/20 rounded-lg p-3 text-havilah-champagne focus:border-havilah-gold focus:outline-none transition-colors"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-havilah-gold/70 mb-2">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-havilah-card border border-havilah-gold/20 rounded-lg p-3 text-havilah-champagne focus:border-havilah-gold focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? <Loader2 className="animate-spin mx-auto" /> : (mode === 'login' ? 'Entrar' : 'Continuar')}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setError(null);
              navigate(mode === 'login' ? AppRoute.REGISTER : AppRoute.LOGIN);
            }}
            className="text-havilah-goldLight text-sm hover:underline"
          >
            {mode === 'login' ? 'Ainda não tem conta? Cadastre-se' : 'Já possui conta? Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;