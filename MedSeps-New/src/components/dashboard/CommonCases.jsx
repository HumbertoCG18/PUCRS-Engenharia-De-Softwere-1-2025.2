import { Lung, Bug, AlertTriangle } from 'lucide-react';

const CaseItem = ({ icon: Icon, title, percentage }) => (
  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md">
    <div className="flex items-center">
      <Icon className="text-blue-400 mr-3" size={20} />
      <span className="text-sm font-medium text-gray-300">{title}</span>
    </div>
    <span className="text-sm font-bold text-white">{percentage}%</span>
  </div>
);

function CommonCases() {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Focos de Sepse Comuns</h3>
      <div className="space-y-3">
        <CaseItem icon={Lung} title="Foco Pulmonar" percentage={45} />
        <CaseItem icon={Bug} title="Foco Abdominal" percentage={25} />
        <CaseItem icon={AlertTriangle} title="Foco Urinário" percentage={18} />
      </div>
    </div>
  );
}

export default CommonCases;