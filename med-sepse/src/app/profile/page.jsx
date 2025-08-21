// src/app/profile/page.jsx
import { Button } from "@/components/ui/Button";
import { User, Settings, ShieldCheck, LogOut } from "lucide-react";

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
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-foreground/80">{user.level}</p>
          </div>
        </header>

        <div className="p-6 bg-black/[.05] dark:bg-white/[.06] rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Estatísticas</h2>
          <div className="flex justify-between items-center">
            <span className="text-foreground/80">Pontuação Total</span>
            <span className="font-bold text-xl text-blue-500">{user.points} pts</span>
          </div>
        </div>

        <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
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