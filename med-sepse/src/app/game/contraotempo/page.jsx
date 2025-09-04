"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import medicalCases from "@/data/cases.json";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";
import { CheckCircle, Clock } from "lucide-react";

const GAME_DURATION = 300; // 5 minutos

// Função para embaralhar o array de casos, para dar variedade a cada partida
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function ContraOTempoPage() {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // Embaralhamos os casos no início do jogo e guardamos no estado
  const [gameCases, setGameCases] = useState([]);
  useEffect(() => {
    setGameCases(shuffleArray([...medicalCases]));
  }, []);

  const currentCase = gameCases[currentCaseIndex];

  // Efeito para o timer principal
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Função chamada pelo ClinicalCase quando um caso é finalizado
  const handleCaseComplete = (answers) => {
    // Verifica se a resposta do estágio 2 (Sepse vs Choque) está correta
    if (answers[2]?.chosen === answers[2]?.correct) {
      setScore(prev => prev + 1);
    }

    // Avança para o próximo caso
    if (currentCaseIndex < gameCases.length - 1) {
      setCurrentCaseIndex(prev => prev + 1);
    } else {
      // Se acabarem os casos, o jogo termina
      setIsGameOver(true);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Mostra um estado de carregamento enquanto os casos são embaralhados
  if (!currentCase) {
    return (
        <div className="w-full max-w-2xl mx-auto py-8 pb-24 text-center">
            <p className="text-muted-foreground">Preparando os casos clínicos...</p>
        </div>
    );
  }

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
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
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
      
      {/* Renderiza o componente do caso clínico atual */}
      <div className="mt-6">
        <p className="text-center text-sm text-muted-foreground mb-2">Caso {currentCaseIndex + 1} de {gameCases.length}</p>
        <ClinicalCase gameCase={currentCase} onGameEnd={handleCaseComplete} />
      </div>
    </div>
  );
}