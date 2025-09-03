"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { medicalCases } from "@/data/medical-cases";
import GameOverSummary from '@/components/game/GameOverSummary';

export default function GamePage({ params }) {
  const [timeLeft, setTimeLeft] = useState(300);
  const [hypothesis, setHypothesis] = useState("");
  const [finalScore, setFinalScore] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameCase = medicalCases.find(c => !c.isDailyCase);

  useEffect(() => {
    if (isGameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && !isGameOver) {
        setIsGameOver(true);
        setFinalScore(0);
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = Math.round(Math.random() * 100);
    setFinalScore(score);
    setIsGameOver(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (isGameOver) {
    return (
      <GameOverSummary
        title="Caso Finalizado!"
        description={`Sua hipótese para o caso de ${gameCase.category.toLowerCase()}.`}
        score={finalScore}
        scoreLabel="Proximidade Diagnóstica"
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-center capitalize">Modo Rápido</h1>
        <div className="flex items-center gap-4 mt-2">
          <Progress value={(timeLeft / 300) * 100} className="w-full" />
          <span className="font-mono text-lg font-semibold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </header>

      <Card>
        <CardHeader><CardTitle>Apresentação do Caso</CardTitle></CardHeader>
        <CardContent><p className="text-foreground/90">{gameCase.presentation}</p></CardContent>
      </Card>

      <Tabs defaultValue="exame_fisico" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exame_fisico">Exame Físico</TabsTrigger>
          <TabsTrigger value="exames_lab">Exames Laboratoriais</TabsTrigger>
        </TabsList>
        <TabsContent value="exame_fisico">
          <Card>
            <CardContent className="pt-6">
              {/* CORREÇÃO AQUI */}
              <ul className="space-y-2 text-sm list-disc list-inside">
                {Object.entries(gameCase.physicalExam).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>{value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exames_lab">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm list-disc list-inside">
                {Object.entries(gameCase.labResults).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>{value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <form onSubmit={handleSubmit} className="mt-6">
        <Card>
          <CardHeader><CardTitle>Hipótese Diagnóstica</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} placeholder="Ex: Sepse de foco pulmonar" />
            <Button type="submit" className="w-full" disabled={!hypothesis}>Submeter Hipótese</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}