import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Timer, Book, Dumbbell, Calendar, ArrowRight } from 'lucide-react';

export default function GameSelectionPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-32">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Modos de Jogo</h1>
        <p className="text-foreground/80 mt-2">
          Escolha como você quer treinar o diagnóstico de sepse hoje.
        </p>
      </header>

      <div className="space-y-10">
        {/* 1. Destaque Principal: Caso do Dia */}
        <section>
          <Link href="/game/diario">
            <Card className="border-primary bg-primary/5 hover:bg-primary/10 transition-all group">
              <CardHeader className="flex-row items-center gap-4">
                <Calendar className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-grow">
                  <CardTitle>Caso do Dia</CardTitle>
                  <CardDescription>Um novo desafio clínico a cada 24 horas para testar suas habilidades.</CardDescription>
                </div>
                <ArrowRight className="w-6 h-6 text-primary/70 group-hover:translate-x-1 transition-transform" />
              </CardHeader>
            </Card>
          </Link>
        </section>

        {/* 2. Grupo: Desafios Cronometrados */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Desafios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/game/rapido">
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <Zap className="w-8 h-8 text-orange-500 mb-2" />
                  <CardTitle>Modo Rápido</CardTitle>
                  <CardDescription>Enfrente um único caso clínico contra o tempo.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/game/contraotempo">
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <Timer className="w-8 h-8 text-red-500 mb-2" />
                  <CardTitle>Contrarrelógio</CardTitle>
                  <CardDescription>Resolva o máximo de casos que puder em 5 minutos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* 3. Grupo: Prática Livre */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Prática Livre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/game/categoria">
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <Book className="w-8 h-8 text-blue-500 mb-2" />
                  <CardTitle>Jogo por Categoria</CardTitle>
                  <CardDescription>Aprofunde seus conhecimentos em um foco específico.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/game/treino">
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <Dumbbell className="w-8 h-8 text-green-500 mb-2" />
                  <CardTitle>Modo Treino</CardTitle>
                  <CardDescription>Estude os casos sem pressão de tempo ou pontuação.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}