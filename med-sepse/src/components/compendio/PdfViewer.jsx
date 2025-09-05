"use client";

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// A SOLUÇÃO DIRETA: Apontamos para o arquivo que está na pasta /public
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

export default function PdfViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  return (
    <div>
      <div className="bg-card border rounded-lg p-2 sticky top-4 z-10 flex items-center justify-center gap-2 mb-4">
        <Button onClick={goToPrevPage} disabled={pageNumber <= 1} variant="ghost" size="icon"><ChevronLeft /></Button>
        <span className="font-semibold text-sm">Página {pageNumber} de {numPages || '--'}</span>
        <Button onClick={goToNextPage} disabled={pageNumber >= numPages} variant="ghost" size="icon"><ChevronRight /></Button>
        <div className="w-px h-6 bg-border mx-2" />
        <Button onClick={() => setScale(s => s + 0.1)} variant="ghost" size="icon"><ZoomIn /></Button>
        <Button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))} variant="ghost" size="icon"><ZoomOut /></Button>
      </div>
      
      <div className="flex justify-center">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<p className="text-muted-foreground">Carregando PDF...</p>}
          error={<p className="text-destructive">Falha ao carregar o PDF.</p>}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
    </div>
  );
}