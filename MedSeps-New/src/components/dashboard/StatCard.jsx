function StatCard({ title, value, unit, icon }) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300">
      <div className="flex items-center">
        {icon && <div className="mr-4 text-blue-400">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold">
            {value} <span className="text-base font-normal text-gray-300">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;