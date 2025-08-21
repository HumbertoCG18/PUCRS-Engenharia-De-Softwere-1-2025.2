// src/components/layout/BottomNav.js
import Link from 'next/link'; // 1. Importar o componente Link
import { Home, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-black/[.08] dark:border-white/[.145]">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        <div className="flex items-center justify-center">
          {/* Espaço reservado à esquerda, pode ser usado para outro ícone no futuro */}
        </div>

        <div className="flex items-center justify-center">
          {/* 2. O botão Home agora é um Link para a página inicial ("/") */}
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <Home className="w-6 h-6 text-white" />
            <span className="sr-only">Home</span>
          </Link>
        </div>
        
        {/* 3. O botão Perfil agora é um Link para a página "/profile" */}
        <Link href="/profile" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <User className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Perfil
          </span>
        </Link>
      </div>
    </nav>
  );
}