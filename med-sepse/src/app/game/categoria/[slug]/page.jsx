"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { medicalCases } from "@/data/medical-cases";
import GameOverSummary from '@/components/game/GameOverSummary';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

const unslugify = (slug) => {
    if (!slug) return "";
    const words = slug.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function CategoriaGamePage({ params }) {
  const { slug } = params;
  const category = unslugify(slug);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const gameCase = medicalCases.find(c => c.category === category);

  const handleDiagnosis = (chosenDiagnosis) => {
    const isCorrect = chosenDiagnosis === gameCase.finalDiagnosis;
    setFeedback({
      isCorrect: isCorrect,
      chosen: chosenDiagnosis,
      correct: gameCase.finalDiagnosis,
    });
    setIsGameOver(true);
  };

  if (!gameCase) {
    return <div className="text-center py-10">Caso não encontrado para esta categoria.</div>
  }

  if (isGameOver) {
    return (
      <GameOverSummary
        title={feedback.isCorrect ? "Diagnóstico Correto!" : "Diagnóstico Incorreto"}
        description={`Você diagnosticou como ${feedback.chosen}.`}
      >
        <div className="p-4 rounded-lg border bg-muted/50 space-y-2 text-left">
          <h4 className="font-semibold text-sm">Diagnóstico Correto:</h4>
          <p className="font-bold text-lg text-primary">{feedback.correct}</p>
           <p className="text-xs text-muted-foreground">
            {feedback.correct === 'Choque Séptico'
              ? "Este paciente apresenta hipoperfusão tecidual (hipotensão refratária / lactato > 2), caracterizando choque séptico."
              : "Este paciente apresenta disfunção orgânica secundária à infecção, mas sem sinais de hipoperfusão refratária."
            }
          </p>
        </div>
      </GameOverSummary>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Jogo por Categoria</h1>
        <p className="text-muted-foreground">{category}</p>
      </header>

      <Card>
        <CardHeader><CardTitle>Apresentação do Caso</CardTitle></CardHeader>
        <CardContent><p className="text-foreground/90">{gameCase.presentation}</p></CardContent>
      </Card>

      <Tabs defaultValue="exame_fisico" className="w-full mt-4">
        {/* ... (código das abas) ... */}
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Qual o seu diagnóstico?</CardTitle>
          <CardDescription>Com base nos dados, classifique a gravidade do quadro.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="h-auto py-4" onClick={() => handleDiagnosis('Sepse')}>
                <div className="flex flex-col items-center">
                    <ShieldCheck className="w-8 h-8 mb-2 text-green-500" />
                    <span className="font-bold">Sepse</span>
                </div>
            </Button>
            <Button variant="outline" size="lg" className="h-auto py-4" onClick={() => handleDiagnosis('Choque Séptico')}>
                <div className="flex flex-col items-center">
                    <AlertTriangle className="w-8 h-8 mb-2 text-red-500" />
                    <span className="font-bold">Choque Séptico</span>
                </div>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}