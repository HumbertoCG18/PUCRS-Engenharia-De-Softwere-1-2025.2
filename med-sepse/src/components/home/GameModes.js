// src/components/home/GameModes.js
import { Book, Zap, Timer } from 'lucide-react';

const gameModes = [
  {
    title: 'Jogo por Categoria',
    description: 'Foque em tipos específicos de sepse.',
    icon: Book,
    color: 'text-blue-500',
  },
  {
    title: 'Modo Rápido',
    description: 'Diagnósticos rápidos contra o tempo.',
    icon: Zap,
    color: 'text-orange-500',
  },
  {
    title: 'Contra o relógio',
    description: 'Quantos casos você resolve em 5 minutos?',
    icon: Timer,
    color: 'text-red-500',
  },
];

export default function GameModes() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold">Modos de Jogo</h2>
      {gameModes.map((mode) => (
        <a
          key={mode.title}
          href="#"
          className="flex items-center p-4 bg-black/[.05] dark:bg-white/[.06] rounded-lg hover:bg-black/[.08] dark:hover:bg-white/[.10] transition-colors"
        >
          <mode.icon className={`w-8 h-8 mr-4 ${mode.color}`} />
          <div>
            <h3 className="font-semibold">{mode.title}</h3>
            <p className="text-sm text-foreground/80">{mode.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}