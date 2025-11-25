"use client";

import { useRouter } from "next/navigation";
import usersData from '@/data/users.json';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Activity, Clock, Target, AlertCircle, Award, MessageSquare } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Recebe o ID diretamente como prop, vindo do Server Component
export default function ResidentDashboardClient({ id }) {
  const router = useRouter();

  // Buscar o usuário pelo ID
  const resident = usersData.find(u => u.id === id);

  if (!resident) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <AlertCircle className="w-12 h-12 text-destructive" />
        <h1 className="text-xl font-bold">Residente não encontrado</h1>
        <Button onClick={() => router.back()}>Voltar</Button>
      </div>
    );
  }

  // Fallbacks para evitar erros se dados faltarem
  const stats = resident.profileData?.stats || { 
    totalCases: 0, correctDiagnoses: 0, averageTime: "0:00", performanceByCategory: [] 
  };
  const badges = resident.profileData?.badges || [];

  // Mock de dados para gráfico de evolução
  const evolutionData = [
    { dia: 'Seg', acertos: 2 },
    { dia: 'Ter', acertos: 3 },
    { dia: 'Qua', acertos: 1 },
    { dia: 'Qui', acertos: 4 },
    { dia: 'Sex', acertos: 5 },
    { dia: 'Sáb', acertos: 4 },
    { dia: 'Dom', acertos: 5 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-6 pb-24 space-y-6">
      {/* Botão de Voltar */}
      <Button variant="ghost" onClick={() => router.back()} className="gap-2 pl-0 hover:pl-2 transition-all">
        <ArrowLeft className="w-4 h-4" /> Voltar para Minha Equipe
      </Button>

      {/* Cabeçalho do Residente */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-card border p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                <img src={resident.avatarUrl || "/avatars/placeholder.png"} alt={resident.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <h1 className="text-3xl font-bold">{resident.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                    {resident.title} 
                    <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${resident.lastActive === 'Online agora' ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                        {resident.lastActive === 'Online agora' ? <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> : null}
                        {resident.lastActive || "Offline"}
                    </span>
                </p>
            </div>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
                <MessageSquare className="w-4 h-4" /> Enviar Feedback
            </Button>
            <Button className="gap-2">
                <Activity className="w-4 h-4" /> Atribuir Caso
            </Button>
        </div>
      </div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Nível de Proficiência</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Nível {resident.profileData?.level || 1}</div>
                <Progress value={(resident.profileData?.xp / resident.profileData?.xpToNextLevel) * 100 || 0} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">{resident.profileData?.xp || 0} XP / {resident.profileData?.xpToNextLevel || 1000} XP</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Precisão Geral</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                    {stats.totalCases > 0 ? Math.round((stats.correctDiagnoses / stats.totalCases) * 100) : 0}%
                    <Target className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Baseado em {stats.totalCases} casos</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                    {stats.averageTime}
                    <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Por diagnóstico</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Badges</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                    {badges.length}
                    <Award className="w-4 h-4 text-yellow-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Conquistas desbloqueadas</p>
            </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Desempenho por Foco</CardTitle>
                <CardDescription>Acertos vs Erros por categoria clínica</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.performanceByCategory || []}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="acertos" name="Acertos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="total" name="Total Tentativas" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Casos resolvidos nos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolutionData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="dia" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip 
                             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Line type="monotone" dataKey="acertos" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}