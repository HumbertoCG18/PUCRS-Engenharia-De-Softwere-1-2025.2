"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, Timer, Book, Dumbbell, Calendar, ArrowRight, Terminal, Database } from 'lucide-react';
import CreateCaseDialog from '@/components/game/CreateCaseDialog'; // Importando o componente de criação

export default function GameSelectionPage() {
  const { user } = useAuth();
  const isChief = user?.role === 'chief';
  const [customCasesCount, setCustomCasesCount] = useState(0);

  // Carrega contagem de casos customizados ao iniciar
  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem('medseps_custom_cases') || '[]');
    setCustomCasesCount(storedCases.length);
  }, []);

  const handleCaseCreated = (newCase) => {
    // Salva no LocalStorage para persistir entre sessões
    const currentCases = JSON.parse(localStorage.getItem('medseps_custom_cases') || '[]');
    const updatedCases = [...currentCases, newCase];
    localStorage.setItem('medseps_custom_cases', JSON.stringify(updatedCases));
    
    setCustomCasesCount(updatedCases.length);
    // Feedback visual simples (pode ser substituído por um Toast no futuro)
    alert("Caso criado com sucesso! Ele estará disponível na rotação dos modos de jogo.");
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-32 px-4">
      {/* Cabeçalho com Botão de Criar (Só Chefe) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="text-center md:text-left w-full md:w-auto">
            <h1 className="text-4xl font-bold">Modos de Jogo</h1>
            <p className="text-foreground/80 mt-2">
            Escolha como você quer treinar o diagnóstico de sepse hoje.
            </p>
        </div>

        {/* Botão de Criar (Apenas Chefe) */}
        {isChief && (
          <div className="flex flex-col items-end gap-2 w-full md:w-auto">
             <CreateCaseDialog onCaseCreated={handleCaseCreated} />
             {customCasesCount > 0 && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Database className="w-3 h-3" /> {customCasesCount} casos personalizados ativos
                </span>
             )}
          </div>
        )}
      </div>

      {/* Alerta para Chefe se houver casos criados */}
      {isChief && customCasesCount > 0 && (
        <Alert className="mb-8 bg-primary/5 border-primary/20">
          <Terminal className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-semibold">Modo Administrador</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Seus {customCasesCount} casos personalizados foram inseridos automaticamente na rotação do "Modo Treino" para toda a equipe.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-10">
        {/* 1. Destaque Principal: Caso do Dia */}
        <section>
          <Link href="/game/diario">
            <Card className="border-primary bg-primary/5 hover:bg-primary/10 transition-all group cursor-pointer">
              <CardHeader className="flex-row items-center gap-4">
                <Calendar className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-grow">
                  <CardTitle>Caso do Dia</CardTitle>
                  <CardDescription>Um novo desafio clínico a cada 24 horas para testar suas habilidades.</CardDescription>
                </div>
                <ArrowRight className="w-6 h-6 text-primary/70 group-hover:translate-x-1 transition-transform" />
              </CardHeader>
            </Card>
          </Link>
        </section>

        {/* 2. Grupo: Desafios Cronometrados */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Desafios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/game/rapido">
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <Zap className="w-8 h-8 text-orange-500 mb-2" />
                  <CardTitle>Modo Rápido</CardTitle>
                  <CardDescription>Enfrente um único caso clínico contra o tempo.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/game/contraotempo">
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <Timer className="w-8 h-8 text-red-500 mb-2" />
                  <CardTitle>Contrarrelógio</CardTitle>
                  <CardDescription>Resolva o máximo de casos que puder em 5 minutos.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* 3. Grupo: Prática Livre */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">Prática Livre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/game/categoria">
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <Book className="w-8 h-8 text-blue-500 mb-2" />
                  <CardTitle>Jogo por Categoria</CardTitle>
                  <CardDescription>Aprofunde seus conhecimentos em um foco específico.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/game/treino">
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <Dumbbell className="w-8 h-8 text-green-500 mb-2" />
                  <CardTitle>Modo Treino</CardTitle>
                  <CardDescription>Estude os casos sem pressão de tempo ou pontuação.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}