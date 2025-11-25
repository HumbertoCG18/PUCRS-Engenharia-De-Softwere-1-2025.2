"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Flame, CheckCircle2, Circle, Stethoscope, Trophy, Activity } from 'lucide-react';
import { getCases } from '@/lib/cases';
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';

export default function PlayerDashboard() {
  const { user, loading } = useAuth();
  const dailyCase = getCases(); // Em um app real, isso viria de uma lógica de "caso do dia" baseada em data

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Carregando dados do plantão...</div>;
  }

  // Fallback para caso o usuário não esteja logado (embora o AuthContext deva proteger)
  // ou se os dados estiverem incompletos
  const stats = user?.profileData || {
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
    streak: 0
  };

  const xpPercentage = Math.min(100, (stats.xp / stats.xpToNextLevel) * 100);

  // Mock da semana (futuramente virá do histórico do usuário)
  const weekData = [
    { day: 'S', done: true }, { day: 'T', done: true }, { day: 'Q', done: false },
    { day: 'Q', done: false }, { day: 'S', done: false }, { day: 'S', done: false },
    { day: 'D', done: false },
  ];

  return (
    <div className="space-y-6">
      {/* Card Principal de Status */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        {/* Cabeçalho com Gradiente Suave */}
        <div className="bg-primary/5 p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nível {stats.level}</p>
              <p className="text-sm font-bold">{stats.xp} <span className="text-muted-foreground font-normal">/ {stats.xpToNextLevel} XP</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border">
            <Flame className={`w-5 h-5 ${stats.streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-muted-foreground'}`} />
            <span className="font-bold">{stats.streak}</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">dias seguidos</span>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Barra de Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progresso do Nível</span>
              <span>{Math.round(xpPercentage)}%</span>
            </div>
            <Progress value={xpPercentage} className="h-2" />
          </div>

          {/* Card do Caso do Dia */}
          {dailyCase ? (
            <Link href="/game/diario" className="block group">
              <div className="border rounded-lg p-4 hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Stethoscope className="w-24 h-24 -mr-8 -mt-8 text-primary" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                      Caso do Dia
                    </span>
                    <Activity className="w-4 h-4 text-muted-foreground" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {dailyCase.category || "Clínica Médica"}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {dailyCase.presentation}
                  </p>
                  
                  <div className="mt-4 flex items-center text-xs text-primary font-medium">
                    Resolver Caso <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-6 text-center border rounded-lg border-dashed text-muted-foreground">
              Nenhum caso disponível no momento.
            </div>
          )}
        </div>

        {/* Rodapé: Progresso Semanal */}
        <div className="bg-muted/20 p-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-muted-foreground">Sua semana</span>
            <div className="flex gap-2">
              {weekData.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground font-mono">{item.day}</span>
                  {item.done ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}