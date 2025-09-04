"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import medicalCases from "@/data/cases.json";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";
import { Clock } from "lucide-react";

const GAME_DURATION = 300;

export default function RapidoPage() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameCase, setGameCase] = useState(null);

  useEffect(() => {
    const caseIndex = Math.floor(Math.random() * medicalCases.length);
    setGameCase(medicalCases[caseIndex]);
  }, []);

  useEffect(() => {
    if (isGameOver || timeLeft <= 0) {
      if (timeLeft <= 0 && !isGameOver) {
        // CORREÇÃO: Define um valor para finalAnswers quando o tempo acaba
        setFinalAnswers({ 1: { chosen: "N/A", correct: "N/A" }, 2: { chosen: "N/A", correct: "N/A" }});
        setIsGameOver(true);
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const handleGameEnd = (answers) => {
    setFinalAnswers(answers);
    setIsGameOver(true);
  };
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!gameCase) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 pb-24 text-center">
        <p className="text-muted-foreground">Selecionando um caso clínico...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Modo Rápido</h1>
        <p className="text-muted-foreground mt-1">Analise o caso antes que o tempo acabe.</p>
      </header>

      {isGameOver ? (
        <GameOverSummary
          title={timeLeft > 0 ? "Caso Finalizado!" : "Tempo Esgotado!"}
          description="Veja o resumo do seu raciocínio clínico."
        >
          {finalAnswers && (
            <div className="p-4 rounded-lg border bg-muted/50 space-y-3 text-left text-sm">
              <div>
                <p>
                  <strong>Suspeita de Sepse:</strong> 
                  {/* CORREÇÃO: Lógica de exibição mais robusta */}
                  {finalAnswers[1]?.chosen !== "N/A" ? (
                    <span className={finalAnswers[1]?.chosen === finalAnswers[1]?.correct ? 'text-green-600' : 'text-red-600'}>
                      {` ${finalAnswers[1]?.chosen} `}
                    </span>
                  ) : (
                    <span className="text-muted-foreground"> Tempo esgotado </span>
                  )}
                  (Correto: {finalAnswers[1]?.correct !== "N/A" ? finalAnswers[1].correct : "-"})
                </p>
              </div>
              <div>
                <p>
                  <strong>Diagnóstico:</strong> 
                  {finalAnswers[2]?.chosen !== "N/A" ? (
                    <span className={finalAnswers[2]?.chosen === finalAnswers[2]?.correct ? 'text-green-600' : 'text-red-600'}>
                      {` ${finalAnswers[2]?.chosen} `}
                    </span>
                    ) : (
                    <span className="text-muted-foreground"> Tempo esgotado </span>
                  )}
                  (Correto: {finalAnswers[2]?.correct !== "N/A" ? finalAnswers[2].correct : "-"})
                </p>
              </div>
            </div>
          )}
        </GameOverSummary>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-2 text-lg font-semibold mb-2 justify-center">
              <Clock />
              <span className="font-mono">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
            <Progress value={(timeLeft / GAME_DURATION) * 100} className="w-full" />
          </div>
          <ClinicalCase gameCase={gameCase} onGameEnd={handleGameEnd} />
        </>
      )}
    </div>
  );
}