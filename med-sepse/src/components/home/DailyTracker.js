// src/components/home/DailyTracker.js
import { getDailyCase } from '@/lib/cases'; // Importar a função
import { CheckCircle2, Circle, Stethoscope } from 'lucide-react';

export default function DailyTracker() {
  const dailyCase = getDailyCase(); // Buscar o caso do dia

  // Lógica de progresso da semana (ainda mockada)
  const weekData = [
    { day: 'S', done: true },
    { day: 'T', done: true },
    { day: 'Q', done: false }, // Hoje (não feito)
    { day: 'Q', done: false },
    { day: 'S', done: false },
    { day: 'S', done: false },
    { day: 'D', done: false },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Paciente do Dia</h2>
        {/* Lógica do seletor virá depois */}
      </div>

      {/* Card do Paciente do Dia */}
      <a
        href="#" // No futuro, isso levará para a tela do jogo com o caso
        className="block p-6 bg-card rounded-lg border hover:border-primary transition-colors mb-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary`}>
              {dailyCase.difficulty}
            </span>
            <h3 className="text-xl font-bold mt-2">{dailyCase.category}</h3>
          </div>
          <Stethoscope className="w-8 h-8 text-foreground/30" />
        </div>
        <p className="text-sm text-foreground/80 mt-4">
          {dailyCase.history}
        </p>
      </a>
      
      {/* Tracker da Semana */}
      <div className="p-4 bg-card rounded-lg border">
        <h3 className="text-sm font-semibold mb-4">Progresso Semanal</h3>
        <div className="flex justify-between">
          {weekData.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono">{item.day}</span>
              {item.done ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-foreground/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}