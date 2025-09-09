// src/components/game/GameOverSummary.jsx
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Award, Target } from "lucide-react";

// Adicionamos a prop 'incorrectCases'
export default function GameOverSummary({ title, description, score, scoreLabel, children, incorrectCases = [] }) {
  
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 pb-24 text-center">
      <Card className="border-primary">
        <CardHeader>
          <Award className="w-12 h-12 mx-auto text-yellow-500 mb-2" />
          <CardTitle className="text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {score !== undefined && (
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-5xl font-bold text-primary">{score}</p>
              <p className="text-muted-foreground text-sm">{scoreLabel}</p>
            </div>
          )}

          {children}

          {/* NOVA SEÇÃO: Relatório de Erros Interativo */}
          {incorrectCases.length > 0 && (
            <div className="text-left">
              <h3 className="font-semibold text-center mb-2">Relatório de Revisão</h3>
              <Accordion type="single" collapsible className="w-full">
                {incorrectCases.map((caseData, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>
                      <span className="text-sm font-semibold">{caseData.finalDiagnosis} (ID: {caseData.id})</span>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 text-xs">
                      <p className="text-muted-foreground">{caseData.stage1.presentation}</p>
                      <div className="p-2 rounded-md bg-background border">
                        <p><strong>Sua Resposta:</strong> <span className="text-red-500 font-semibold">{caseData.userAnswers[2]?.chosen}</span></p>
                        <p><strong>Resposta Correta:</strong> <span className="text-green-500 font-semibold">{caseData.userAnswers[2]?.correct}</span></p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
          
          <div className="flex flex-col gap-2"> 
            <Button onClick={handleRetry} variant="outline" className="w-full">Jogar Novamente</Button>
            <Button asChild className="w-full">
              <Link href="/game">Outros Modos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}