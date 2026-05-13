import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Users, User, Calendar } from 'lucide-react';
import api from '../services/api';

interface Funcionario {
  idFuncionario: number;
  codFuncionario: string;
  nomeFuncionario: string;
  idade: number;
  usuario?: { idUsuario: number; nomeUsuario: string; email: string };
}

export default function Funcionarios() {
  const [dados, setDados] = useState<Funcionario[]>([]);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState<Funcionario | null>(null);
  const [form, setForm] = useState({ codFuncionario: '', nomeFuncionario: '', idade: 0, idUsuario: 0 });

  const carregar = async () => {
    try { const r = await api.get('/funcionario'); setDados(r.data); } catch { setErro('Falha ao carregar.'); }
  };
  useEffect(() => { carregar(); }, []);

  const salvar = async () => {
    try {
      if (editando) { await api.patch(`/funcionario/${editando.idFuncionario}`, form); }
      else { await api.post('/funcionario', form); }
      setEditando(null); setForm({ codFuncionario: '', nomeFuncionario: '', idade: 0, idUsuario: 0 }); carregar();
    } catch { setErro('Erro ao salvar.'); }
  };

  const editar = (f: Funcionario) => { setEditando(f); setForm({ codFuncionario: f.codFuncionario, nomeFuncionario: f.nomeFuncionario, idade: f.idade, idUsuario: f.usuario?.idUsuario || 0 }); };
  const excluir = async (id: number) => {
    if (!confirm('Excluir funcionário?')) return;
    try { await api.delete(`/funcionario/${id}`); carregar(); } catch { setErro('Erro ao excluir.'); }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><Users size={22} /> Funcionários</h2>
        <p className="text-sm text-gray-500 mt-1">Gerencie os funcionários da fazenda</p>
      </div>

      {erro && <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 border border-red-200">{erro}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          {editando ? <><Pencil size={14} /> Editar Funcionário</> : <><Plus size={14} /> Novo Funcionário</>}
        </h3>
        <div className="flex gap-3 flex-wrap">
          <input placeholder="Código" value={form.codFuncionario} onChange={(e) => setForm({ ...form, codFuncionario: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm w-28" />
          <input placeholder="Nome" value={form.nomeFuncionario} onChange={(e) => setForm({ ...form, nomeFuncionario: e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm flex-1 min-w-[160px]" />
          <input placeholder="Idade" type="number" value={form.idade} onChange={(e) => setForm({ ...form, idade: +e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm w-20" />
          <input placeholder="ID Usuário" type="number" value={form.idUsuario} onChange={(e) => setForm({ ...form, idUsuario: +e.target.value })}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-agm-500 outline-none text-sm w-24" />
          <button onClick={salvar} className="bg-agm-600 hover:bg-agm-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5">
            <Save size={14} /> {editando ? 'Atualizar' : 'Criar'}
          </button>
          {editando && <button onClick={() => { setEditando(null); setForm({ codFuncionario: '', nomeFuncionario: '', idade: 0, idUsuario: 0 }); }}
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
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Idade</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Usuário</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((f, i) => (
                <tr key={f.idFuncionario} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 hover:bg-agm-50/50 transition`}>
                  <td className="px-5 py-3 font-medium text-gray-800">{f.codFuncionario}</td>
                  <td className="px-5 py-3 text-gray-600">{f.nomeFuncionario}</td>
                  <td className="px-5 py-3 text-gray-600">{f.idade}</td>
                  <td className="px-5 py-3 text-gray-600">{f.usuario?.nomeUsuario || '-'}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => editar(f)} className="text-agm-600 hover:text-agm-800 font-medium text-xs mr-3 cursor-pointer inline-flex items-center gap-1"><Pencil size={12} /> Editar</button>
                    <button onClick={() => excluir(f.idFuncionario)} className="text-red-500 hover:text-red-700 font-medium text-xs cursor-pointer inline-flex items-center gap-1"><Trash2 size={12} /> Excluir</button>
                  </td>
                </tr>
              ))}
              {dados.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">Nenhum funcionário cadastrado.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
