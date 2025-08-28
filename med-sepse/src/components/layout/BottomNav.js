// src/components/layout/BottomNav.js
"use client"; // 1. Transformar em um Componente de Cliente

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 2. Importar o hook usePathname
import { Home, User, ShieldCheck, Trophy, Stethoscope } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname(); // 3. Obter a URL atual

  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/compendio", label: "Compêndio", icon: ShieldCheck },
    { href: "/jogar", label: "Jogar", icon: Stethoscope, isCentral: true },
    { href: "/ranking", label: "Ranking", icon: Trophy },
    { href: "/profile", label: "Perfil", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full h-24 bg-gradient-to-t from-background via-background/95 to-transparent">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium items-end pb-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href; // 4. Verificar se o link está ativo

          if (item.isCentral) {
            return (
              <div key={item.href} className="flex items-center justify-center">
                <Link href={item.href} className="inline-flex items-center justify-center w-16 h-16 font-medium bg-primary rounded-full hover:bg-primary/90 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 mb-5 border-4 border-background">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
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