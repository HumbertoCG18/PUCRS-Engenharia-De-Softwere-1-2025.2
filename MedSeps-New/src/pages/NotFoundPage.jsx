import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link to="/">
        <button>
          Voltar para a Página Inicial
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage;