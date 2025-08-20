// src/components/home/DailyTracker.js
import { CheckCircle2, Circle } from 'lucide-react';

export default function DailyTracker() {
  const weekData = [
    { day: 'S', done: true },
    { day: 'T', done: true },
    { day: 'Q', done: false },
    { day: 'Q', done: false },
    { day: 'S', done: false },
    { day: 'S', done: false },
    { day: 'D', done: false },
  ];

  return (
    <div className="w-full p-6 bg-black/[.05] dark:bg-white/[.06] rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Semana 1</h2>
        {/* Lógica para alterar a visualização (semana, 2 semanas, etc) será implementada futuramente */}
        <select className="bg-transparent border-none text-sm focus:ring-0">
          <option>Semana</option>
          <option>2 Semanas</option>
          <option>1 Mês</option>
        </select>
      </div>
      <p className="text-sm text-foreground/80 mb-6">
        Complete o paciente do dia para manter sua sequência.
      </p>
      <div className="flex justify-between">
        {weekData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono">{item.day}</span>
            {item.done ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}