"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function UploadArticleDialog({ onUpload }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [customName, setCustomName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!customName) {
        setCustomName(e.target.files[0].name.replace(".pdf", ""));
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !category) return;

    setIsLoading(true);

    // Simula tempo de upload
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newArticle = {
      id: `custom_${Date.now()}`, // ID único
      title: customName || file.name,
      category: category,
      filename: `custom_${Date.now()}`, // Usado na URL
      description: `Documento enviado por Dra. Carolina em ${new Date().toLocaleDateString('pt-BR')}`,
      keywords: [category.toLowerCase(), "upload", "novo"],
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      date: new Date().toLocaleDateString('pt-BR'),
      // TRUQUE: Como não temos backend, apontamos para um PDF existente de exemplo
      // ou criamos uma URL temporária (blob) que funciona apenas na sessão atual
      url: "/articles/banco-questoes-sepse.pdf", 
      isNew: true
    };

    onUpload(newArticle);
    setIsLoading(false);
    setIsOpen(false);
    
    // Reset
    setFile(null);
    setCategory("");
    setCustomName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Novo Artigo</span>
          <span className="sm:hidden">Upload</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar ao Compêndio</DialogTitle>
          <DialogDescription>
            Faça upload de novos protocolos ou artigos para a equipe.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file">Arquivo (PDF)</Label>
            <Input 
                id="file" 
                type="file" 
                accept=".pdf" 
                className="cursor-pointer"
                onChange={handleFileChange} 
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Título do Documento</Label>
            <Input 
                id="name" 
                value={customName} 
                onChange={(e) => setCustomName(e.target.value)} 
                placeholder="Ex: Protocolo de Sepse 2025" 
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Categoria Clínica</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diretrizes">Diretrizes & Protocolos</SelectItem>
                <SelectItem value="Artigos">Artigos Científicos</SelectItem>
                <SelectItem value="Estudos de Caso">Estudos de Caso</SelectItem>
                <SelectItem value="Farmacologia">Farmacologia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>Cancelar</Button>
          <Button onClick={handleUpload} disabled={!file || !category || isLoading} className="gap-2">
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Enviando...
                </>
            ) : (
                <>
                    <CheckCircle2 className="w-4 h-4" /> Confirmar Upload
                </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}