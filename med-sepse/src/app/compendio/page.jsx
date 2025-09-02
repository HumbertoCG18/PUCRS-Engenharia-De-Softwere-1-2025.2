// src/app/compendio/page.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import CompendioFilters from "@/components/compendio/CompendioFilters"; // 1. Importar o novo componente

const featuredTopics = [
    { title: "Critérios (qSOFA)", description: "Ferramenta de triagem rápida para disfunção orgânica." },
    { title: "Manejo (1-Hora)", description: "Passos cruciais na primeira hora de manejo da sepse." },
    { title: "Foco Pulmonar", description: "Investigação e características da sepse de origem pulmonar." },
];

export default function CompendioPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Compêndio de Sepse</h1>
        <p className="text-foreground/80 mt-2">
          Pesquise tópicos, critérios e diretrizes de manejo.
        </p>
      </header>
      
      <div className="relative w-full max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
        <Input
          type="search"
          placeholder="Pesquisar por 'choque séptico'..."
          className="w-full pl-10 h-12 text-lg rounded-full"
        />
        <Button 
            onClick={() => setShowFilters(!showFilters)} 
            variant={showFilters ? "secondary" : "ghost"} // 2. Mudar o estilo do botão quando os filtros estão ativos
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* 3. Renderizar o componente de filtros condicionalmente */}
      {showFilters && <CompendioFilters />}

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-center">Tópicos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredTopics.map(topic => (
                <Card key={topic.title} className="hover:border-primary transition-colors">
                    <CardHeader>
                        <CardTitle className="text-base">{topic.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-foreground/80">{topic.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}