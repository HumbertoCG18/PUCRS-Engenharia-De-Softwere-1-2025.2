"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Settings, Shield, Award, Users, Target, Zap, Flame, Wind, Crown, BrainCircuit, ClipboardCheck, CalendarClock, BookOpen, Eye, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import teamData from "@/data/teamData.json";

// Mapeamento de ícones
const badgeIcons = {
  Wind, Target, Zap, Flame, Crown, BrainCircuit, ClipboardCheck, CalendarClock, BookOpen, Eye
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

  const userData = user.profileData || {};
  const badges = userData.badges || [];
  const stats = userData.stats || { totalCases: 0, correctDiagnoses: 0, averageTime: "0:00", performanceByCategory: [] };
  const xpPercentage = userData.xpToNextLevel ? Math.min(100, (userData.xp / userData.xpToNextLevel) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 pb-24 space-y-8">
      {/* Cabeçalho do Perfil */}
      <section className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary overflow-hidden relative group">
            {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
                <User className="w-12 h-12 text-primary" />
            )}
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.title} @ {userData.hospital || "Hospital Geral"}</p>
          <div className="mt-2">
            <Progress value={xpPercentage} className="w-full h-2" />
            <p className="text-xs text-muted-foreground mt-1">{userData.xp || 0} / {userData.xpToNextLevel || 1000} XP para o próximo nível (Nível {userData.level || 1})</p>
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
        {badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => {
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
                <p className="text-3xl font-bold text-primary">{stats.totalCases}</p>
                <p className="text-sm text-muted-foreground">Casos Totais</p>
             </Card>
             <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-green-500">{stats.correctDiagnoses}</p>
                <p className="text-sm text-muted-foreground">Diagnósticos Corretos</p>
             </Card>
             <Card className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-500">{stats.averageTime}</p>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
             </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.performanceByCategory && stats.performanceByCategory.length > 0 ? (
                <PerformanceChart data={stats.performanceByCategory} />
            ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Sem dados suficientes para gerar gráfico.
                </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Equipe (Agora Clicável) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Users /> Minha Equipe (Supervisão)</h2>
        <div className="space-y-3">
            {teamData.map(member => (
              <Link href={`/profile/resident/${member.id}`} key={member.id}>
                <Card className="hover:bg-muted/50 transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center border border-border overflow-hidden">
                        {/* Usar imagem se disponível, senão ícone */}
                        {member.id === 'user001' ? (
                             <img src="/avatars/humberto.png" alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                             <User className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-lg group-hover:text-primary transition-colors">{member.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{member.level}</span>
                            <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                            <span className={member.lastActive === 'Online agora' ? 'text-green-500 font-medium' : ''}>
                                {member.lastActive}
                            </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-muted-foreground uppercase font-bold">Pontuação</p>
                            <p className="font-mono text-primary font-bold">{member.points} pts</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}