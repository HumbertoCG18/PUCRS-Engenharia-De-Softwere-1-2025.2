import articles from "@/data/articles.json";
import CompendioViewerClient from "./CompendioViewerClient";

// Gera as rotas estáticas baseadas no JSON
export async function generateStaticParams() {
  return articles.map((article) => ({
    filename: article.filename,
  }));
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const { filename } = resolvedParams;

  return <CompendioViewerClient filename={filename} />;
}