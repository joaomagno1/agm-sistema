import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

interface Usuario {
  idUsuario: number;
  codUsuario: string;
  nomeUsuario: string;
  email: string;
  tipo: number;
  setor?: { idSetor: number; codSetor: string; nomeSetor: string };
}

export function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get('/usuario').then((r) => setUsuarios(r.data)).catch(() => setErro('Falha ao buscar usuários.'));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Usuários</h2>
          <p className="text-sm text-gray-500 mt-1">Usuários cadastrados no sistema</p>
        </div>
        <Link to="/cadastrar-usuario"
          className="bg-agm-600 hover:bg-agm-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition">
          Novo Usuário
        </Link>
      </div>

      {erro && <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4 border border-red-200">{erro}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Código</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nome</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">E-mail</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Tipo</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Setor</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={u.idUsuario} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-50 hover:bg-agm-50/50 transition`}>
                  <td className="px-5 py-3 font-medium text-gray-800">{u.codUsuario}</td>
                  <td className="px-5 py-3 text-gray-600">{u.nomeUsuario}</td>
                  <td className="px-5 py-3 text-gray-600">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${u.tipo === 1 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {u.tipo === 1 ? 'Gerente' : 'Funcionário'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{u.setor?.nomeSetor || '-'}</td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">Nenhum usuário encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
