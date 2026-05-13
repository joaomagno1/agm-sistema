import { createContext, useContext, useState, ReactNode } from 'react';
import api from '../services/api';

interface UsuarioInfo {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  usuario: UsuarioInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useStoredUsuario(): UsuarioInfo | null {
  const stored = localStorage.getItem('usuario');
  return stored ? JSON.parse(stored) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [usuario, setUsuario] = useState<UsuarioInfo | null>(useStoredUsuario);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, usuario: userInfo } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('usuario', JSON.stringify(userInfo));
    setToken(access_token);
    setUsuario(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
