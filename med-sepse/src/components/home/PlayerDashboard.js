// src/components/home/PlayerDashboard.js
import { Flame, CheckCircle2, Circle, Stethoscope } from 'lucide-react';
import { getDailyCase } from '@/lib/cases';

export default function PlayerDashboard() {
  // Dados fictícios para o protótipo
  const userStats = {
    level: 5,
    xp: 150,
    xpToNextLevel: 500,
    streak: 4,
  };

  const dailyCase = getDailyCase();
  const xpPercentage = (userStats.xp / userStats.xpToNextLevel) * 100;

  const weekData = [
    { day: 'S', done: true }, { day: 'T', done: true }, { day: 'Q', done: false },
    { day: 'Q', done: false }, { day: 'S', done: false }, { day: 'S', done: false },
    { day: 'D', done: false },
  ];

  return (
    <div className="w-full bg-card rounded-lg border">
      {/* Seção Superior: Nível e Streak */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center gap-4">
          {/* Nível e XP */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm">Nível {userStats.level}</span>
              <span className="text-xs text-foreground/70">{userStats.xp} / {userStats.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-primary/20 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
          {/* Streak */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
            <div>
              <div className="font-semibold">{userStats.streak}</div>
              <div className="text-xs text-foreground/70">Dias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção Principal: Paciente do Dia (Call to Action) */}
      <a href="#" className="block p-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">Paciente do Dia</h3>
            <p className="text-sm text-foreground/80 mt-1">{dailyCase.category}</p>
          </div>
          <Stethoscope className="w-8 h-8 text-foreground/30" />
        </div>
        <p className="text-sm text-foreground/80 mt-2 text-justify">
          {dailyCase.history}
        </p>
      </a>

      {/* Seção Inferior: Progresso Semanal */}
      <div className="p-4 border-t">
        <h3 className="text-xs font-semibold uppercase text-foreground/60 mb-3">Progresso Semanal</h3>
        <div className="flex justify-between">
          {weekData.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono">{item.day}</span>
              {item.done ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-foreground/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}