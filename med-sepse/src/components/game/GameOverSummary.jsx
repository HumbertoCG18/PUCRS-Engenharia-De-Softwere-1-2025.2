// src/components/game/GameOverSummary.jsx
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Target } from "lucide-react"; // Adicione Target, se ainda não estiver lá

export default function GameOverSummary({ title, description, score, scoreLabel, children }) {
  
  const handleRetry = () => {
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
          {score !== undefined && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-5xl font-bold text-primary">{score}</p>
              <p className="text-muted-foreground text-sm">{scoreLabel}</p>
            </div>
          )}

          {children}
          
          {/* ALTERAÇÃO AQUI: De 'flex gap-2' para 'flex flex-col gap-2' */}
          <div className="flex flex-col gap-2"> 
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