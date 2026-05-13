import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, LogIn } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      setErro(error.response?.status === 401 ? 'Credenciais inválidas.' : 'Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-agm-100 rounded-2xl mb-4">
            <Leaf className="text-agm-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-agm-900">AGM</h1>
          <p className="text-gray-500 text-sm mt-1">Agro Gestão e Monitoramento</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Entrar</h2>

          {erro && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 border border-red-200">{erro}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none transition"
                  placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none transition"
                  placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-agm-600 hover:bg-agm-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-2">
              <LogIn size={16} /> {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Ainda não tem conta?{' '}
            <Link to="/cadastrar-usuario" className="text-agm-600 hover:text-agm-700 font-medium">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
