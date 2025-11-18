"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Settings, Shield, Award, Users, Target, Zap, Flame, Wind, Crown, BrainCircuit, ClipboardCheck, CalendarClock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import teamData from "@/data/teamData.json"; // Mantemos a equipe estática por enquanto

// Mapeamento de ícones
const badgeIcons = {
  Wind, Target, Zap, Flame, Crown, BrainCircuit, ClipboardCheck, CalendarClock
};

const PerformanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.3}/>
      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
      <YAxis fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}/>
      <Bar dataKey="acertos" fill="hsl(var(--primary))" name="Acertos" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return <div className="flex justify-center p-8">Carregando perfil...</div>;

  const userData = user.profileData;
  const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24 space-y-8">
      {/* Cabeçalho do Perfil */}
      <section className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary overflow-hidden">
            {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
                <User className="w-12 h-12 text-primary" />
            )}
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.title} @ {userData.hospital}</p>
          <div className="mt-2">
            <Progress value={xpPercentage} className="w-full h-2" />
            <p className="text-xs text-muted-foreground mt-1">{userData.xp} / {userData.xpToNextLevel} XP para o próximo nível (Nível {userData.level})</p>
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href="/profile/settings">
            <Settings className="w-4 h-4 mr-2" /> Configurações
          </Link>
        </Button>
      </section>

      {/* Conquistas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Award /> Conquistas</h2>
        {userData.badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userData.badges.map((badge, index) => {
                const Icon = badgeIcons[badge.icon] || Award;
                return (
                <Card key={index} className="flex flex-col items-center justify-center p-4 text-center hover:bg-muted/50 transition-colors">
                    <Icon className="w-10 h-10 text-primary mb-2"/>
                    <p className="font-semibold text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                </Card>
                );
            })}
            </div>
        ) : (
            <Card className="p-6 text-center text-muted-foreground">
                Você ainda não possui conquistas. Jogue para desbloquear!
            </Card>
        )}
      </section>

      {/* Estatísticas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Shield /> Estatísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
             <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-primary">{userData.stats.totalCases}</p>
                <p className="text-sm text-muted-foreground">Casos Totais</p>
             </Card>
             <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-green-500">{userData.stats.correctDiagnoses}</p>
                <p className="text-sm text-muted-foreground">Diagnósticos Corretos</p>
             </Card>
             <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-500">{userData.stats.averageTime}</p>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
             </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {userData.stats.performanceByCategory.length > 0 ? (
                <PerformanceChart data={userData.stats.performanceByCategory} />
            ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sem dados suficientes para gerar gráfico.
                </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Equipe (Mock Data) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Users /> Minha Equipe</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            {teamData.map(member => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.level}</p>
                  </div>
                </div>
                <p className="font-mono text-primary font-semibold">{member.points} pts</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}