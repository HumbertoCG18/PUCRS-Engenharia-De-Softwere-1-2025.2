// src/app/page.js
import GameModes from '@/components/home/GameModes';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import PlayerDashboard from '@/components/home/PlayerDashboard';

export default function Home() {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 space-y-8">
        <header className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Bem-vindo, Dr(a).</h1>
            <p className="text-foreground/80">Pronto para salvar vidas hoje?</p>
          </div>
          <ThemeSwitcher />
        </header>

        {/* 2. Substituir os dois componentes antigos pelo PlayerDashboard */}
        <PlayerDashboard />

        <GameModes />

        <div className="h-32" />
      </div>
    </>
  );
}