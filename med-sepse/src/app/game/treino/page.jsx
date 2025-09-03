"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { medicalCases } from "@/data/medical-cases";
import { AlertTriangle, ShieldCheck, Target } from "lucide-react";
import GameOverSummary from '@/components/game/GameOverSummary';

export default function TreinoPage() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [chosenDiagnosis, setChosenDiagnosis] = useState(null);

  const gameCase = medicalCases.find(c => c.id === 'case001');

  const handleDiagnosis = (diagnosis) => {
    setChosenDiagnosis(diagnosis);
    setIsGameOver(true);
  };

  if (!gameCase) {
    return <div className="text-center py-10">Caso de treino não encontrado.</div>
  }

  if (isGameOver) {
    return (
      <GameOverSummary
        title="Treino Concluído!"
        description="Compare sua escolha com o diagnóstico e a justificativa corretos."
      >
        <div className="p-4 rounded-lg border bg-muted/50 space-y-4 text-left">
          <div>
            <h4 className="font-semibold text-sm">Sua Escolha:</h4>
            <p className="text-muted-foreground">{chosenDiagnosis || "Nenhuma"}</p>
          </div>
          <div className="p-4 rounded-md bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20">
            <h4 className="font-semibold text-sm flex items-center"><Target className="w-4 h-4 mr-2"/> Diagnóstico Correto:</h4>
            <p className="font-bold">{gameCase.finalDiagnosis}</p>
            <p className="text-xs mt-1">
              {gameCase.finalDiagnosis === 'Choque Séptico'
                ? "Este paciente apresenta hipoperfusão tecidual (hipotensão refratária / lactato > 2), caracterizando choque séptico."
                : "Este paciente apresenta disfunção orgânica secundária à infecção, mas sem sinais de hipoperfusão refratária."
              }
            </p>
          </div>
        </div>
      </GameOverSummary>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
       <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Modo Treino</h1>
        <p className="text-muted-foreground mt-1">{gameCase.category}</p>
      </header>
      
      <Card className="mb-4">
        <CardHeader><CardTitle>Apresentação do Caso</CardTitle></CardHeader>
        <CardContent><p className="text-foreground/90">{gameCase.presentation}</p></CardContent>
      </Card>
      
      <Tabs defaultValue="exame_fisico" className="w-full mt-4">
        {/* ... (código das abas) ... */}
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Qual o seu diagnóstico?</CardTitle>
          <CardDescription>Após analisar, selecione a classificação do quadro.</CardDescription>
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