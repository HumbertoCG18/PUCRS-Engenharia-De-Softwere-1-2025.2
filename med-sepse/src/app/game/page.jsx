// src/app/game/page.jsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Timer, Book, Dumbbell } from 'lucide-react';

const gameModes = [
  // ... (outros modos de jogo)
  {
    title: 'Modo Treino',
    description: 'Estude um caso sem pressão de tempo ou pontuação.',
    icon: Dumbbell,
    href: '/game/treino', // ATUALIZE ESTE LINK
  },
];

export default function GameSelectionPage() {
  // ... (o resto do código da página continua o mesmo)
  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Selecionar Modo de Jogo</h1>
        <p className="text-foreground/80 mt-2">
          Escolha como você quer treinar hoje.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gameModes.map((mode) => (
          <Link key={mode.title} href={mode.href}>
            <Card className="h-full hover:border-primary hover:bg-primary/5 transition-all flex flex-col">
              <CardHeader>
                <mode.icon className="w-8 h-8 text-primary mb-2" />
                <CardTitle>{mode.title}</CardTitle>
                <CardDescription>{mode.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}