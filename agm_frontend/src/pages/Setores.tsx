import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Save, X } from 'lucide-react';
import api from '../services/api';

interface Setor {
  idSetor: number;
  codSetor: string;
  nomeSetor: string;
}

export default function Setores() {
  const [setores, setSetores] = useState<Setor[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editando, setEditando] = useState<Setor | null>(null);
  const [form, setForm] = useState({ codSetor: '', nomeSetor: '' });
  const limit = 10;

  const carregar = async () => {
    setLoading(true);
    try {
      const r = await api.get(`/setor?page=${page}&limit=${limit}`);
      setSetores(r.data.data);
      setTotal(r.data.total || r.data.data.length);
    } catch { setErro('Falha ao carregar setores.'); } finally { setLoading(false); }
  };

  useEffect(() => { carregar(); }, [page]);

  const salvar = async () => {
    try {
      if (editando) { await api.patch(`/setor/${editando.idSetor}`, form); }
      else { await api.post('/setor', form); }
      setEditando(null); setForm({ codSetor: '', nomeSetor: '' }); carregar();
    } catch { setErro('Erro ao salvar.'); }
  };

  const editar = (s: Setor) => { setEditando(s); setForm({ codSetor: s.codSetor, nomeSetor: s.nomeSetor }); };
  const excluir = async (id: number) => {
    if (!confirm('Excluir setor?')) return;
    try { await api.delete(`/setor/${id}`); carregar(); } catch { setErro('Erro ao excluir.'); }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Setores</h2>
          <p className="text-sm text-gray-500 mt-1">Gerencie os setores da fazenda</p>
        </div>
      </div>

      {erro && <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 border border-red-200">{erro}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          {editando ? <><Pencil size={14} /> Editar Setor</> : <><Plus size={14} /> Novo Setor</>}
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input placeholder="Código (ex: S01)" value={form.codSetor} onChange={(e) => setForm({ ...form, codSetor: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 focus:border-agm-500 outline-none text-sm w-36" />
          <input placeholder="Nome do Setor" value={form.nomeSetor} onChange={(e) => setForm({ ...form, nomeSetor: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm flex-1 min-w-[200px]" />
          <button onClick={salvar} className="bg-agm-600 hover:bg-agm-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5">
            <Save size={14} /> {editando ? 'Atualizar' : 'Criar'}
          </button>
          {editando && (
            <button onClick={() => { setEditando(null); setForm({ codSetor: '', nomeSetor: '' }); }}
              className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5">
              <X size={14} /> Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Código</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nome</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="px-5 py-12 text-center text-gray-400">Carregando...</td></tr>
              ) : setores.length === 0 ? (
                <tr><td colSpan={3} className="px-5 py-12 text-center text-gray-400">Nenhum setor encontrado.</td></tr>
              ) : (
                setores.map((s, i) => (
                  <tr key={s.idSetor} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 hover:bg-agm-50/50 transition`}>
                    <td className="px-5 py-3 font-medium text-gray-800">{s.codSetor}</td>
                    <td className="px-5 py-3 text-gray-600">{s.nomeSetor}</td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => editar(s)} className="text-agm-600 hover:text-agm-800 font-medium text-xs mr-3 cursor-pointer inline-flex items-center gap-1">
                        <Pencil size={12} /> Editar
                      </button>
                      <button onClick={() => excluir(s.idSetor)} className="text-red-500 hover:text-red-700 font-medium text-xs cursor-pointer inline-flex items-center gap-1">
                        <Trash2 size={12} /> Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500">Total: {total} setores</p>
            <div className="flex gap-1 items-center">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)}
                className="px-3 py-1.5 text-xs rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer inline-flex items-center gap-1">
                <ChevronLeft size={12} /> Anterior
              </button>
              <span className="px-3 py-1.5 text-xs text-gray-600">Página {page} de {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}
                className="px-3 py-1.5 text-xs rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-100 transition cursor-pointer inline-flex items-center gap-1">
                Próxima <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
