// src/components/compendio/CompendioContent.js
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const qsofaCriteria = [
  { criterion: "Frequência respiratória", value: "≥ 22/min" },
  { criterion: "Alteração do estado mental", value: "Glasgow < 15" },
  { criterion: "Pressão arterial sistólica", value: "≤ 100 mmHg" },
];

export default function CompendioContent() {
  return (
    <article className="space-y-8">
      <section id="definicoes">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">Definições</h2>
        <div className="space-y-4 text-foreground/90">
          <p>
            <strong>Sepse</strong> é definida como uma disfunção orgânica potencialmente fatal causada por uma resposta desregulada do hospedeiro à infecção.
          </p>
          <p>
            <strong>Choque Séptico</strong> é um subconjunto da sepse em que as anormalidades circulatórias, celulares e metabólicas subjacentes são profundas o suficiente para aumentar substancialmente a mortalidade.
          </p>
        </div>
      </section>

      <section id="qsofa">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">Critérios (qSOFA)</h2>
        <Card>
          <CardHeader>
            <CardTitle>Quick SOFA (qSOFA)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-foreground/80">
              O escore qSOFA é uma ferramenta de triagem à beira do leito para identificar pacientes com suspeita de infecção que estão em maior risco de desfechos desfavoráveis. Um escore ≥ 2 sugere disfunção orgânica.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70%]">Critério Clínico</TableHead>
                  <TableHead>Pontuação (1 ponto para cada)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qsofaCriteria.map((item) => (
                  <TableRow key={item.criterion}>
                    <TableCell className="font-medium">{item.criterion}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
      
      {/* Seções futuras para SIRS e Manejo podem ser adicionadas aqui */}
    </article>
  );
}