"use client"; // Necessário para usar Hooks (useAuth)

import { useAuth } from '@/contexts/AuthContext';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import PlayerDashboard from '@/components/home/PlayerDashboard';
import { Skeleton } from "@/components/ui/skeleton"; // Opcional: para loading state

export default function Home() {
  const { user, loading } = useAuth();

  // Extrai o primeiro nome para uma saudação mais amigável, ou usa o nome completo
  const getGreetingName = () => {
    if (!user || !user.name) return "Dr(a).";
    // Retorna o nome completo conforme pedido (ex: Dr. Humberto Gomes)
    return user.name; 
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 space-y-8">
      <header className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Bem-vindo, {getGreetingName()}
              </h1>
              <p className="text-muted-foreground">
                Pronto para salvar vidas hoje?
              </p>
            </>
          )}
        </div>
        <ThemeSwitcher />
      </header>
      <PlayerDashboard />
      
      <div className="h-32" />
    </div>
  );
}