// src/app/game/categoria/page.jsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import medicalCases from "@/data/cases.json";
import { getCategoryIcon } from '@/lib/icons';

// Função para criar um "slug" amigável para a URL a partir do nome da categoria
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default function CategoriaSelectionPage() {
  // Extrai todas as categorias únicas da nossa base de dados
  const allCategories = medicalCases.map(c => c.category);
  const uniqueCategories = [...new Set(allCategories)];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Jogo por Categoria</h1>
        <p className="text-foreground/80 mt-2">
          Selecione um foco de estudo para iniciar um caso clínico.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uniqueCategories.map((category) => {
          const IconComponent = getCategoryIcon(category);
          
          return (
            <Link key={category} href={`/game/categoria/${slugify(category)}`}>
              <Card className="h-full hover:border-primary hover:bg-primary/5 transition-all">
                <CardHeader>
                  <IconComponent className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>
                    Resolver um caso de sepse com {category.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}