import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';
import AccuracyChart from '../components/dashboard/AccuracyChart';
import CommonCases from '../components/dashboard/CommonCases';

// Mock de dados do residente
const residentData = {
  name: 'Silva',
  points: 12840,
  rank: 8,
};

function HomePage() {
  return (
    <div className="px-4 py-2 space-y-6">
      {/* Cabeçalho de Boas-vindas */}
      <div>
        <h1 className="text-3xl font-bold text-white">Olá, Dr(a). {residentData.name}</h1>
        <p className="text-md text-gray-400">Aqui está o seu progresso.</p>
      </div>

      {/* Card de Pontuação e Ranking */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-200">Sua Pontuação</p>
          <p className="text-3xl font-bold text-white">{residentData.points.toLocaleString('pt-BR')}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-blue-200">Ranking</p>
          <p className="text-3xl font-bold text-white">#{residentData.rank}</p>
        </div>
        <Award size={48} className="text-yellow-300 opacity-30" />
      </div>

      {/* Gráfico de Desempenho */}
      <AccuracyChart />

      {/* Card de Casos Comuns */}
      <CommonCases />

      {/* Botão de Ação Flutuante (alternativa ao card de ação) */}
      <div className="mt-8 text-center">
        <Link to="/game">
           <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
            Iniciar Simulação
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;