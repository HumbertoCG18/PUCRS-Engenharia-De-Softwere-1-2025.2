// src/app/game/[mode]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { medicalCases } from "@/data/medical-cases"; // Usaremos nossos casos mockados

// No futuro, o 'mode' virá da URL para carregar configurações diferentes
export default function GamePage({ params }) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos em segundos
  const [hypothesis, setHypothesis] = useState("");
  const [feedback, setFeedback] = useState(null);

  // Carrega um caso aleatório que não seja o "Paciente Diário"
  const gameCase = medicalCases.find(c => !c.isDailyCase);

  // Efeito para o timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setFeedback({ message: "Tempo esgotado!", score: 0 });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de proximidade (simulada por enquanto)
    const score = Math.round(Math.random() * 100);
    setFeedback({
      message: `Sua hipótese "${hypothesis}" está ${score > 75 ? 'QUENTE' : score > 40 ? 'MORNA' : 'FRIA'}.`,
      score: score
    });
    // Para o timer ao submeter uma resposta
    setTimeLeft(0);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-center capitalize">Modo Rápido</h1>
        <div className="flex items-center gap-4 mt-2">
          <Progress value={(timeLeft / 300) * 100} className="w-full" />
          <span className="font-mono text-lg font-semibold">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Apresentação do Caso</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90">{gameCase.history}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="exame_fisico" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exame_fisico">Exame Físico</TabsTrigger>
          <TabsTrigger value="exames_lab">Exames Laboratoriais</TabsTrigger>
        </TabsList>
        <TabsContent value="exame_fisico">
          <Card>
            <CardContent className="pt-6">
              <p>{gameCase.physicalExam}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exames_lab">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-1">
                <li><strong>Leucócitos:</strong> {gameCase.labResults.leukocytes}</li>
                <li><strong>Creatinina:</strong> {gameCase.labResults.creatinine}</li>
                <li><strong>Lactato:</strong> {gameCase.labResults.lactate}</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Seção de Hipótese e Feedback */}
      <form onSubmit={handleSubmit} className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Hipótese Diagnóstica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedback ? (
              <div className="p-4 rounded-md bg-accent text-center">
                <p className="font-semibold">{feedback.message}</p>
                <p className="text-sm">Proximidade: {feedback.score}%</p>
              </div>
            ) : (
              <>
                <Input
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                  placeholder="Ex: Sepse de foco pulmonar"
                  disabled={timeLeft <= 0}
                />
                <Button type="submit" className="w-full" disabled={!hypothesis || timeLeft <= 0}>
                  Submeter Hipótese
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}