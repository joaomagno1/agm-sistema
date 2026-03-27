import { useEffect, useState, FormEvent } from 'react';
import api from '../services/api';

interface Setor {
  id: number;
  codSetor: string;
  nomeSetor: string;
}

function Setores() {
  const [setores, setSetores] = useState<Setor[]>([]);
  const [codSetor, setCodSetor] = useState('');
  const [nomeSetor, setNomeSetor] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const carregarSetores = async () => {
    try {
      const resposta = await api.get('/setor');
      setSetores(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar setores:", erro);
    }
  };

  const salvarSetor = async (e: FormEvent) => {
    e.preventDefault(); 
    try {
      if (editandoId) {
        // Se temos um ID na memória, é um PUT
        await api.patch(`/setor/${editandoId}`, {
          codSetor: codSetor,
          nomeSetor: nomeSetor,
        });
        setEditandoId(null); // Limpa a memória de edição após o sucesso
      } else {
        // Se NÃO temos ID, é um POST
        await api.post('/setor', {
          codSetor: codSetor,
          nomeSetor: nomeSetor,
        });
      }

      // Limpa os campos visuais e recarrega a tabela
      setCodSetor('');
      setNomeSetor('');
      carregarSetores(); 
    } catch (erro) {
      console.error("Erro ao salvar setor:", erro);
      alert("Falha na operação. Verifique os dados!");
    }
  };

  const prepararEdicao = (setor: Setor) => {
    setCodSetor(setor.codSetor); // Preenche o código
    setNomeSetor(setor.nomeSetor); // Preenche o nome
    setEditandoId(setor.id); // Avisa o React que está editando
  };

  //Função para excluir
  const excluirSetor = async (id: number) => {
    // Perguntam se o usuário tem certeza
    const confirmar = window.confirm("Tem certeza que deseja excluir este setor?");
    if (!confirmar) return; // Se ele clicar em "Cancelar", a função para aqui.

    try {
      // Envia a ordem DELETE com o ID colado na URL
      await api.delete(`/setor/${id}`);
      
      // Limpeza: Pede para carregar a tabela novamente (sem o setor apagado)
      carregarSetores(); 
      
    } catch (erro) {
      console.error("Erro ao excluir setor:", erro);
      alert("Falha ao excluir. O setor ainda resiste!");
    }
  };

  useEffect(() => {
    carregarSetores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🌾 Sistema AGM - Gestão de Setores</h1>
      
      {/* Desenho do Formulário */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', maxWidth: '600px', backgroundColor: '#fafafa' }}>
        <h3>{editandoId ? '✏️ Editando Setor' : '➕ Adicionar Novo Setor'}</h3>
        <form onSubmit={salvarSetor} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Código:</label>
            <input 
              type="text" 
              value={codSetor} 
              onChange={(e) => setCodSetor(e.target.value)} 
              required 
              placeholder="Ex: S03"
              style={{ padding: '8px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Nome do Setor:</label>
            <input 
              type="text" 
              value={nomeSetor} 
              onChange={(e) => setNomeSetor(e.target.value)} 
              required 
              placeholder="Ex: Setor Leste"
              style={{ padding: '8px' }}
            />
          </div>

          <button type="submit" style={{ padding: '9px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            {editandoId ? 'Atualizar' : 'Salvar'}
          </button>
        </form>
      </div>

      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0e0e0' }}>
            <th>ID</th>
            <th>Código</th>
            <th>Nome do Setor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {setores.map((setor) => (
            <tr key={setor.id}>
              <td style={{ textAlign: 'center' }}>{setor.id}</td>
              <td style={{ textAlign: 'center' }}>{setor.codSetor}</td>
              <td>{setor.nomeSetor}</td>

              <td style={{ textAlign: 'center' }}>

              <button
                onClick={() => prepararEdicao(setor)}
                style={{ padding: '5px 10px', backgroundColor: '#ffa500', color: 'white', border: 'none', cursor: 'pointer', marginRight: '5px' }}
              >
                Editar
              </button>

                <button 
                  onClick={() => excluirSetor(setor.id)} 
                  style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {setores.length === 0 && (
        <p style={{ marginTop: '20px', color: '#666' }}>Nenhum setor encontrado ou a carregar...</p>
      )}
    </div>
  );
}

export default Setores;