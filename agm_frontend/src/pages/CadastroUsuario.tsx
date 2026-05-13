import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, User, Mail, Lock, Hash, MapPin, UserPlus } from 'lucide-react';
import api from '../services/api';

export function CadastroUsuario() {
  const [form, setForm] = useState({ codUsuario: '', nomeUsuario: '', email: '', senha: '', id_setor: 0 });
  const [setores, setSetores] = useState<{ idSetor: number; codSetor: string; nomeSetor: string }[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/setor?limit=50').then((r) => setSetores(r.data.data || r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setLoading(true);
    try {
      await api.post('/usuario', form);
      setMensagem('Cadastro realizado! Verifique seu e-mail para validar a conta.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      const msg = error.response?.data?.message;
      setErro(Array.isArray(msg) ? msg.join(', ') : msg || 'Erro ao cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-agm-100 rounded-2xl mb-4">
            <Leaf className="text-agm-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-agm-900">Criar Conta</h1>
          <p className="text-gray-500 text-sm mt-1">AGM - Agro Gestão e Monitoramento</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {mensagem && (
            <div className="bg-green-50 text-green-700 text-sm rounded-lg px-4 py-3 mb-4 border border-green-200 flex items-center gap-2">
              <span>✓</span> {mensagem}
            </div>
          )}
          {erro && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 border border-red-200">{erro}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input value={form.codUsuario} onChange={(e) => setForm({ ...form, codUsuario: e.target.value })} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none transition"
                  placeholder="U013" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input value={form.nomeUsuario} onChange={(e) => setForm({ ...form, nomeUsuario: e.target.value })} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none transition"
                  placeholder="Seu nome completo" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none transition"
                  placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none transition"
                  placeholder="Mín. 8 caracteres" />
              </div>
              <p className="text-xs text-gray-400 mt-1">8+ caracteres, maiúscula, minúscula e número</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                <select value={form.id_setor} onChange={(e) => setForm({ ...form, id_setor: +e.target.value })} required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none transition bg-white appearance-none">
                  <option value={0}>Selecione um setor</option>
                  {setores.map((s) => (
                    <option key={s.idSetor} value={s.idSetor}>{s.codSetor} - {s.nomeSetor}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading || form.id_setor === 0}
              className="w-full bg-agm-600 hover:bg-agm-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-2">
              <UserPlus size={16} /> {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Já tem conta? <Link to="/login" className="text-agm-600 hover:text-agm-700 font-medium">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
