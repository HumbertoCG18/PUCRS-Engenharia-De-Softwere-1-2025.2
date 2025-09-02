// src/app/profile/page.jsx
import { Button } from "@/components/ui/button";
import { User, Settings, ShieldCheck, LogOut } from "lucide-react";
import { Plug } from 'lucide-react';


export default function ProfilePage() {
  const user = {
    name: "Dr. Sobrenome",
    level: "R2 - Residente Nível 2",
    points: 1250,
  };

  return (
    <div className="font-sans min-h-screen p-6 sm:p-8">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <header className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
            <p className="text-foreground/80">{user.level}</p>
          </div>
        </header>

        <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
          </Button>
            <Button variant="ghost" className="w-full justify-start">
                <Plug className="w-4 h-4 mr-2" />
                Conexões
            </Button>
            <Button variant="ghost" className="w-full justify-start">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Privacidade
            </Button>
            <Button variant="destructive" className="w-full justify-start">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
            </Button>
        </div>
      </div>
    </div>
  );
}