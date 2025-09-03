// src/components/game/GameOverSummary.jsx
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Target } from "lucide-react";

// Este componente recebe props para ser reutilizável
export default function GameOverSummary({ title, description, score, scoreLabel, children }) {
  
  const handleRetry = () => {
    // Recarrega a página para reiniciar o jogo
    window.location.reload();
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 pb-24 text-center">
      <Card className="border-primary">
        <CardHeader>
          <Award className="w-12 h-12 mx-auto text-yellow-500 mb-2" />
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mostra a pontuação apenas se ela for fornecida */}
          {score !== undefined && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-5xl font-bold text-primary">{score}</p>
              <p className="text-muted-foreground text-sm">{scoreLabel}</p>
            </div>
          )}

          {/* 'children' é usado para conteúdo customizado, como o feedback do Modo Treino */}
          {children}
          
          <div className="flex gap-2">
            <Button onClick={handleRetry} variant="outline" className="w-full">Jogar Novamente</Button>
            <Button asChild className="w-full">
              <Link href="/game">Outros Modos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}