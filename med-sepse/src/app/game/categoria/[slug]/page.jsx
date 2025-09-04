// src/app/game/categoria/[slug]/page.jsx
"use client";

import { useState } from "react";
import medicalCases from "@/data/cases.json";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";

// Esta função pertence a esta página, pois ela recebe o 'slug' da URL
const unslugify = (slug) => {
    if (!slug) return "";
    const words = slug.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function CategoriaGamePage({ params }) {
  const { slug } = params;
  const category = unslugify(slug);

  const [isGameOver, setIsGameOver] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);

  const gameCase = medicalCases.find(c => c.category === category);

  const handleGameEnd = (answers) => {
    setFinalAnswers(answers);
    setIsGameOver(true);
  };

  if (!gameCase) {
    return <div className="text-center py-10">Caso não encontrado para esta categoria.</div>
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Jogo por Categoria</h1>
        <p className="text-muted-foreground mt-1">{gameCase.category}</p>
      </header>

      {isGameOver ? (
        <GameOverSummary
          title="Caso Finalizado!"
          description={`Veja o resumo do seu raciocínio para ${gameCase.category.toLowerCase()}.`}
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