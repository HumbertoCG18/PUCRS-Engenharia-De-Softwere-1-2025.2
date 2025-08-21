// src/app/page.js
import BottomNav from '@/components/layout/BottomNav';
import DailyTracker from '@/components/home/DailyTracker';
import GameModes from '@/components/home/GameModes';

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="flex flex-col items-center p-6 sm:p-8 space-y-8 pb-24">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold">Bem-vindo, Dr(a).</h1>
            <p className="text-foreground/80">Pronto para salvar vidas hoje?</p>
          </header>
          <DailyTracker />
          <GameModes />
        </div>
      </main>

      {/* Elemento de separação com gradiente */}
      <div 
        className="fixed bottom-16 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" 
      />

      <BottomNav />
    </div>
  );
}