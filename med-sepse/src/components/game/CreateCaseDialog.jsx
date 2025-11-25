"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Save, Loader2 } from "lucide-react";

export default function CreateCaseDialog({ onCaseCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    presentation: "",
    diagnosis: "", // Sepse, Choque ou Nenhum
    feedback: ""   // Explicação final
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.diagnosis) return;

    setIsLoading(true);
    
    // Simula delay de salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCase = {
      id: `custom_case_${Date.now()}`,
      title: formData.title, // Ex: Paciente J.S., 65 anos
      category: formData.category,
      presentation: formData.presentation,
      correctDiagnosis: formData.diagnosis, // Deve bater com a lógica do jogo
      stages: [
        {
            id: 1,
            text: formData.presentation,
            options: [
                { label: "Solicitar Lactato e Hemocultura", correct: true },
                { label: "Dar alta", correct: false }
            ]
        }
      ],
      feedback: formData.feedback || "Caso criado manualmente pela chefia.",
      isCustom: true
    };

    onCaseCreated(newCase);
    setIsLoading(false);
    setIsOpen(false);
    
    // Resetar formulário
    setFormData({ title: "", category: "", presentation: "", diagnosis: "", feedback: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white shadow-md">
          <PlusCircle className="w-4 h-4" />
          Criar Novo Caso
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Caso Clínico</DialogTitle>
          <DialogDescription>
            Adicione um novo cenário de simulação para os residentes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Título / Paciente */}
          <div className="grid gap-2">
            <Label htmlFor="title">Identificação do Paciente</Label>
            <Input 
              id="title" 
              name="title"
              placeholder="Ex: Mulher, 72 anos, Hipertensa..." 
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Categoria */}
          <div className="grid gap-2">
            <Label>Foco Infeccioso (Categoria)</Label>
            <Select onValueChange={(val) => handleSelectChange("category", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o foco..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pulmonar">Foco Pulmonar</SelectItem>
                <SelectItem value="Urinário">Foco Urinário</SelectItem>
                <SelectItem value="Abdominal">Foco Abdominal</SelectItem>
                <SelectItem value="Neurológico">Foco Neurológico</SelectItem>
                <SelectItem value="Cutâneo">Foco Cutâneo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Apresentação Clínica */}
          <div className="grid gap-2">
            <Label htmlFor="presentation">Apresentação Clínica e Sinais Vitais</Label>
            <Textarea 
              id="presentation" 
              name="presentation"
              placeholder="Descreva a queixa principal, HMA e sinais vitais (PA, FC, FR, Temp...)" 
              className="h-32"
              value={formData.presentation}
              onChange={handleChange}
            />
          </div>

          {/* Diagnóstico Correto */}
          <div className="grid gap-2">
            <Label>Desfecho Esperado (Diagnóstico)</Label>
            <Select onValueChange={(val) => handleSelectChange("diagnosis", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Qual a resposta correta?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sepse">Sepse</SelectItem>
                <SelectItem value="Choque Séptico">Choque Séptico</SelectItem>
                <SelectItem value="Sem Sepse">Não é Sepse (Infecção sem disfunção)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Feedback / Explicação */}
          <div className="grid gap-2">
            <Label htmlFor="feedback">Feedback Educativo</Label>
            <Textarea 
              id="feedback" 
              name="feedback"
              placeholder="Explique por que este é o diagnóstico correto e quais as armadilhas do caso." 
              value={formData.feedback}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar Caso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}