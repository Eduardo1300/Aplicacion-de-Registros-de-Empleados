const SaldoLicencias = ({ diasDisponibles, diasUsados, diasTotales }) => {
  const porcentajeUsado = diasTotales > 0 ? (diasUsados / diasTotales) * 100 : 0;
  const porcentajeDisponible = 100 - porcentajeUsado;

  const getColor = (porcentaje) => {
    if (porcentaje > 50) return 'bg-green-500';
    if (porcentaje > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Saldo de Licencias</h3>
        <p className="text-sm text-gray-500">Disponible para el año</p>
      </div>

      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="flex gap-1 h-8 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
          {diasUsados > 0 && (
            <div
              className="bg-red-500 transition-all duration-300 flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${porcentajeUsado}%` }}
              title={`${diasUsados} días usados`}
            >
              {porcentajeUsado > 10 && `${diasUsados}d`}
            </div>
          )}
          {diasDisponibles > 0 && (
            <div
              className={`${getColor(porcentajeDisponible)} transition-all duration-300 flex items-center justify-center text-white text-xs font-bold`}
              style={{ width: `${porcentajeDisponible}%` }}
              title={`${diasDisponibles} días disponibles`}
            >
              {porcentajeDisponible > 10 && `${diasDisponibles}d`}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{diasDisponibles}</div>
          <div className="text-xs text-gray-500 mt-1">Disponibles</div>
        </div>
        <div className="text-center border-l border-r border-gray-200">
          <div className="text-2xl font-bold text-red-500">{diasUsados}</div>
          <div className="text-xs text-gray-500 mt-1">Usados</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{diasTotales}</div>
          <div className="text-xs text-gray-500 mt-1">Total</div>
        </div>
      </div>

      {/* Alerta si está bajo */}
      {diasDisponibles <= 3 && diasDisponibles > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <i className="bi bi-exclamation-circle mr-1"></i>
            Quedan pocos días de licencia disponibles
          </p>
        </div>
      )}

      {diasDisponibles === 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-800">
            <i className="bi bi-x-circle mr-1"></i>
            No hay días de licencia disponibles
          </p>
        </div>
      )}
    </div>
  );
};

export default SaldoLicencias;
