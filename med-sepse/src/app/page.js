// src/app/page.js
import BottomNav from '@/components/layout/BottomNav';
import DailyTracker from '@/components/home/DailyTracker';
import GameModes from '@/components/home/GameModes';

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      {/* O padding-bottom (pb-24) evita que o conteúdo seja sobreposto pela BottomNav */}
      <main className="flex flex-col items-center p-6 sm:p-8 space-y-8 pb-24">
        {/* Container para centralizar o conteúdo em telas maiores */}
        <div className="w-full max-w-2xl mx-auto space-y-8">
          {/* Mensagem de Boas-Vindas */}
          <header>
            <h1 className="text-3xl font-bold">Bem-vindo, Dr(a).</h1>
            <p className="text-foreground/80">Pronto para salvar vidas hoje?</p>
          </header>

          {/* Componentes */}
          <DailyTracker />
          <GameModes />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}