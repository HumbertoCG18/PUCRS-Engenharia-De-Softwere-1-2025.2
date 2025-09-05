"use client";

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Importação dinâmica com SSR desativado, como recomendado pela documentação
const PdfViewer = dynamic(() => import('@/components/compendio/PdfViewer'), {
  ssr: false, 
  loading: () => <p className="text-center text-muted-foreground mt-10">Carregando visualizador...</p>
});

export default function PdfViewerPage() {
  const params = useParams();
  const filename = params?.filename;
  
  const pdfUrl = filename ? `/articles/${filename}` : null;

  if (!pdfUrl) {
    return <div className="text-center mt-10">Nome do arquivo não encontrado.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <PdfViewer fileUrl={pdfUrl} />
    </div>
  );
}