import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Rotas que usam o MainLayout com a Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        {/* Adicione outras rotas que precisam da navbar aqui, ex: /rankings */}
      </Route>

      {/* Rota para página não encontrada (pode ou não ter o layout) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;