"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle } from "lucide-react";

// Este componente gerencia o fluxo de um único caso clínico
export default function ClinicalCase({ gameCase, onGameEnd }) {
  const [currentStage, setCurrentStage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [focusHypothesis, setFocusHypothesis] = useState("");

  const handleStage1Answer = (answer) => {
    setAnswers(prev => ({ ...prev, 1: { chosen: answer, correct: gameCase.stage1.correctOption }}));
    setCurrentStage(2);
  };

  const handleStage2Answer = (answer) => {
    const newAnswers = { ...answers, 2: { chosen: answer, correct: gameCase.stage2.correctOption }};
    setAnswers(newAnswers);
    
    // Se a resposta for "Sepse" E o caso tiver um estágio 3, vá para ele.
    if (answer === 'Sepse' && gameCase.stage3) {
      setCurrentStage(3);
    } else {
      // Caso contrário, finalize o jogo.
      onGameEnd(newAnswers);
    }
  };

  const handleStage3Submit = (e) => {
    e.preventDefault();
    const finalAnswers = { ...answers, 3: { chosen: focusHypothesis }};
    onGameEnd(finalAnswers);
  };

  return (
    <div className="space-y-6">
      {/* Estágio 1: Suspeita de Sepse */}
      <Card>
        <CardHeader>
          <CardTitle>Estágio 1: Avaliação Inicial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90">{gameCase.stage1.presentation}</p>
          <p className="font-mono text-sm p-3 bg-muted rounded-md">{gameCase.stage1.vitals}</p>
          <div className="border-t pt-4">
            <p className="font-semibold mb-2">{gameCase.stage1.question}</p>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => handleStage1Answer('Sim')} variant={answers[1]?.chosen === 'Sim' ? 'default' : 'outline'} disabled={currentStage > 1}>Sim</Button>
              <Button onClick={() => handleStage1Answer('Não')} variant={answers[1]?.chosen === 'Não' ? 'default' : 'outline'} disabled={currentStage > 1}>Não</Button>
            </div>
            {currentStage > 1 && (
              <div className={`mt-2 flex items-center text-sm font-semibold ${answers[1]?.chosen === answers[1]?.correct ? 'text-green-500' : 'text-red-500'}`}>
                {answers[1]?.chosen === answers[1]?.correct ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                Resposta Correta: {answers[1]?.correct}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estágio 2: Diagnóstico Diferencial */}
      {currentStage >= 2 && (
        <Card>
          <CardHeader><CardTitle>Estágio 2: Evolução e Novos Dados</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90">{gameCase.stage2.presentation}</p>
            <div className="border-t pt-4">
              <p className="font-semibold mb-2">{gameCase.stage2.question}</p>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => handleStage2Answer('Sepse')} variant={answers[2]?.chosen === 'Sepse' ? 'default' : 'outline'} disabled={currentStage > 2}>Sepse</Button>
                <Button onClick={() => handleStage2Answer('Choque Séptico')} variant={answers[2]?.chosen === 'Choque Séptico' ? 'default' : 'outline'} disabled={currentStage > 2}>Choque Séptico</Button>
              </div>
              {currentStage > 2 && (
                <div className={`mt-2 flex items-center text-sm font-semibold ${answers[2]?.chosen === answers[2]?.correct ? 'text-green-500' : 'text-red-500'}`}>
                  {answers[2]?.chosen === answers[2]?.correct ? <CheckCircle className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                  Resposta Correta: {answers[2]?.correct}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estágio 3: Hipótese do Foco */}
      {currentStage >= 3 && gameCase.stage3 && (
        <Card>
          <CardHeader><CardTitle>Estágio 3: Hipótese do Foco</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleStage3Submit} className="space-y-4">
              <p className="font-semibold">{gameCase.stage3.question}</p>
              <Input value={focusHypothesis} onChange={(e) => setFocusHypothesis(e.target.value)} placeholder="Ex: Foco pulmonar" />
              <Button type="submit" className="w-full">Finalizar Diagnóstico</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}