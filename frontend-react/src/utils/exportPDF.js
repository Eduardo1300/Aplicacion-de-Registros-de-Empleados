import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const exportToPDF = (title, columns, data, filename = 'reporte') => {
  const doc = new jsPDF()
  
  doc.setFontSize(18)
  doc.setTextColor(40, 40, 40)
  doc.text(title, 14, 22)
  
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 14, 30)
  
  const tableData = data.map(row => 
    columns.map(col => {
      const value = col.key.split('.').reduce((obj, key) => obj?.[key], row)
      return value || '-'
    })
  )
  
  doc.autoTable({
    head: [columns.map(col => col.title)],
    body: tableData,
    startY: 35,
    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [102, 126, 234],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  })
  
  doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`)
}

export const exportEmployeesToPDF = (empleados) => {
  const columns = [
    { title: 'DNI', key: 'dni' },
    { title: 'Nombre', key: 'nombre' },
    { title: 'Apellido', key: 'apellido' },
    { title: 'Correo', key: 'correo' },
    { title: 'Teléfono', key: 'telefono' },
    { title: 'Departamento', key: 'departamento.nombre' },
    { title: 'Cargo', key: 'cargo.nombre' },
    { title: 'Estado', key: 'estado' },
  ]
  exportToPDF('Reporte de Empleados', columns, empleados, 'empleados')
}

export const exportAsistenciasToPDF = (asistencias) => {
  const columns = [
    { title: 'Fecha', key: 'fecha' },
    { title: 'Empleado', key: 'empleado.nombre' },
    { title: 'Apellido', key: 'empleado.apellido' },
    { title: 'Entrada', key: 'horaEntrada' },
    { title: 'Salida', key: 'horaSalida' },
    { title: 'Tipo', key: 'tipo' },
  ]
  exportToPDF('Reporte de Asistencias', columns, asistentes || [], 'asistencias')
}

export const exportLicenciasToPDF = (licencias) => {
  const columns = [
    { title: 'Empleado', key: 'empleado.nombre' },
    { title: 'Apellido', key: 'empleado.apellido' },
    { title: 'Tipo', key: 'tipoLicencia.nombre' },
    { title: 'Fecha Inicio', key: 'fechaInicio' },
    { title: 'Fecha Fin', key: 'fechaFin' },
    { title: 'Estado', key: 'estado' },
  ]
  exportToPDF('Reporte de Licencias', columns, licencias || [], 'licencias')
}
