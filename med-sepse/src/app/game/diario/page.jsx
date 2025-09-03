"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { medicalCases } from "@/data/medical-cases";
import GameOverSummary from '@/components/game/GameOverSummary';
import { Calendar } from "lucide-react";

const getCaseOfTheDay = () => {
  const startDate = new Date('2024-01-01');
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const caseIndex = diffDays % medicalCases.length;
  return medicalCases[caseIndex];
};


export default function DiarioPage() {
  const [hypothesis, setHypothesis] = useState("");
  const [finalScore, setFinalScore] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const todayString = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    const lastPlayed = localStorage.getItem('lastPlayedDaily');
    if (lastPlayed === todayString) {
      setHasPlayedToday(true);
    }
  }, [todayString]);


  const gameCase = getCaseOfTheDay();

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = Math.round(Math.random() * 100);
    setFinalScore(score);
    setIsGameOver(true);
    localStorage.setItem('lastPlayedDaily', todayString);
  };

  if (hasPlayedToday) {
    return (
        <div className="w-full max-w-md mx-auto py-8 pb-24 text-center">
            <Card>
                <CardHeader>
                    <Calendar className="w-12 h-12 mx-auto text-primary mb-2"/>
                    <CardTitle className="text-2xl">Você já completou o caso de hoje!</CardTitle>
                    <CardDescription>Volte amanhã para um novo desafio e para manter sua sequência.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full"><a href="/ranking">Ver Ranking</a></Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (isGameOver) {
    return (
      <GameOverSummary
        title="Caso do Dia Finalizado!"
        description={`Sua performance no caso de hoje.`}
        score={finalScore}
        scoreLabel="Proximidade Diagnóstica"
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Caso do Dia</h1>
        <p className="text-muted-foreground mt-1">Um novo desafio a cada 24 horas.</p>
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
            <Input value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} placeholder="Ex: Sepse de foco pulmonar"/>
            <Button type="submit" className="w-full" disabled={!hypothesis}>Submeter Hipótese</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}