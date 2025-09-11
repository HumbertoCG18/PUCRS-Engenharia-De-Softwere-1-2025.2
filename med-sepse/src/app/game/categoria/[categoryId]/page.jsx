"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import medicalCases from "@/data/cases.json";
import categories from "@/data/categories.json";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";

export default function CategoriaGamePage() {
  const params = useParams(); 
  const { categoryId } = params;

  const [isGameOver, setIsGameOver] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [gameCase, setGameCase] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoryId) {
      const numericId = parseInt(categoryId, 10);
      
      const foundCase = medicalCases.find(c => c.categoryId === numericId);
      const foundCategory = categories.find(c => c.id === numericId);
      
      setGameCase(foundCase);
      setCategoryName(foundCategory?.name || "Desconhecida");
    }
  }, [categoryId]);

  const handleGameEnd = (answers) => {
    setFinalAnswers(answers);
    setIsGameOver(true);
  };

  if (!gameCase) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 pb-24 text-center">
        <p className="text-muted-foreground">Carregando caso clínico...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold">Jogo por Categoria</h1>
        <p className="text-muted-foreground mt-1">{categoryName}</p>
      </header>

      {isGameOver ? (
        <GameOverSummary
          title="Caso Finalizado!"
          description={`Veja o resumo do seu raciocínio para ${categoryName.toLowerCase()}.`}
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