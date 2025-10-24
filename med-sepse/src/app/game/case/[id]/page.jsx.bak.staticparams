// src/app/game/case/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import medicalCases from "@/data/cases.json";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";

export default function CasePage({ params }) {
  const { id } = params;
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [gameCase, setGameCase] = useState(null);

  useEffect(() => {
    // Encontra o caso específico pelo ID da URL
    const foundCase = medicalCases.find(c => c.id === id);
    setGameCase(foundCase);
  }, [id]);

  const handleGameEnd = (answers) => {
    setFinalAnswers(answers);
    setIsGameOver(true);
  };

  if (!gameCase) {
    return <div className="text-center py-10 w-full max-w-2xl mx-auto">Carregando caso clínico...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">{gameCase.category}</h1>
        <p className="text-muted-foreground mt-1">ID do Caso: {gameCase.id}</p>
      </header>

      {isGameOver ? (
        <GameOverSummary
          title="Caso Finalizado!"
          description="Veja o resumo do seu raciocínio clínico."
        >
          {finalAnswers && (
             <div className="p-4 rounded-lg border bg-muted/50 space-y-3 text-left text-sm">
                <div>
                    <p><strong>Suspeita de Sepse:</strong> <span className={finalAnswers[1]?.chosen === finalAnswers[1]?.correct ? 'text-green-600' : 'text-red-600'}>{finalAnswers[1]?.chosen}</span> (Correto: {finalAnswers[1]?.correct})</p>
                </div>
                <div>
                    <p><strong>Diagnóstico:</strong> <span className={finalAnswers[2]?.chosen === finalAnswers[2]?.correct ? 'text-green-600' : 'text-red-600'}>{finalAnswers[2]?.chosen}</span> (Correto: {finalAnswers[2]?.correct})</p>
                </div>
                {finalAnswers[3] && (
                    <div>
                        <p><strong>Hipótese de Foco:</strong> {finalAnswers[3]?.chosen}</p>
                    </div>
                )}
            </div>
          )}
        </GameOverSummary>
      ) : (
        <ClinicalCase gameCase={gameCase} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
}