// src/components/compendio/CompendioFilters.js
"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CompendioFilters() {
  // Estado para cada filtro
  const [area, setArea] = useState("all");
  const [source, setSource] = useState("all");
  const [year, setYear] = useState("all");

  const handleResetFilters = () => {
    setArea("all");
    setSource("all");
    setYear("all");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 p-4 bg-card border rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-1">
        {/* Filtro de Área */}
        <div className="space-y-2">
          <Select id="area" value={area} onValueChange={setArea}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Áreas</SelectItem>
              <SelectItem value="diagnostico">Diagnóstico</SelectItem>
              <SelectItem value="manejo">Manejo</SelectItem>
              <SelectItem value="fisiopatologia">Fisiopatologia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Fonte */}
        <div className="space-y-2">
          <Select id="source" value={source} onValueChange={setSource}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Fontes</SelectItem>
              <SelectItem value="guideline">Diretrizes</SelectItem>
              <SelectItem value="artigo">Artigos</SelectItem>
              <SelectItem value="interno">Protocolo Interno</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Ano */}
        <div className="space-y-2">
          <Select id="year" value={year} onValueChange={setYear}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Anos</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
              </div>
                    <div className="space-y-2">
        <Button variant="ghost" size="sm" onClick={handleResetFilters}>
          Limpar Filtros
        </Button>
      </div>
      </div>

    </div>
  );
}