// src/app/game/page.jsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Timer, Book, Dumbbell } from 'lucide-react';

// O ERRO ESTAVA AQUI: O array estava incompleto. Esta é a versão correta.
const gameModes = [
  {
    title: 'Modo Rápido',
    description: 'Um único caso contra o tempo. Ideal para um desafio rápido.',
    icon: Zap,
    href: '/game/rapido',
  },
  {
    title: 'Contrarrelógio',
    description: 'Resolva o máximo de casos que puder em 5 minutos.',
    icon: Timer,
    href: '/game/contraotempo',
  },
  {
    title: 'Jogo por Categoria',
    description: 'Aprofunde seus conhecimentos em uma área específica.',
    icon: Book,
    href: '/game/categoria',
  },
  {
    title: 'Modo Treino',
    description: 'Estude um caso sem pressão de tempo ou pontuação.',
    icon: Dumbbell,
    href: '/game/treino',
  },
];

export default function GameSelectionPage() {
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