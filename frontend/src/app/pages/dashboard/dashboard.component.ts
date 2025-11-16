// @ts-ignore
import jsPDF from 'jspdf';
import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmpleadoService } from '../../services/empleadoservice.service';
import { AsistenciaserviceService } from '../asistencia/asistenciaservice.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  // Calcula el máximo de tardanzas para la barra de progreso
  get maxTardanzas(): number {
    return Math.max(...this.empleadosTardanza.map((e: any) => e.tardanzas), 1);
  }
  // ViewChild canvas references
  @ViewChild('chartTardanza') chartTardanzaRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartPorcentaje') chartPorcentajeRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartMes') chartMesRef!: ElementRef<HTMLCanvasElement>;

  // Chart instances container
  private charts: Chart[] = [];

  // Data from API
  asistenciasPorMes = [
    { mes: 'Enero', cantidad: 0 },
    { mes: 'Febrero', cantidad: 0 },
    { mes: 'Marzo', cantidad: 0 },
    { mes: 'Abr', cantidad: 0 },
    { mes: 'May', cantidad: 0 },
    { mes: 'Jun', cantidad: 0 },
    { mes: 'Jul', cantidad: 0 },
    { mes: 'Ago', cantidad: 0 },
    { mes: 'Sep', cantidad: 0 },
    { mes: 'Oct', cantidad: 0 },
    { mes: 'Nov', cantidad: 0 },
    { mes: 'Dic', cantidad: 0 }
  ];

  empleadosTardanza = [
    { nombre: 'Cargando...', tardanzas: 0 }
  ];

  porcentajeAsistencia = 0;

  // KPI cards
  totalEmpleados = 0;
  promediTardanzas = 0;
  activos = 0;

  kpis = [
    { label: 'Total de empleados', value: 0, displayValue: '0', icon: 'bi bi-people-fill', color: 'linear-gradient(135deg,#6c5ce7,#a29bfe)' },
    { label: 'Promedio de tardanzas', value: 0, displayValue: '0', icon: 'bi bi-clock-fill', color: 'linear-gradient(135deg,#ff7b54,#ffb86b)' },
    { label: 'Porcentaje de asistencia', value: 0, displayValue: '0', icon: 'bi bi-check2-circle', color: 'linear-gradient(135deg,#2ecc71,#60d394)' },
    { label: 'Activos hoy', value: 0, displayValue: '0', icon: 'bi bi-calendar-check-fill', color: 'linear-gradient(135deg,#42a5f5,#73c6ff)' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private empleadoService: EmpleadoService,
    private asistenciaService: AsistenciaserviceService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    // Start KPI animation a bit after init so DOM nodes exist
    setTimeout(() => this.animateKPIs(), 350);
  }

  cargarDatos(): void {
    console.log('=== INICIANDO CARGA DE DATOS DEL DASHBOARD ===');
    
    // Cargar empleados
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (empleados: any[]) => {
        this.totalEmpleados = empleados.length;
        this.kpis[0].value = this.totalEmpleados;
        console.log('✓ Empleados cargados:', this.totalEmpleados, empleados);

        // Por ahora, mostrar todos los empleados sin tardanzas
        this.empleadosTardanza = empleados.slice(0, 5).map((emp: any) => ({
          nombre: `${emp.nombre} ${emp.apellido}`,
          tardanzas: 0,
          empleadoId: emp.id
        }));

        console.log('✓ Empleados tardanza (inicial):', this.empleadosTardanza);
      },
      error: (err: any) => {
        console.error('✗ Error cargando empleados:', err);
      }
    });

    // Cargar asistencias
    this.asistenciaService.getAllAsistencia().subscribe({
      next: (asistencias: any[]) => {
        console.log('✓ Asistencias cargadas:', asistencias ? asistencias.length : 0);
        if (asistencias && Array.isArray(asistencias)) {
          this.procesarAsistencias(asistencias);
        } else {
          console.warn('⚠ asistencias es null o no es array');
          this.procesarAsistencias([]);
        }
      },
      error: (err: any) => console.error('✗ Error cargando asistencias:', err)
    });
  }

  procesarAsistencias(asistencias: any[]): void {
    console.log('=== PROCESANDO ASISTENCIAS ===');
    console.log('Total asistencias recibidas:', asistencias.length);
    
    // Contar asistencias por mes
    const meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const hoy = new Date();
    const asistenciasHoy = hoy.toISOString().split('T')[0]; // "2025-10-28" format
    let actividadHoy = 0;

    // Contar tardanzas por empleado
    const tardanzasPorEmpleado: any = {};
    let totalTardanzasGlobal = 0;

    asistencias.forEach((asistencia: any) => {
      // Handle fechaAsistencia as string "2025-10-08" or as array [2025,10,8]
      let fechaStr: string;
      if (typeof asistencia.fechaAsistencia === 'string') {
        fechaStr = asistencia.fechaAsistencia;
      } else if (Array.isArray(asistencia.fechaAsistencia)) {
        const [year, month, day] = asistencia.fechaAsistencia;
        fechaStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      } else {
        const fecha = new Date(asistencia.fechaAsistencia);
        fechaStr = fecha.toISOString().split('T')[0];
      }
      
      const fecha = new Date(fechaStr);
      const mes = fecha.getMonth();
      meses[mes]++;

      // Contar activos hoy
      if (fechaStr === asistenciasHoy) {
        actividadHoy++;
      }

      // Contar tardanzas por empleado_id
      const estado = asistencia.estado;
      
      if (estado === 'TARDANZA') {
        const empleadoId = asistencia.empleado?.id || asistencia.empleado_id;
        tardanzasPorEmpleado[empleadoId] = (tardanzasPorEmpleado[empleadoId] || 0) + 1;
        totalTardanzasGlobal++;
      }
    });

    console.log('✓ Tardanzas por empleado:', tardanzasPorEmpleado);
    console.log('✓ Total tardanzas global:', totalTardanzasGlobal);

    // Actualizar datos de meses
    this.asistenciasPorMes.forEach((item, idx) => {
      item.cantidad = meses[idx];
    });
    console.log('✓ Asistencias por mes actualizado');

    // Calcular porcentaje de asistencia
    if (this.totalEmpleados > 0) {
      this.porcentajeAsistencia = Math.round((asistencias.length / (this.totalEmpleados * 22)) * 100);
      if (this.porcentajeAsistencia > 100) this.porcentajeAsistencia = 100;
    }
    console.log('✓ Porcentaje de asistencia:', this.porcentajeAsistencia);

    this.kpis[2].value = this.porcentajeAsistencia;
    this.activos = actividadHoy;
    this.kpis[3].value = this.activos;

    // Obtener empleados nuevamente para mapear tardanzas
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (empleados: any[]) => {
        console.log('=== MAPEANDO TARDANZAS A EMPLEADOS ===');
        console.log('Total empleados:', empleados.length);

        // Crear lista de empleados con sus tardanzas (TODOS)
        const empleadosConTardanzas = empleados
          .map((emp: any) => ({
            nombre: `${emp.nombre} ${emp.apellido}`,
            tardanzas: tardanzasPorEmpleado[emp.id] || 0,
            empleadoId: emp.id
          }))
          .sort((a: any, b: any) => b.tardanzas - a.tardanzas)
          .slice(0, 5);

        console.log('✓ Top 5 empleados con tardanzas:', empleadosConTardanzas);
        this.empleadosTardanza = empleadosConTardanzas;

        // Calcular promedio de tardanzas
        const totalTardanzas = Object.values(tardanzasPorEmpleado).reduce((a: any, b: any) => a + b, 0) as number;
        this.promediTardanzas = empleados.length > 0 ? totalTardanzas / empleados.length : 0;
        
        console.log('✓ Total tardanzas para promedio:', totalTardanzas);
        console.log('✓ Promedio de tardanzas:', this.promediTardanzas);
        
        this.kpis[1].value = parseFloat(this.promediTardanzas.toFixed(2));
        console.log('✓ KPI promedio actualizado:', this.kpis[1].value);

        // Redibujar todos los gráficos después de actualizar datos
        console.log('Redibuljando gráficos...');
        setTimeout(() => {
          this.initTardanzaChart();
          this.initPorcentajeChart();
          this.initMesChart();
          console.log('✓ Gráficos redibujados');
        }, 100);
      },
      error: (err: any) => console.error('✗ Error cargando empleados para tardanzas:', err)
    });
  }

  ngAfterViewInit(): void {
    // Initialize charts after view is ready
    setTimeout(() => {
      this.initTardanzaChart();
      this.initPorcentajeChart();
      this.initMesChart();
    }, 100);
  }

  ngOnDestroy(): void {
    // Destroy all Chart.js instances to avoid memory leaks
    this.charts.forEach(c => {
      try { c.destroy(); } catch (e) { /* ignore */ }
    });
    this.charts = [];
  }

  /* -----------------------
     Chart initializers
     ----------------------- */

  private destroyChartByElement(element: HTMLCanvasElement): void {
    if (!element) return;
    // Buscar y destruir el gráfico asociado a este elemento
    const chartIndex = this.charts.findIndex(c => c.canvas === element);
    if (chartIndex !== -1) {
      try {
        this.charts[chartIndex].destroy();
        this.charts.splice(chartIndex, 1);
      } catch (e) { /* ignore */ }
    }
  }

  private initTardanzaChart() {
    try {
      const el = this.chartTardanzaRef?.nativeElement;
      if (!el) return;

      // Destruir gráfico anterior
      this.destroyChartByElement(el);

      const labels = this.empleadosTardanza.map(e => e.nombre);
      const data = this.empleadosTardanza.map(e => e.tardanzas);

      console.log('Inicializando gráfico de tardanzas con datos:', { labels, data });

      const cfg = {
        type: 'bar' as const,
        data: {
          labels,
          datasets: [{
            label: 'Tardanzas',
            data,
            backgroundColor: [
              '#1976d2', '#43a047', '#fbc02d', '#e53935', '#8e24aa',
              '#00897b', '#f57c00', '#c2185b', '#7e57c2', '#00acc1'
            ].slice(0, data.length),
            borderRadius: 8
          }]
        },
        options: {
          indexAxis: 'y' as const,
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { beginAtZero: true }
          }
        }
      };

      const ctx = el.getContext('2d')!;
      this.charts.push(new Chart(ctx, cfg));
    } catch (err) {
      console.error('Error initializing Tardanza chart', err);
    }
  }

  private initPorcentajeChart() {
    try {
      const el = this.chartPorcentajeRef?.nativeElement;
      if (!el) return;

      // Destruir gráfico anterior
      this.destroyChartByElement(el);

      const cfg = {
        type: 'doughnut' as const,
        data: {
          labels: ['Asistencia', 'Faltas'],
          datasets: [{
            data: [this.porcentajeAsistencia, 100 - this.porcentajeAsistencia],
            backgroundColor: ['#2e7d32', '#e0e0e0'],
            hoverOffset: 6,
            cutout: '70%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      };

      const ctx = el.getContext('2d')!;
      this.charts.push(new Chart(ctx, cfg));
    } catch (err) {
      console.error('Error initializing Porcentaje chart', err);
    }
  }

  private initMesChart() {
    try {
      const el = this.chartMesRef?.nativeElement;
      if (!el) return;

      // Destruir gráfico anterior
      this.destroyChartByElement(el);

      const labels = this.asistenciasPorMes.map(m => m.mes);
      const data = this.asistenciasPorMes.map(m => m.cantidad);

      const ctx = el.getContext('2d')!;
      // create gradient for fill
      const gradient = ctx.createLinearGradient(0, 0, 0, 250);
      gradient.addColorStop(0, 'rgba(66,165,245,0.28)');
      gradient.addColorStop(1, 'rgba(66,165,245,0)');

      const cfg = {
        type: 'line' as const,
        data: {
          labels,
          datasets: [{
            label: 'Asistencias',
            data,
            fill: true,
            tension: 0.35,
            backgroundColor: gradient,
            borderColor: '#1976d2',
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      };

      this.charts.push(new Chart(ctx, cfg));
    } catch (err) {
      console.error('Error initializing Mes chart', err);
    }
  }

  /* -----------------------
     KPI animation
     ----------------------- */
  private animateKPIs() {
    // animate displayed values from 0 to actual value
    const elems = Array.from(document.querySelectorAll('.kpi-value')) as HTMLElement[];
    this.kpis.forEach((k, idx) => {
      const el = elems[idx];
      if (!el) return;
      const target = Number(k.value);
      const duration = 900;
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = progress * target;
        if (typeof k.value === 'number' && k.value % 1 !== 0) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = String(Math.round(current));
        }
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  /* -----------------------
     Actions
     ----------------------- */

  descargarPDF() {
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      let y = 40;

      // Título y fecha
      doc.setFontSize(20);
      doc.setTextColor(30, 58, 138); // Navy blue
      doc.text('REPORTE DEL DASHBOARD', 40, y);
      y += 20;

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const fechaReporte = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
      doc.text(`Fecha de generación: ${fechaReporte}`, 40, y);
      y += 20;

      // Helper para agregar imagen de canvas
      const addCanvasImage = (canvas: HTMLCanvasElement | null, targetW: number, title?: string) => {
        if (!canvas) return;
        try {
          if (title) {
            if (y + 20 > pageH - 40) { doc.addPage(); y = 40; }
            doc.setFontSize(12);
            doc.setTextColor(30, 58, 138);
            doc.text(title, 40, y);
            y += 15;
          }

          const imgData = canvas.toDataURL('image/png');
          const aspect = (canvas.height || 1) / (canvas.width || 1);
          const targetH = targetW * aspect;
          
          if (y + targetH > pageH - 40) {
            doc.addPage();
            y = 40;
          }
          
          doc.addImage(imgData, 'PNG', 40, y, targetW, targetH);
          y += targetH + 15;
        } catch (e) {
          console.warn('No se pudo renderizar canvas a PDF', e);
        }
      };

      // KPIs Summary
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 138);
      doc.text('INDICADORES CLAVE (KPIs)', 40, y);
      y += 12;

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const kpisText = [
        `• Total de empleados: ${this.totalEmpleados}`,
        `• Promedio de tardanzas: ${this.promediTardanzas.toFixed(2)}`,
        `• Porcentaje de asistencia: ${this.porcentajeAsistencia}%`,
        `• Activos hoy: ${this.activos}`
      ];

      kpisText.forEach(text => {
        if (y + 12 > pageH - 40) { doc.addPage(); y = 40; }
        doc.text(text, 50, y);
        y += 12;
      });
      y += 10;

      // Gráfico de asistencias por mes
      addCanvasImage(this.chartMesRef?.nativeElement ?? null, pageW - 80, '1. ASISTENCIAS MENSUALES');
      
      // Tabla de datos mensuales
      doc.setFontSize(10);
      this.asistenciasPorMes.forEach((item, i) => {
        if (y + 12 > pageH - 40) { doc.addPage(); y = 40; }
        doc.text(`   ${item.mes}: ${item.cantidad} registros`, 50, y);
        y += 10;
      });
      y += 8;

      // Gráfico de tardanzas
      addCanvasImage(this.chartTardanzaRef?.nativeElement ?? null, pageW - 80, '2. TOP 5 EMPLEADOS CON MÁS TARDANZAS');
      
      // Tabla de empleados con tardanzas
      doc.setFontSize(10);
      this.empleadosTardanza.forEach((emp, i) => {
        if (y + 12 > pageH - 40) { doc.addPage(); y = 40; }
        doc.text(`   ${i + 1}. ${emp.nombre}: ${emp.tardanzas} tardanzas`, 50, y);
        y += 10;
      });
      y += 8;

      // Gráfico de porcentaje
      if (y + 200 > pageH - 40) { doc.addPage(); y = 40; }
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 138);
      doc.text('3. PORCENTAJE DE ASISTENCIA GENERAL', 40, y);
      y += 15;

      addCanvasImage(this.chartPorcentajeRef?.nativeElement ?? null, 150);

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Presentes: ${this.porcentajeAsistencia}%`, 60, y);
      y += 12;
      doc.text(`Ausentes: ${100 - this.porcentajeAsistencia}%`, 60, y);
      y += 20;

      // Pie de página
      if (y + 30 > pageH - 40) { doc.addPage(); y = 40; }
      y = pageH - 30;
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('Este reporte ha sido generado automáticamente desde el Sistema de Registro de Empleados', 40, y);
      y += 10;
      doc.text('© 2025 - Todos los derechos reservados', 40, y);

      doc.save(`Dashboard_Reporte_${new Date().getTime()}.pdf`);
      console.log('✓ PDF exportado exitosamente');
    } catch (err) {
      console.error('Error exportando PDF:', err);
      alert('Error al exportar PDF. Por favor revisa la consola para más detalles.');
    }
  }

  refreshData() {
    // Recargar datos desde la API
    this.cargarDatos();
    console.log('Datos actualizados');
    // Redibuja los gráficos
    this.charts.forEach(c => { try { c.destroy(); } catch (e) {} });
    this.charts = [];
    setTimeout(() => {
      this.initTardanzaChart();
      this.initPorcentajeChart();
      this.initMesChart();
      this.animateKPIs();
    }, 150);
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
