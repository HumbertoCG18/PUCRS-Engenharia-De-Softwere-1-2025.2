// src/app/compendio/page.jsx
import CompendioContent from "@/components/compendio/CompendioContent";
import CompendioNav from "@/components/compendio/CompendioNav";

export default function CompendioPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Compêndio de Sepse</h1>
        <p className="text-foreground/80">
          Um guia de referência rápida para diagnóstico e manejo.
        </p>
      </header>
      
      {/* Layout de duas colunas para desktop, uma coluna para mobile */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Coluna da Esquerda: Navegação */}
        <div className="w-full">
          <CompendioNav />
        </div>

        {/* Coluna da Direita: Conteúdo */}
        <div className="w-full">
          <CompendioContent />
        </div>
      </div>
    </div>
  );
}