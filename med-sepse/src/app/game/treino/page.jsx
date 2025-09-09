"use client";

import { useState } from "react";
// Corrigindo o caminho da importação de dados
import medicalCases from "@/data/cases.json"; 
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";

export default function TreinoPage() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);

  // Seleciona o primeiro caso da nossa base de dados para o modo treino
  const gameCase = medicalCases[0];

  // Esta função é passada para o ClinicalCase e será chamada quando o jogo terminar
  const handleGameEnd = (answers) => {
    setFinalAnswers(answers);
    setIsGameOver(true);
  };

  if (!gameCase) {
    return <div className="text-center py-10">Caso de treino não encontrado.</div>
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Modo Treino</h1>
        <p className="text-muted-foreground mt-1">{gameCase.category}</p>
      </header>

      {isGameOver ? (
        // Quando o jogo termina, exibe o sumário com as respostas
        <GameOverSummary
          title="Treino Concluído!"
          description="Veja o resumo do seu raciocínio clínico."
        >
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
        </GameOverSummary>
      ) : (
        // Enquanto o jogo está ativo, renderiza o componente ClinicalCase
        <ClinicalCase gameCase={gameCase} onGameEnd={handleGameEnd} />
      )}
    </div>
  );
}