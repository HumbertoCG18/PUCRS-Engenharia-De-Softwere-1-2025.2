// src/app/compendio/page.jsx
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
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Compêndio de Sepse</h1>
        <p className="text-foreground/80 mt-2">
          Pesquise em artigos, diretrizes e protocolos.
        </p>
      </header>

      <div className="relative w-full max-w-2xl mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
        <Input
          type="search"
          placeholder="Pesquisar por 'choque séptico'..."
          className="w-full pl-10 h-12 text-lg rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredArticles.map(article => (
          // CORREÇÃO AQUI: Usando encodeURIComponent para o nome do arquivo
          <Link key={article.id} href={`/compendio/${encodeURIComponent(article.filename)}`}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader className="flex-row items-start gap-4">
                <FileText className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                <div>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription className="mt-1">{article.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}