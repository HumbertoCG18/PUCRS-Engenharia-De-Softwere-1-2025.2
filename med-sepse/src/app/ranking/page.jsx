// src/app/ranking/page.jsx
import {
  Card,
  CardContent,
  CardDescription,
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
// A importação deve ser exatamente assim:
import { rankingData } from "@/data/medical-cases"; 
import { Trophy } from "lucide-react";

export default function RankingPage() {
  // Se a importação falhar, rankingData será undefined, causando o erro aqui.
  const currentUser = rankingData.find(player => player.isUser);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Ranking de Desempenho</h1>
        <p className="text-foreground/80 mt-2">
          Veja sua posição entre os residentes.
        </p>
      </header>

      {/* Card com a Posição do Usuário */}
      {currentUser && (
        <Card className="mb-8 bg-primary/5 border-primary">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardDescription>Sua Posição</CardDescription>
              <CardTitle className="text-2xl">#{currentUser.rank} Lugar</CardTitle>
            </div>
            <Trophy className="w-10 h-10 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <span>{currentUser.level}</span>
              <span className="font-bold">{currentUser.points} Pontos</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabela de Classificação Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Classificação Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]">#</TableHead>
                <TableHead className="w-[60%]">Nome</TableHead>
                <TableHead className="text-right">Pontos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingData.map((player) => (
                <TableRow key={player.rank} className={player.isUser ? "bg-primary/10" : ""}>
                  <TableCell className="font-medium">{player.rank}</TableCell>
                  <TableCell>
                    <div>{player.name}</div>
                    <div className="text-xs text-muted-foreground">{player.level}</div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{player.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}