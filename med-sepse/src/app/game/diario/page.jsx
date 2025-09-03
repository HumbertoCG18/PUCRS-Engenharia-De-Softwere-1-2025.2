"use client";

import { useState, useEffect } from "react";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";
import { getDailyCase } from "@/lib/cases";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function DiarioPage() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [hasPlayedToday, setHasPlayedToday] = useState(true); // Começa como true para evitar flash de conteúdo
  const [gameCase, setGameCase] = useState(null);

  useEffect(() => {
    const todayString = new Date().toISOString().split('T')[0];
    const lastPlayed = localStorage.getItem('lastPlayedDaily');
    if (lastPlayed === todayString) {
      setHasPlayedToday(true);
    } else {
      setHasPlayedToday(false);
    }
    setGameCase(getDailyCase());
  }, []);

  const handleGameEnd = (answers) => {
    const todayString = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastPlayedDaily', todayString);
    setFinalAnswers(answers);
    setIsGameOver(true);
  };

  if (hasPlayedToday === null || !gameCase) {
    return <div>Carregando...</div>; // Estado de carregamento
  }

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

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Caso do Dia</h1>
        <p className="text-muted-foreground mt-1">{gameCase.category}</p>
      </header>

      {isGameOver ? (
        <GameOverSummary
          title="Caso do Dia Concluído!"
          description="Veja seu desempenho."
        >
             <div className="p-4 rounded-lg border bg-muted/50 space-y-3 text-left text-sm">
                <div>
                    <p><strong>Suspeita de Sepse:</strong> <span className={finalAnswers[1]?.chosen === finalAnswers[1]?.correct ? 'text-green-600' : 'text-red-600'}>{finalAnswers[1]?.chosen}</span> (Correto: {finalAnswers[1]?.correct})</p>
                </div>
                <div>
                    <p><strong>Diagnóstico:</strong> <span className={finalAnswers[2]?.chosen === finalAnswers[2]?.correct ? 'text-green-600' : 'text-red-600'}>{finalAnswers[2]?.chosen}</span> (Correto: {finalAnswers[2]?.correct})</p>
                </div>
            </div>
        </GameOverSummary>
      ) : (
        <ClinicalCase gameCase={gameCase} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
}