const StatsCard = ({ icon, iconBg, title, value, subtitle, trend, trendColor = 'green' }) => {
  const trendColors = {
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    blue: 'text-blue-600 bg-blue-50',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            {trend !== undefined && (
              <span className={`text-sm ${trendColors[trendColor]}`}>
                {trend > 0 ? (
                  <>
                    <i className="bi bi-arrow-up-right"></i> {trend}%
                  </>
                ) : trend < 0 ? (
                  <>
                    <i className="bi bi-arrow-down-right"></i> {Math.abs(trend)}%
                  </>
                ) : (
                  'Sin cambios'
                )}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl text-white ${iconBg}`}>
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
