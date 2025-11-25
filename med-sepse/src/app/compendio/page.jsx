"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Filter, Sparkles } from "lucide-react";
import initialArticles from "@/data/articles.json";
import UploadArticleDialog from '@/components/compendio/UploadArticleDialog';

export default function CompendioPage() {
  const { user } = useAuth();
  const isChief = user?.role === 'chief';

  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isMounted, setIsMounted] = useState(false);

  // Carregar artigos personalizados do LocalStorage ao iniciar
  useEffect(() => {
    setIsMounted(true);
    const storedArticles = localStorage.getItem('medseps_custom_articles');
    if (storedArticles) {
      const custom = JSON.parse(storedArticles);
      setArticles([...custom, ...initialArticles]);
    }
  }, []);

  const categories = ["Todos", "Mais Vistos", "Mais Recentes"];

  const handleNewUpload = (newArticle) => {
    const updatedList = [newArticle, ...articles];
    setArticles(updatedList);
    
    // Salvar APENAS os novos no LocalStorage para persistir
    const currentCustom = JSON.parse(localStorage.getItem('medseps_custom_articles') || '[]');
    localStorage.setItem('medseps_custom_articles', JSON.stringify([newArticle, ...currentCustom]));
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (article.keywords && article.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === "Todos" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (!isMounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Compêndio de Sepse</h1>
        <p className="text-foreground/80 mt-4 max-w-2xl mx-auto">
          Sua base de conhecimento centralizada. Pesquise diretrizes, artigos e resumos.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
          <Input
            type="search"
            placeholder="Pesquisar por 'vasopressores', 'qSOFA'..."
            className="w-full pl-12 h-12 text-md rounded-lg border-2 focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {isChief && (
          <div className="shrink-0 w-full sm:w-auto">
            <UploadArticleDialog onUpload={handleNewUpload} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center sm:justify-start">
        <div className="flex items-center mr-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4 mr-1" /> Filtros:
        </div>
        {categories.map(cat => (
            <Button 
                key={cat} 
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
            >
                {cat}
            </Button>
        ))}
      </div>

      <div className="space-y-4"> 
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <Link key={article.id} href={`/compendio/${article.filename || article.id}`}>
              <Card className={`border hover:border-primary/80 transition-all group shadow-sm hover:shadow-md cursor-pointer ${article.isNew ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'}`}>
                <CardHeader className="flex-row items-start gap-4 p-4 sm:p-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <CardTitle className="group-hover:text-primary transition-colors text-lg">
                            {article.title}
                        </CardTitle>
                        {article.isNew && (
                            <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-white gap-1">
                                <Sparkles className="w-3 h-3" /> Novo
                            </Badge>
                        )}
                    </div>
                    
                    <CardDescription className="mt-1 line-clamp-2 text-sm">
                        {article.description || "Documento adicionado ao compêndio."}
                    </CardDescription>
                    
                    <div className="flex items-center gap-2 mt-3">
                        {article.category && (
                            <Badge variant="secondary" className="text-xs font-normal">
                                {article.category}
                            </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">• {article.size || "PDF"}</span>
                        {article.date && (
                            <span className="text-xs text-muted-foreground">• {article.date}</span>
                        )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-xl">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold">Nenhum resultado encontrado</h3>
            <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedCategory("Todos")}} className="mt-2">
                Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}