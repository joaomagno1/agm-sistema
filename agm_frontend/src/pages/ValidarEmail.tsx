import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';

export function ValidarEmail() {
  const [searchParams] = useSearchParams(); // O radar para capturar o ?token= da URL
  const [mensagem, setMensagem] = useState('Analisando Token');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setMensagem('❌ Nenhum token foi encontrado na requisição.');
      return;
    }

    validarNoBackend(token);
  }, [searchParams]);

  const validarNoBackend = async (token: string) => {
    try {
      await api.get(`/usuario/validar/${token}`);
      setMensagem('✅ Identidade confirmada! O seu brasão agora faz parte do império.');
      setSucesso(true);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setMensagem(`❌ Erro: ${error.response.data.message}`);
      } else {
        setMensagem('❌ Falha ao contactar ao servidor.');
      }
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '500px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>🛡️ Consagração de Cidadania</h2>
      
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: sucesso ? '#155724' : '#721c24' }}>
        {mensagem}
      </p>

      {sucesso && (
        <div style={{ marginTop: '30px' }}>
          <Link to="/" style={{ padding: '10px 20px', backgroundColor: '#2c3e50', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Ir para os Portões (Login)
          </Link>
        </div>
      )}
    </div>
  );
}