"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjs from "pdfjs-dist";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Document, Page } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const renderTask = useRef(null); // Para guardar a referência da tarefa de renderização

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const goToPrevPage = () => {
    if (renderTask.current) {
      renderTask.current.cancel();
    }
    setPageNumber(prev => Math.max(prev - 1, 1));
  };
  const goToNextPage = () => {
    if (renderTask.current) {
      renderTask.current.cancel();
    }
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };
  
  // Função para lidar com a renderização da página
  const onPageRenderSuccess = (page) => {
    // Limpa a tarefa após a conclusão
    renderTask.current = null;
  };

  // Função para obter a tarefa de renderização
  const onRenderTask = (task) => {
    renderTask.current = task;
  };

  return (
    <div>
      <div className="bg-card border rounded-lg p-2 sticky top-4 z-10 flex items-center justify-center gap-2 mb-4">
        <Button onClick={goToPrevPage} disabled={pageNumber <= 1} variant="ghost" size="icon">
          <ChevronLeft />
        </Button>
        <span className="font-semibold text-sm">
          Página {pageNumber} de {numPages || '--'}
        </span>
        <Button onClick={goToNextPage} disabled={!numPages || pageNumber >= numPages} variant="ghost" size="icon">
          <ChevronRight />
        </Button>
        <div className="w-px h-6 bg-border mx-2" />
        <Button onClick={() => setScale(s => s + 0.1)} variant="ghost" size="icon"><ZoomIn /></Button>
        <Button onClick={() => setScale(s => Math.max(s - 0.1, 0.5))} variant="ghost" size="icon"><ZoomOut /></Button>
      </div>
      
      <div className="flex justify-center border rounded-md overflow-hidden">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="p-10">Carregando PDF...</div>}
          error={<div className="p-10 text-destructive">Falha ao carregar o PDF.</div>}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            onRenderSuccess={onPageRenderSuccess}
            onRenderTask={onRenderTask}
          />
        </Document>
      </div>
    </div>
  );
}