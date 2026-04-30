import { useEffect, useState } from 'react';
import api from '../services/api.js'; // Sua ponte do Axios
import { Usuario } from '../types/usuario.js';

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
      setErro('Falha ao buscar os usuários do império.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2> Salão de Membros (Usuários)</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Nome</th>
            <th style={{ padding: '10px' }}>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: '10px' }}>{user.id}</td>
              <td style={{ padding: '10px' }}>{user.nome}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}