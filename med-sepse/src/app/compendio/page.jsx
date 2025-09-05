"use client";

import { useState } from "react";
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, FileText } from "lucide-react";
import articles from "@/data/articles.json";

export default function CompendioPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Compêndio de Sepse</h1>
        <p className="text-foreground/80 mt-4 max-w-2xl mx-auto">
          Sua base de conhecimento centralizada. Pesquise diretrizes, artigos e resumos para aprimorar sua tomada de decisão clínica.
        </p>
      </header>

      <div className="relative w-full max-w-2xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
        <Input
          type="search"
          placeholder="Pesquisar por 'vasopressores', 'qSOFA'..."
          className="w-full pl-12 h-14 text-md rounded-full border-2 focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ALTERAÇÃO 1: Aumentar o espaçamento de 'space-y-6' para 'space-y-8' */}
      <div className="space-y-9 space-x-1"> 
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <Link key={article.id} href={`/compendio/${article.filename}`}>
              <Card className="border border-border hover:border-primary/80 hover:bg-card transition-all group shadow-sm hover:shadow-md">
                <CardHeader className="flex-row items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <CardTitle className="group-hover:text-primary transition-colors">{article.title}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">{article.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Nenhum artigo encontrado para "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
}