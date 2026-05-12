import { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth(); // Convoca o poder do nosso contexto

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      await login(email, password);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErro('❌ Credenciais inválidas, invasor!');
      } else {
        setErro('❌ Os portões do servidor não respondem.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>🏰 Entrada do Império AGM</h2>
      
      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
        <div>
          <label>E-mail:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '12px', backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>

      <p style={{ marginTop: '20px' }}>
        Ainda não faz parte do império? <Link to="/cadastrar-usuario">Recrute-se aqui</Link>
      </p>
    </div>
  );
}