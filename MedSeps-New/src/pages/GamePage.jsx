import { Link } from 'react-router-dom';

function GamePage() {
  return (
    <div>
      <h1>Simulação de Caso Clínico</h1>
      <p>Interface de interrogatório do paciente virtual será implementada aqui.</p>
      {/* Placeholder para o jogo */}
      <div style={{ border: '1px solid #ccc', padding: '2rem', margin: '1rem 0', borderRadius: '8px' }}>
        <p><strong>Paciente:</strong> João, 58 anos.</p>
        <p><strong>Queixa Principal:</strong> "Estou com febre e me sentindo muito fraco."</p>
      </div>
      <Link to="/">
        <button>
          Voltar para o Início
        </button>
      </Link>
    </div>
  );
}

export default GamePage;