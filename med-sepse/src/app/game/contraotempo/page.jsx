"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { medicalCases } from "@/data/dados";
import { CheckCircle, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import GameOverSummary from '@/components/game/GameOverSummary';

const GAME_DURATION = 300;

export default function ContraOTempoPage() {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const gameCases = medicalCases;
  const currentCase = gameCases[currentCaseIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNextCase = () => {
    if (currentCaseIndex < gameCases.length - 1) {
      setCurrentCaseIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handleDiagnosis = (chosenDiagnosis) => {
    if (chosenDiagnosis === currentCase.finalDiagnosis) {
      setScore(prev => prev + 1);
    }
    handleNextCase();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (isGameOver) {
    return (
      <GameOverSummary
        title="Tempo Esgotado!"
        description="Seu desempenho no modo Contrarrelógio."
        score={score}
        scoreLabel="Casos classificados corretamente"
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize">Contrarrelógio</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle className="text-green-500"/>
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock />
              <span className="font-mono">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        <Progress value={(timeLeft / GAME_DURATION) * 100} className="w-full mt-2" />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Caso #{currentCaseIndex + 1}</CardTitle>
          <CardDescription>{currentCase.category} - Dificuldade: {currentCase.difficulty}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90">{currentCase.presentation}</p>
        </CardContent>
      </Card>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}