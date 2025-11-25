"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PdfViewer from "@/components/compendio/PdfViewer"; 
import articles from "@/data/articles.json";

export default function CompendioViewerClient({ filename }) {
  const router = useRouter();

  // Busca o artigo
  const article = articles.find(a => a.filename === filename || a.id === filename);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-2xl font-bold">Documento não encontrado</h1>
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>
    );
  }

  // A URL real do arquivo na pasta public/articles
  const pdfUrl = article.url || `/articles/${article.filename}`;

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-4 flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2 pl-0 hover:pl-2 transition-all">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <div>
            <h1 className="text-xl font-bold line-clamp-1">{article.title}</h1>
            <p className="text-sm text-muted-foreground">{article.category || "Documento"}</p>
        </div>
      </div>

      <div className="flex-grow bg-muted/30 rounded-lg border overflow-hidden relative">
         <PdfViewer fileUrl={pdfUrl} />
      </div>
    </div>
  );
}