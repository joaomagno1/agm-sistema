import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

export interface UsuarioInfo {
  id: number;
  nome: string;
  email: string;
  tipo: number;
  codUsuario: string;
}

interface AuthContextType {
  token: string | null;
  usuario: UsuarioInfo | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useStoredUsuario(): UsuarioInfo | null {
  try {
    const stored = localStorage.getItem('usuario');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [usuario, setUsuario] = useState<UsuarioInfo | null>(useStoredUsuario);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validarToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('/auth/me');
        const userData = {
          id: response.data.idUsuario,
          nome: response.data.nomeUsuario,
          email: response.data.email,
          tipo: response.data.tipo,
          codUsuario: response.data.codUsuario,
        };
        setUsuario(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };
    validarToken();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, refresh_token, usuario: userInfo } = response.data;
    localStorage.setItem('token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('usuario', JSON.stringify(userInfo));
    setToken(access_token);
    setUsuario(userInfo);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore erro no logout
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, loading, login, logout }}>
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
