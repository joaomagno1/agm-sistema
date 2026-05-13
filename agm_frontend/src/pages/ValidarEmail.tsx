import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

export function ValidarEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'validando' | 'sucesso' | 'erro'>('validando');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('erro');
      setMensagem('Token de validação não encontrado.');
      return;
    }
    api.get(`/usuario/validar/${token}`)
      .then((r) => { setStatus('sucesso'); setMensagem(r.data.message || 'E-mail validado!'); })
      .catch((err) => { setStatus('erro'); setMensagem(err.response?.data?.message || 'Erro ao validar.'); });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          {status === 'validando' && (
            <div>
              <Loader2 className="animate-spin mx-auto text-agm-500 mb-4" size={48} />
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Validando...</h2>
              <p className="text-gray-500">Aguarde enquanto validamos seu e-mail.</p>
            </div>
          )}

          {status === 'sucesso' && (
            <div>
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h2 className="text-xl font-semibold text-gray-800 mb-3">E-mail Validado!</h2>
              <p className="text-green-600 font-medium mb-6">{mensagem}</p>
              <Link to="/login"
                className="inline-flex items-center gap-2 bg-agm-600 hover:bg-agm-700 text-white font-medium px-6 py-2.5 rounded-lg transition">
                Ir para o Login
              </Link>
            </div>
          )}

          {status === 'erro' && (
            <div>
              <XCircle className="mx-auto text-red-500 mb-4" size={48} />
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Falha na Validação</h2>
              <p className="text-red-600 font-medium mb-6">{mensagem}</p>
              <Link to="/login" className="text-agm-600 hover:text-agm-700 font-medium">Voltar ao Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
