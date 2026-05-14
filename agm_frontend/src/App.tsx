import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Star, Sprout, Package, UserCircle, LogOut, LogIn, Leaf, Loader2 } from 'lucide-react';
import Setores from './pages/Setores';
import Funcionarios from './pages/Funcionarios';
import { Usuarios } from './pages/Usuario';
import { Login } from './pages/Login';
import { ValidarEmail } from './pages/ValidarEmail';
import { CadastroUsuario } from './pages/CadastroUsuario';
import Gerentes from './pages/Gerentes';
import Lotes from './pages/Lotes';
import Insumos from './pages/Insumos';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const navItems = [
  { path: '/', label: 'Setores', icon: LayoutDashboard },
  { path: '/funcionarios', label: 'Funcionários', icon: Users },
  { path: '/gerentes', label: 'Gerentes', icon: Star },
  { path: '/lotes', label: 'Lotes de Cultivo', icon: Sprout },
  { path: '/insumos', label: 'Insumos', icon: Package },
  { path: '/usuarios', label: 'Usuários', icon: UserCircle },
];

const TIPO_GERENTE = 1;

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { token, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-agm-600" size={32} /></div>;
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const { token, usuario, loading, logout } = useAuth();
  const location = useLocation();
  const isPublicPage = ['/login', '/cadastrar-usuario', '/validar-email'].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-agm-600 mx-auto" size={32} />
          <p className="text-gray-500 text-sm mt-3">Carregando...</p>
        </div>
      </div>
    );
  }

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-agm-50 via-white to-earth-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastrar-usuario" element={<CadastroUsuario />} />
          <Route path="/validar-email" element={<ValidarEmail />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-agm-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-agm-700">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Leaf className="text-agm-300" size={24} /> AGM
          </h1>
          <p className="text-xs text-agm-300 mt-1">Agro Gestão e Monitoramento</p>
        </div>

        {usuario && (
          <div className="mx-4 mt-4 p-3 bg-agm-800/50 rounded-lg text-sm">
            <p className="text-agm-200 text-xs">Conectado como</p>
            <p className="font-medium text-white truncate">{usuario.nome}</p>
            <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${usuario.tipo === TIPO_GERENTE ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'}`}>
              {usuario.tipo === TIPO_GERENTE ? 'Gerente' : 'Funcionário'}
            </span>
          </div>
        )}

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-agm-700 text-white shadow-sm'
                    : 'text-agm-200 hover:bg-agm-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-agm-700">
          {token ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-agm-800 hover:text-red-200 transition-colors cursor-pointer"
            >
              <LogOut size={16} /> Sair
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-agm-200 hover:bg-agm-800 hover:text-white transition-colors"
            >
              <LogIn size={16} /> Entrar
            </Link>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<PrivateRoute><Setores /></PrivateRoute>} />
            <Route path="/funcionarios" element={<PrivateRoute><Funcionarios /></PrivateRoute>} />
            <Route path="/gerentes" element={<PrivateRoute><Gerentes /></PrivateRoute>} />
            <Route path="/lotes" element={<PrivateRoute><Lotes /></PrivateRoute>} />
            <Route path="/insumos" element={<PrivateRoute><Insumos /></PrivateRoute>} />
            <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
