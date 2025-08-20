import { Outlet } from 'react-router-dom';
import BottomNav from '../ui/BottomNav';

function MainLayout() {
  return (
    // Adicionamos pb-16 (padding-bottom: 4rem) para que o conteúdo não fique atrás da BottomNav
    <div className="min-h-screen bg-gray-800 text-white pb-16 md:pb-0">
      <main>
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet /> {/* O conteúdo da página será renderizado aqui */}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default MainLayout;