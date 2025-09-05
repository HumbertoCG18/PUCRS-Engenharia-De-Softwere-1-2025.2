"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import medicalCases from "@/data/cases.json";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";
import { Calendar } from "lucide-react";

export default function DiarioPage() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [gameCase, setGameCase] = useState(null);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  
  // 1. Estado para controlar se o componente já "montou" no cliente
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 2. Este efeito roda apenas uma vez no cliente
    setIsClient(true);

    // Lógica que depende do navegador (new Date() e localStorage)
    const todayString = new Date().toISOString().split('T')[0];
    const lastPlayed = localStorage.getItem('lastPlayedDaily');
    
    if (lastPlayed === todayString) {
      setHasPlayedToday(true);
    } else {
      // Função para selecionar o caso do dia de forma determinística
      const startDate = new Date('2024-01-01');
      const today = new Date();
      const diffTime = Math.abs(today - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const caseIndex = diffDays % medicalCases.length;
      
      setGameCase(medicalCases[caseIndex]);
      setHasPlayedToday(false);
    }
  }, []);

  const handleGameEnd = (answers) => {
    const todayString = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastPlayedDaily', todayString);
    setFinalAnswers(answers);
    setIsGameOver(true);
  };

  // 3. Renderiza um placeholder nulo no servidor e na primeira renderização do cliente
  if (!isClient) {
    return null; // ou um componente de "spinner" / "loading"
  }

  // A partir daqui, o código só roda no cliente com os dados corretos
  if (hasPlayedToday) {
    return (
        <div className="w-full max-w-md mx-auto py-8 pb-24 text-center">
            <Card>
                <CardHeader>
                    <Calendar className="w-12 h-12 mx-auto text-primary mb-2"/>
                    <CardTitle className="text-2xl">Você já completou o caso de hoje!</CardTitle>
                    <CardDescription>Volte amanhã para um novo desafio.</CardDescription>
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
        description="Sua performance no caso de hoje."
        score={finalAnswers[1]?.chosen === finalAnswers[1]?.correct && finalAnswers[2]?.chosen === finalAnswers[2]?.correct ? 100 : 0}
        scoreLabel="Pontuação"
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      {gameCase && (
        <>
          <header className="mb-4 text-center">
            <h1 className="text-3xl font-bold">Caso do Dia</h1>
            <p className="text-muted-foreground mt-1">{gameCase.category}</p>
          </header>
          <ClinicalCase gameCase={gameCase} onGameEnd={handleGameEnd} />
        </>
      )}
    </div>
  );
}