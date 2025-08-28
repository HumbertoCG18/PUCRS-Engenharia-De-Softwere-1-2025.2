// src/components/layout/BottomNav.js
import Link from 'next/link';
import { Home, User, ShieldCheck, Trophy, Stethoscope } from 'lucide-react';

export default function BottomNav() {
  // TODO: Adicionar lógica para destacar o ícone da página ativa
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
          <Home className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Início
          </span>
        </Link>
        <Link href="/compendio" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
          <ShieldCheck className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Compêndio
          </span>
        </Link>
        <div className="flex items-center justify-center">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 font-medium bg-primary rounded-full hover:bg-primary/90 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 -mt-6 border-4 border-background">
            <Stethoscope className="w-6 h-6 text-primary-foreground" />
            <span className="sr-only">Jogar</span>
          </Link>
        </div>
        <Link href="/ranking" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
          <Trophy className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Ranking
          </span>
        </Link>
        <Link href="/profile" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
          <User className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary">
            Perfil
          </span>
        </Link>
      </div>
    </nav>
  );
}