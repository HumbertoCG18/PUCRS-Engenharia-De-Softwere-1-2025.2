// src/components/home/GamificationStats.js
import { Flame, ShieldCheck, Star, Zap, Pencil } from 'lucide-react';

export default function GamificationStats() {
  // Dados fictícios (mock) para o protótipo
  const userStats = {
    level: 5,
    xp: 150,
    xpToNextLevel: 500,
    streak: 4,
    // Emblemas que o usuário já selecionou para destacar
    featuredBadges: [
      { id: 1, title: 'Início Rápido', icon: Zap, color: 'text-yellow-500' },
      { id: 2, title: 'Foco Urinário I', icon: ShieldCheck, color: 'text-blue-500' },
    ],
  };

  const xpPercentage = (userStats.xp / userStats.xpToNextLevel) * 100;

  // Criamos um array com 3 slots. Preenchemos com os emblemas em destaque e o resto com null.
  const badgeSlots = Array(3).fill(null);
  userStats.featuredBadges.forEach((badge, index) => {
    badgeSlots[index] = badge;
  });

  return (
    <div className="w-full p-4 bg-card rounded-lg border space-y-4">
      {/* Seção de Nível e Streak */}
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

      <div className="border-t border-border" />

      {/* Seção de Emblemas em Destaque */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">Emblemas em Destaque</h3>
          <button className="flex items-center gap-1 text-xs text-primary hover:underline">
            <Pencil className="w-3 h-3" />
            Editar
          </button>
        </div>
        <div className="flex justify-start items-center gap-4">
          {badgeSlots.map((badge, index) =>
            badge ? (
              // Slot preenchido com um emblema
              <div key={badge.id} className={`w-12 h-12 rounded-full flex items-center justify-center border-2 bg-card ${badge.color.replace('text-', 'border-')}`}>
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
              </div>
            ) : (
              // Slot vazio
              <div key={`empty-${index}`} className="w-12 h-12 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 border-2 border-dashed">
                <Star className="w-6 h-6 text-foreground/20" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}