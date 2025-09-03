// src/app/game/categoria/[slug]/page.jsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { medicalCases } from "@/data/medical-cases";
import GameOverSummary from '@/components/game/GameOverSummary';

// Esta função pertence a esta página, pois ela recebe o 'slug'
const unslugify = (slug) => {
    const words = slug.split('-');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export default function CategoriaGamePage({ params }) {
  const { slug } = params;
  const category = unslugify(slug);

  const [hypothesis, setHypothesis] = useState("");
  const [finalScore, setFinalScore] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const gameCase = medicalCases.find(c => c.category === category);

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = Math.round(Math.random() * 100);
    setFinalScore(score);
    setIsGameOver(true);
  };

  if (!gameCase) {
    return <div className="text-center py-10">Caso não encontrado para esta categoria.</div>
  }

  if (isGameOver) {
    return (
      <GameOverSummary
        title="Caso Finalizado!"
        description={`Sua hipótese para o caso de ${gameCase.category.toLowerCase()}.`}
        score={finalScore}
        scoreLabel="Proximidade Diagnóstica"
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Jogo por Categoria</h1>
        <p className="text-muted-foreground">{category}</p>
      </header>

      <Card>
        <CardHeader><CardTitle>Apresentação do Caso</CardTitle></CardHeader>
        <CardContent><p className="text-foreground/90">{gameCase.presentation}</p></CardContent>
      </Card>

      <Tabs defaultValue="exame_fisico" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exame_fisico">Exame Físico</TabsTrigger>
          <TabsTrigger value="exames_lab">Exames Laboratoriais</TabsTrigger>
        </TabsList>
        <TabsContent value="exame_fisico">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm list-disc list-inside">
                {Object.entries(gameCase.physicalExam).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>{value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="exames_lab">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2 text-sm list-disc list-inside">
                {Object.entries(gameCase.labResults).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>{value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <form onSubmit={handleSubmit} className="mt-6">
        <Card>
          <CardHeader><CardTitle>Hipótese Diagnóstica</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input value={hypothesis} onChange={(e) => setHypothesis(e.target.value)} placeholder="Ex: Sepse de foco pulmonar"/>
            <Button type="submit" className="w-full" disabled={!hypothesis}>Submeter Hipótese</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}