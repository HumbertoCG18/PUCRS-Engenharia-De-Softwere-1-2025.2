import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { accuracyChartData } from '../../data/mockData'; // Importa os dados

function AccuracyChart() {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg h-64">
      <h3 className="text-lg font-semibold text-white mb-4">Desempenho nos Últimos Casos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={accuracyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
           {/* O resto do componente permanece igual */}
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} unit="%" />
          <Tooltip
            cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }}
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#d1d5db' }}
          />
          <Bar dataKey="acerto" fill="#3b82f6" name="Acerto" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AccuracyChart;