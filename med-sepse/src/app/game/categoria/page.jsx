// src/app/game/categoria/page.jsx
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import categories from "@/data/categories.json"; // Importar a nova base de categorias
import { getCategoryIcon } from '@/lib/icons';

export default function CategoriaSelectionPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Jogo por Categoria</h1>
        <p className="text-foreground/80 mt-2">
          Selecione um foco de estudo para iniciar um caso clínico.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const IconComponent = getCategoryIcon(category.id);
          return (
            // O link agora usa o ID numérico da categoria
            <Link key={category.id} href={`/game/categoria/${category.id}`}>
              <Card className="h-full hover:border-primary hover:bg-primary/5 transition-all">
                <CardHeader>
                  <IconComponent className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}