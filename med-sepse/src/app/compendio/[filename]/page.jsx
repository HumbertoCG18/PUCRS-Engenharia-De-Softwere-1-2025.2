"use client";

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// A importação dinâmica com ssr: false continua sendo a melhor prática
const PdfViewer = dynamic(() => import('@/components/compendio/PdfViewer'), {
  ssr: false, 
  loading: () => <p className="text-center text-muted-foreground">Carregando visualizador...</p>
});

export default function PdfViewerPage() {
  const params = useParams();
  const filename = params?.filename;
  
  const pdfUrl = filename ? `/articles/${filename}` : null;

  if (!pdfUrl) {
    return <div className="text-center">Nome do arquivo não encontrado.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <PdfViewer fileUrl={pdfUrl} />
    </div>
  );
}