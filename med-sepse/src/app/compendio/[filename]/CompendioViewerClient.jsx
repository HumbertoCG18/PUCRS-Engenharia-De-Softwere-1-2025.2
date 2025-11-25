"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PdfViewer from "@/components/compendio/PdfViewer"; 
import initialArticles from "@/data/articles.json";

export default function CompendioViewerClient({ filename }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Procura no JSON estático
    let found = initialArticles.find(a => a.filename === filename || a.id === filename);

    // 2. Se não achar, procura no LocalStorage (uploads novos)
    if (!found) {
      const stored = localStorage.getItem('medseps_custom_articles');
      if (stored) {
        const customArticles = JSON.parse(stored);
        found = customArticles.find(a => a.filename === filename || a.id === filename);
      }
    }

    setArticle(found);
    setLoading(false);
  }, [filename]);

  if (loading) return <div className="flex justify-center p-10">Carregando...</div>;

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">Artigo não encontrado</h1>
        <p className="text-muted-foreground">O documento solicitado ({filename}) não existe.</p>
        <Button onClick={() => router.back()}>Voltar ao Compêndio</Button>
      </div>
    );
  }

  const pdfUrl = article.url || `/articles/${article.filename}`;

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-4 flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 pl-0 hover:pl-2 transition-all">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <div>
            <h1 className="text-xl font-bold line-clamp-1">{article.title}</h1>
            <p className="text-sm text-muted-foreground">{article.category}</p>
        </div>
      </div>

      <div className="flex-grow bg-muted/30 rounded-lg border overflow-hidden relative">
         <PdfViewer fileUrl={pdfUrl} />
      </div>
    </div>
  );
}