import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Star, User } from 'lucide-react';
import api from '../services/api';

interface Gerente {
  idGerente: number;
  codGerente: string;
  nomeGerente: string;
  usuario?: { idUsuario: number; nomeUsuario: string; email: string };
}

export default function Gerentes() {
  const [dados, setDados] = useState<Gerente[]>([]);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState<Gerente | null>(null);
  const [form, setForm] = useState({ codGerente: '', nomeGerente: '', idUsuario: 0 });

  const carregar = async () => {
    try { const r = await api.get('/gerente'); setDados(r.data); } catch { setErro('Falha ao carregar.'); }
  };
  useEffect(() => { carregar(); }, []);

  const salvar = async () => {
    try {
      if (editando) { await api.patch(`/gerente/${editando.idGerente}`, form); }
      else { await api.post('/gerente', form); }
      setEditando(null); setForm({ codGerente: '', nomeGerente: '', idUsuario: 0 }); carregar();
    } catch { setErro('Erro ao salvar.'); }
  };

  const editar = (g: Gerente) => { setEditando(g); setForm({ codGerente: g.codGerente, nomeGerente: g.nomeGerente, idUsuario: g.usuario?.idUsuario || 0 }); };
  const excluir = async (id: number) => {
    if (!confirm('Excluir gerente?')) return;
    try { await api.delete(`/gerente/${id}`); carregar(); } catch { setErro('Erro ao excluir.'); }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Star size={22} /> Gerentes</h2>
        <p className="text-sm text-gray-500 mt-1">Gerencie os gerentes da fazenda</p>
      </div>

      {erro && <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 border border-red-200">{erro}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          {editando ? <><Pencil size={14} /> Editar Gerente</> : <><Plus size={14} /> Novo Gerente</>}
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input placeholder="Código" value={form.codGerente} onChange={(e) => setForm({ ...form, codGerente: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm w-28" />
          <input placeholder="Nome" value={form.nomeGerente} onChange={(e) => setForm({ ...form, nomeGerente: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm flex-1 min-w-[160px]" />
          <input placeholder="ID Usuário" type="number" value={form.idUsuario} onChange={(e) => setForm({ ...form, idUsuario: +e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm w-24" />
          <button onClick={salvar} className="bg-agm-600 hover:bg-agm-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5">
            <Save size={14} /> {editando ? 'Atualizar' : 'Criar'}
          </button>
          {editando && <button onClick={() => { setEditando(null); setForm({ codGerente: '', nomeGerente: '', idUsuario: 0 }); }}
            className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5"><X size={14} /> Cancelar</button>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Código</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nome</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Usuário</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((g, i) => (
                <tr key={g.idGerente} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 hover:bg-agm-50/50 transition`}>
                  <td className="px-5 py-3 font-medium text-gray-800">{g.codGerente}</td>
                  <td className="px-5 py-3 text-gray-600">{g.nomeGerente}</td>
                  <td className="px-5 py-3 text-gray-600">{g.usuario?.nomeUsuario || '-'}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => editar(g)} className="text-agm-600 hover:text-agm-800 font-medium text-xs mr-3 cursor-pointer inline-flex items-center gap-1"><Pencil size={12} /> Editar</button>
                    <button onClick={() => excluir(g.idGerente)} className="text-red-500 hover:text-red-700 font-medium text-xs cursor-pointer inline-flex items-center gap-1"><Trash2 size={12} /> Excluir</button>
                  </td>
                </tr>
              ))}
              {dados.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-gray-400">Nenhum gerente cadastrado.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
