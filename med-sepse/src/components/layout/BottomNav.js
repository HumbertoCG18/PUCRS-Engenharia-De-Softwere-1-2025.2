"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, Gamepad2 } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  // Lista de rotas onde a navegação NUNCA deve aparecer
  const hiddenRoutes = ['/login', '/register'];

  // CORREÇÃO: Verifica se o pathname atual corresponde a alguma rota oculta,
  // considerando que pode ou não ter uma barra "/" no final.
  const shouldHide = hiddenRoutes.some(route => 
    pathname === route || pathname === `${route}/`
  );

  if (shouldHide) {
    return null;
  }

  const navItems = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/game', icon: Gamepad2, label: 'Jogar' },
    { href: '/compendio', icon: BookOpen, label: 'Compêndio' },
    { href: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          // Ajuste também a lógica de "ativo" para lidar com a barra extra
          const isActive = pathname === href || pathname === `${href}/`;
          
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "fill-current")} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}