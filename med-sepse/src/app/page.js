// src/app/page.js
import BottomNav from '@/components/layout/BottomNav';
import DailyTracker from '@/components/home/DailyTracker';
import GameModes from '@/components/home/GameModes';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';

export default function Home() {
  return (
    <>
      <main className="py-6 sm:py-8 space-y-8 pb-32">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          <header className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Bem-vindo, Dr(a).</h1>
              <p className="text-foreground/80">Pronto para salvar vidas hoje?</p>
            </div>
            <ThemeSwitcher />
          </header>
          <DailyTracker />
          <GameModes />
            <div className="h-10" />
        </div>
      </main>
      
      <BottomNav />
    </>
  );
}