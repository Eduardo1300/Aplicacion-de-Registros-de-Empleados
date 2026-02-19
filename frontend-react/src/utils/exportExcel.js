import * as XLSX from 'xlsx'

export const exportToExcel = (data, filename = 'reporte') => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos')
  
  const colWidths = Object.keys(data[0] || {}).map(key => ({
    wch: Math.max(key.length, ...data.map(row => String(row[key] || '').length))
  }))
  worksheet['!cols'] = colWidths
  
  XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`)
}

export const exportEmployeesToExcel = (empleados) => {
  const data = empleados.map(emp => ({
    DNI: emp.dni,
    Nombre: emp.nombre,
    Apellido: emp.apellido,
    Correo: emp.correo,
    Teléfono: emp.telefono,
    Departamento: emp.departamento?.nombre || '-',
    Cargo: emp.cargo?.nombre || '-',
    Estado: emp.estado,
    'Fecha Ingreso': emp.fechaIngreso,
  }))
  exportToExcel(data, 'empleados')
}

export const exportAsistenciasToExcel = (asistencias) => {
  const data = (asistencias || []).map(asist => ({
    Fecha: asist.fecha,
    Empleado: `${asist.empleado?.nombre || ''} ${asist.empleado?.apellido || ''}`.trim(),
    Entrada: asist.horaEntrada || '-',
    Salida: asist.horaSalida || '-',
    Tipo: asist.tipo,
  }))
  exportToExcel(data, 'asistencias')
}

export const exportLicenciasToExcel = (licencias) => {
  const data = (licencias || []).map(lic => ({
    Empleado: `${lic.empleado?.nombre || ''} ${lic.empleado?.apellido || ''}`.trim(),
    Tipo: lic.tipoLicencia?.nombre || '-',
    'Fecha Inicio': lic.fechaInicio,
    'Fecha Fin': lic.fechaFin,
    Estado: lic.estado,
    Motivo: lic.motivo || '-',
  }))
  exportToExcel(data, 'licencias')
}
