"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronsRight, LogOut, Info, Bug } from "lucide-react";

export default function SettingsPage() {
  // Estados para controlar as opções (simulação)
  const [isGoogleDriveConnected, setIsGoogleDriveConnected] = useState(false);
  const [isNotionConnected, setIsNotionConnected] = useState(true);
  const [isAnkiConnected, setIsAnkiConnected] = useState(true);
  const [isOfficeConnected, setIsOfficeConnected] = useState(true);
  const [isZoteroConnected, setIsZoteroConnected] = useState(true);


  
  // Estados para as unidades de medida
  const [tempUnit, setTempUnit] = useState("C");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [lactateUnit, setLactateUnit] = useState("mmol/L");
  const [glucoseUnit, setGlucoseUnit] = useState("mg/dL");
  const [creatinineUnit, setCreatinineUnit] = useState("mg/dL");

  return (
    <div className="w-full max-w-2xl mx-auto py-8 pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e conexões.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Conexões</CardTitle>
          <CardDescription>Integre o MedSeps com outras ferramentas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="gdrive-switch">Google Drive</Label>
            <Switch id="gdrive-switch" checked={isGoogleDriveConnected} onCheckedChange={setIsGoogleDriveConnected} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notion-switch">Notion</Label>
            <Switch id="notion-switch" checked={isNotionConnected} onCheckedChange={setIsNotionConnected} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="anki-switch">Anki</Label>
            <Switch id="anki-switch" checked={isAnkiConnected} onCheckedChange={setIsAnkiConnected} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="office-switch">Office 365</Label>
            <Switch id="office-switch" checked={isOfficeConnected} onCheckedChange={setIsOfficeConnected} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="office-switch">Anki</Label>
            <Switch id="office-switch" checked={isOfficeConnected} onCheckedChange={setIsOfficeConnected} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="zotero-switch">Zotero</Label>
            <Switch id="zotero-switch" checked={isZoteroConnected} onCheckedChange={setIsZoteroConnected} />
          </div>
        </CardContent>

        <Separator />

        <CardHeader>
          <CardTitle>Métricas</CardTitle>
          <CardDescription>Personalize as unidades de medida exibidas nos casos.</CardDescription>
        </CardHeader>
        {/* Adicionado 'space-y-6' para mais espaçamento */}
        <CardContent className="space-y-6">
          {/* Clínicas Gerais */}
          <div className="flex items-center justify-between">
            <Label>Temperatura</Label>
            <Select value={tempUnit} onValueChange={setTempUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="C">Celsius (°C)</SelectItem>
                <SelectItem value="F">Fahrenheit (°F)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Peso</Label>
            <Select value={weightUnit} onValueChange={setWeightUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Quilogramas (kg)</SelectItem>
                <SelectItem value="lbs">Libras (lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Separador sutil para exames laboratoriais */}
          <Separator className="my-4" />

          {/* Exames Laboratoriais */}
          <div className="flex items-center justify-between">
            <Label>Lactato</Label>
            <Select value={lactateUnit} onValueChange={setLactateUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mmol/L">mmol/L</SelectItem>
                <SelectItem value="mg/dL">mg/dL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Glicose</Label>
            <Select value={glucoseUnit} onValueChange={setGlucoseUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mg/dL">mg/dL</SelectItem>
                <SelectItem value="mmol/L">mmol/L</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Creatinina</Label>
            <Select value={creatinineUnit} onValueChange={setCreatinineUnit}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mg/dL">mg/dL</SelectItem>
                <SelectItem value="umol/L">µmol/L</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <Separator />

        <CardHeader>
          <CardTitle>Sobre e Suporte</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
           <Button variant="ghost" className="w-full justify-between">
              <span><Info className="w-4 h-4 mr-2 inline-block" />Informações do Aplicativo</span>
              <ChevronsRight className="w-4 h-4 text-muted-foreground"/>
            </Button>
            <Button variant="ghost" className="w-full justify-between">
              <span><Bug className="w-4 h-4 mr-2 inline-block" />Reportar um Bug</span>
               <ChevronsRight className="w-4 h-4 text-muted-foreground"/>
            </Button>
        </CardContent>

        <Separator />

        <CardContent className="pt-6">
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sair (Log Out)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
