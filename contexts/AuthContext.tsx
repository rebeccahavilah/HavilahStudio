import React, { createContext, useContext } from 'react';

// This context is deactivated to simplify the project and resolve build issues.
const AuthContext = createContext<any>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
};

export const useAuth = () => useContext(AuthContext);
