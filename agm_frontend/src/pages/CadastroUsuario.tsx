import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export function CadastroUsuario() {
  const [codUsuario, setCodUsuario] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    try {
      await api.post('/usuario', { codUsuario, nomeUsuario, email, senha });
      setSucesso('Registro realizado! Verifique seu e-mail para validar a identidade.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErro(error.response.data.message);
      } else {
        setErro('Erro ao registrar. Tente novamente.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Cadastro de Usuário</h2>

      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green', fontWeight: 'bold' }}>{sucesso}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Código do Usuário:</label>
          <input type="text" value={codUsuario} onChange={(e) => setCodUsuario(e.target.value)} required placeholder="Ex: U013" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label>Nome Completo:</label>
          <input type="text" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} required placeholder="Seu nome" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label>E-mail:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ padding: '12px', backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
          Registrar
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
}
