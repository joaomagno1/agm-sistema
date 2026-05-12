import { useEffect, useState } from 'react';
import api from '../services/api';

interface Usuario {
  idUsuario: number;
  codUsuario: string;
  nomeUsuario: string;
  email: string;
  tipo: number;
}

export function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get('/usuario');
      setUsuarios(response.data);
    } catch (error) {
      setErro('Falha ao buscar os usuários.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Usuários do Sistema</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Código</th>
            <th style={{ padding: '10px' }}>Nome</th>
            <th style={{ padding: '10px' }}>E-mail</th>
            <th style={{ padding: '10px' }}>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.idUsuario}>
              <td style={{ padding: '10px' }}>{user.idUsuario}</td>
              <td style={{ padding: '10px' }}>{user.codUsuario}</td>
              <td style={{ padding: '10px' }}>{user.nomeUsuario}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.tipo === 1 ? 'Gerente' : 'Funcionário'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
