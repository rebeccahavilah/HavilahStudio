
import React, { createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { UserProfile } from '../types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Contexto mockado para um app sem autenticação
const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: false, // O app nunca está em estado de carregamento de autenticação
  isAdmin: false, // Não há admin sem login
  refreshProfile: async () => {}, // Função vazia
  signOut: async () => {}, // Função vazia
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // O valor é estático e representa um usuário "convidado"
  const value = {
    session: null,
    user: null,
    profile: null,
    loading: false,
    isAdmin: false,
    refreshProfile: async () => { console.log("Auth desabilitado."); },
    signOut: async () => { console.log("Auth desabilitado."); },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);