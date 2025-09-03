// src/components/layout/BottomNav.js
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, ShieldCheck, Trophy, Stethoscope } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/compendio", label: "Compêndio", icon: ShieldCheck },
    { href: "/game", label: "Jogar", icon: Stethoscope, isCentral: true }, // MUDANÇA AQUI
    { href: "/ranking", label: "Ranking", icon: Trophy },
    { href: "/profile", label: "Perfil", icon: User },
  ];
  
  // ... (o resto do código do componente continua o mesmo)
  // ... (a lógica de renderização com .map() já usará o novo href)

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full h-24 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium items-end pb-1">
        {navItems.map((item) => {
          // A verificação de ativo agora também precisa considerar sub-rotas
          const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

          if (item.isCentral) {
            return (
              <div key={item.href} className="flex items-center justify-center">
                <Link href={item.href} className={`inline-flex items-center justify-center w-16 h-16 font-medium rounded-full hover:bg-primary/90 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 mb-5 border-4 border-background transition-colors ${
                  isActive ? 'bg-primary' : 'bg-gray-600 dark:bg-gray-700'
                }`}>
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </div>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="inline-flex flex-col items-center justify-center px-5 h-16 group">
              <item.icon className={`w-5 h-5 mb-1 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'
              }`} />
              <span className={`text-sm transition-colors ${
                isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-primary'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}