// src/components/layout/BottomNav.js
import Link from 'next/link';
import { Home, User, ShieldCheck, Trophy, Stethoscope } from 'lucide-react';

export default function BottomNav() {
  return (
    // 1. Aumentamos a altura para h-24 (6rem) e aplicamos o gradiente
    // O gradiente vai de transparente (topo) para a cor de fundo (em baixo)
    <nav className="fixed bottom-0 left-0 z-40 w-full h-24 bg-gradient-to-t from-background via-background/95 to-transparent">
      {/* 2. Este div interno alinha os ícones na parte inferior da área da nav */}
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium items-end pb-1">
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 h-16 group">
          <Home className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Início
          </span>
        </Link>
        <Link href="/compendio" className="inline-flex flex-col items-center justify-center px-5 h-16 group">
          <ShieldCheck className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Compêndio
          </span>
        </Link>
        <div className="flex items-center justify-center">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 font-medium bg-primary rounded-full hover:bg-primary/90 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 mb-5 border-4 border-background">
            <Stethoscope className="w-6 h-6 text-primary-foreground" />
            <span className="sr-only">Jogar</span>
          </Link>
        </div>
        <Link href="/ranking" className="inline-flex flex-col items-center justify-center px-5 h-16 group">
          <Trophy className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Ranking
          </span>
        </Link>
        <Link href="/profile" className="inline-flex flex-col items-center justify-center px-5 h-16 group">
          <User className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Perfil
          </span>
        </Link>
      </div>
    </nav>
  );
}