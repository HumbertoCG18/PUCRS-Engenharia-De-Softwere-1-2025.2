// src/components/home/GameModes.js
import Link from 'next/link'; // 1. Importar o Link
import { Book, Zap, Timer } from 'lucide-react';

const gameModes = [
  {
    title: 'Jogo por Categoria',
    description: 'Foque em tipos específicos de sepse.',
    icon: Book,
    color: 'text-blue-500',
    href: '/game/categoria', // Adicionar href para cada modo
  },
  {
    title: 'Modo Rápido',
    description: 'Diagnósticos rápidos contra o tempo.',
    icon: Zap,
    color: 'text-orange-500',
    href: '/game/rapido',
  },
  {
    title: 'Contrarrelógio',
    description: 'Quantos casos você resolve em 5 minutos?',
    icon: Timer,
    color: 'text-red-500',
    href: '/game/contraotempo',
  },
];

export default function GameModes() {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-lg font-semibold">Modos de Jogo</h2>
      {gameModes.map((mode) => (
        // 2. Transformar a tag 'a' em um componente Link
        <Link
          key={mode.title}
          href={mode.href}
          className="flex items-center p-4 bg-card rounded-lg border hover:border-primary transition-colors"
        >
          <mode.icon className={`w-8 h-8 mr-4 ${mode.color}`} />
          <div>
            <h3 className="font-semibold">{mode.title}</h3>
            <p className="text-sm text-foreground/80">{mode.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}