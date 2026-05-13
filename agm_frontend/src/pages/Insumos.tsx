import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Package, Sprout } from 'lucide-react';
import api from '../services/api';

interface Insumo {
  idInsumo: number;
  descricao: string;
  lote?: { idLote: number; nomeLote: string };
}

export default function Insumos() {
  const [dados, setDados] = useState<Insumo[]>([]);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState<Insumo | null>(null);
  const [form, setForm] = useState({ descricao: '', loteId: 0 });

  const carregar = async () => {
    try { const r = await api.get('/insumo'); setDados(r.data); } catch { setErro('Falha ao carregar.'); }
  };
  useEffect(() => { carregar(); }, []);

  const salvar = async () => {
    try {
      if (editando) { await api.patch(`/insumo/${editando.idInsumo}`, form); }
      else { await api.post('/insumo', form); }
      setEditando(null); setForm({ descricao: '', loteId: 0 }); carregar();
    } catch { setErro('Erro ao salvar.'); }
  };

  const editar = (i: Insumo) => { setEditando(i); setForm({ descricao: i.descricao, loteId: i.lote?.idLote || 0 }); };
  const excluir = async (id: number) => {
    if (!confirm('Excluir insumo?')) return;
    try { await api.delete(`/insumo/${id}`); carregar(); } catch { setErro('Erro ao excluir.'); }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Package size={22} /> Insumos</h2>
        <p className="text-sm text-gray-500 mt-1">Gerencie os insumos e materiais dos lotes</p>
      </div>

      {erro && <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 border border-red-200">{erro}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          {editando ? <><Pencil size={14} /> Editar Insumo</> : <><Plus size={14} /> Novo Insumo</>}
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input placeholder="Descrição do insumo" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm flex-1 min-w-[240px]" />
          <input placeholder="ID Lote" type="number" value={form.loteId} onChange={(e) => setForm({ ...form, loteId: +e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm w-24" />
          <button onClick={salvar} className="bg-agm-600 hover:bg-agm-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5">
            <Save size={14} /> {editando ? 'Atualizar' : 'Criar'}
          </button>
          {editando && <button onClick={() => { setEditando(null); setForm({ descricao: '', loteId: 0 }); }}
            className="bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5"><X size={14} /> Cancelar</button>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-600"><div className="flex items-center gap-1"><Package size={14} /> Descrição</div></th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600"><div className="flex items-center gap-1"><Sprout size={14} /> Lote</div></th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((i, idx) => (
                <tr key={i.idInsumo} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 hover:bg-agm-50/50 transition`}>
                  <td className="px-5 py-3 font-medium text-gray-800">{i.descricao}</td>
                  <td className="px-5 py-3 text-gray-600">{i.lote?.nomeLote || '-'}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => editar(i)} className="text-agm-600 hover:text-agm-800 font-medium text-xs mr-3 cursor-pointer inline-flex items-center gap-1"><Pencil size={12} /> Editar</button>
                    <button onClick={() => excluir(i.idInsumo)} className="text-red-500 hover:text-red-700 font-medium text-xs cursor-pointer inline-flex items-center gap-1"><Trash2 size={12} /> Excluir</button>
                  </td>
                </tr>
              ))}
              {dados.length === 0 && <tr><td colSpan={3} className="px-5 py-12 text-center text-gray-400">Nenhum insumo cadastrado.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
