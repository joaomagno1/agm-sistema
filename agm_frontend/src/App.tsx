import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Setores from './pages/Setores';
import Funcionarios from './pages/Funcionarios';
import { Usuarios } from './pages/Usuario';
import { Login } from './pages/Login';
import { ValidarEmail } from './pages/ValidarEmail';
import { CadastroUsuario } from './pages/CadastroUsuario';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f0f2f5' }}>
          <nav style={{ width: '250px', backgroundColor: '#1b263b', color: 'white', padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '24px', borderBottom: '1px solid #415a77', paddingBottom: '15px', marginBottom: '20px' }}>
              Sistema AGM
            </h1>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/" style={{ display: 'block', padding: '10px 15px', backgroundColor: '#415a77', borderRadius: '5px', textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
                  Setores
                </Link>
              </li>
              <li>
                <Link to="/funcionarios" style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', color: '#ccc', transition: '0.3s' }}>
                  Funcionários
                </Link>
              </li>
              <li>
                <Link to="/usuarios" style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', color: '#ccc', transition: '0.3s' }}>
                  Usuários
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ display: 'block', padding: '10px 15px', textDecoration: 'none', color: '#ccc', transition: '0.3s' }}>
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <main style={{ flex: 1, padding: '30px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <Routes>
                <Route path="/" element={<Setores />} />
                <Route path="/funcionarios" element={<Funcionarios />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastrar-usuario" element={<CadastroUsuario />} />
                <Route path="/validar-email" element={<ValidarEmail />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
