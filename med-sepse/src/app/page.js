// src/app/page.js
import BottomNav from '@/components/layout/BottomNav';
import DailyTracker from '@/components/home/DailyTracker';
import GameModes from '@/components/home/GameModes';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

export default function Home() {
  return (
    // O div com min-h-screen foi removido. A <main> agora é o elemento raiz.
    <main className="p-6 sm:p-8 space-y-8 pb-40">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Bem-vindo, Dr(a).</h1>
            <p className="text-foreground/80">Pronto para salvar vidas hoje?</p>
          </div>
          <ThemeSwitcher />
        </header>

        <DailyTracker />
        <GameModes />
      </div>

      {/* Os elementos fixos continuam aqui, independentes do layout principal */}
      <div 
        className="fixed bottom-16 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" 
      />
      <BottomNav />
    </main>
  );
}