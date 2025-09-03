"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { medicalCases } from "@/data/medical-cases";
import { Target } from "lucide-react";
import GameOverSummary from '@/components/game/GameOverSummary';

export default function TreinoPage() {
  const [hypothesis, setHypothesis] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const gameCase = medicalCases.find(c => c.id === 'case001');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGameOver(true);
  };

  if (!gameCase) {
    return <div className="text-center py-10">Caso de treino não encontrado.</div>
  }

  if (isGameOver) {
    return (
      <GameOverSummary
        title="Treino Concluído!"
        description="Compare sua hipótese com o diagnóstico correto."
      >
        <div className="p-4 rounded-lg border bg-muted/50 space-y-4 text-left">
          <div>
            <h4 className="font-semibold text-sm">Sua Hipótese:</h4>
            <p className="text-muted-foreground">{hypothesis || "Nenhuma hipótese submetida."}</p>
          </div>
          <div className="p-4 rounded-md bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20">
            <h4 className="font-semibold text-sm flex items-center"><Target className="w-4 h-4 mr-2"/> Diagnóstico Correto:</h4>
            <p>{gameCase.correctDiagnosis}</p>
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
        <CardContent><p className="text-foreground/90">{gameCase.history}</p></CardContent>
      </Card>

      <Tabs defaultValue="exame_fisico" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exame_fisico">Exame Físico</TabsTrigger>
          <TabsTrigger value="exames_lab">Exames Laboratoriais</TabsTrigger>
        </TabsList>
        <TabsContent value="exame_fisico">
          <Card><CardContent className="pt-6"><p>{gameCase.physicalExam}</p></CardContent></Card>
        </TabsContent>
        <TabsContent value="exames_lab">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-1">
                <li><strong>Leucócitos:</strong> {gameCase.labResults.leukocytes}</li>
                <li><strong>Creatinina:</strong> {gameCase.labResults.creatinine}</li>
                <li><strong>Lactato:</strong> {gameCase.labResults.lactate}</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <form onSubmit={handleSubmit} className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Sua Hipótese Diagnóstica</CardTitle>
            <CardDescription>Após analisar o caso, submeta sua hipótese.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              value={hypothesis} 
              onChange={(e) => setHypothesis(e.target.value)} 
              placeholder="Ex: Sepse de foco pulmonar"
            />
            <Button type="submit" className="w-full" disabled={!hypothesis}>
              Verificar Hipótese
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}