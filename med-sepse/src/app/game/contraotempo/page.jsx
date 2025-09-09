"use client";

import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import medicalCases from "@/data/cases.json";
import GameOverSummary from '@/components/game/GameOverSummary';
import ClinicalCase from "@/components/game/ClinicalCase";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const GAME_DURATION = 300; // 5 minutos

const shuffleArray = (array) => {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export default function ContraOTempoPage() {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  // NOVOS ESTADOS para contadores e relatório
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [incorrectCases, setIncorrectCases] = useState([]);
  
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameCases, setGameCases] = useState([]);
  
  const gameContainerRef = useRef(null);

  useEffect(() => {
    setGameCases(shuffleArray([...medicalCases]));
  }, []);
  
  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentCaseIndex]);

  const currentCase = gameCases[currentCaseIndex];

  useEffect(() => {
    if (timeLeft <= 0 || isGameOver) {
      if (!isGameOver) setIsGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const handleCaseComplete = (answers) => {
    const isCorrect = answers[2]?.chosen === answers[2]?.correct;
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
      // Guarda o caso e as respostas para o relatório final
      setIncorrectCases(prev => [...prev, { ...currentCase, userAnswers: answers }]);
    }

    if (currentCaseIndex < gameCases.length - 1) {
      setCurrentCaseIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
        score={`${correctCount} / ${correctCount + incorrectCount}`}
        scoreLabel="Casos classificados corretamente"
        incorrectCases={incorrectCases} // Passa os casos errados para o sumário
      />
    );
  }

  return (
    <div ref={gameContainerRef} className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold capitalize">Contrarrelógio</h1>
          <div className="flex items-center gap-4">
            {/* Contador de Acertos */}
            <div className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle className="text-green-500"/>
              <span>{correctCount}</span>
            </div>
            {/* Contador de Erros */}
            <div className="flex items-center gap-2 text-lg font-semibold">
              <XCircle className="text-red-500"/>
              <span>{incorrectCount}</span>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock />
              <span className="font-mono">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        <Progress value={(timeLeft / GAME_DURATION) * 100} className="w-full mt-2" />
      </header>
      
      <div className="mt-6">
        <p className="text-center text-sm text-muted-foreground mb-2">Caso {currentCaseIndex + 1} de {gameCases.length}</p>
        <ClinicalCase 
          key={currentCase.id} 
          gameCase={currentCase} 
          onGameEnd={handleCaseComplete} 
        />
      </div>
    </div>
  );
}