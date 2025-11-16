import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LstEmpleadoComponent } from './pages/empleado/lst-empleado/lst-empleado.component';
import { DetalleAsistenciaComponent } from './pages/asistencia/detalle-asistencia/detalle-asistencia.component';
import { LstAsistenciaComponent } from './pages/asistencia/lst-asistencia/lst-asistencia.component';
import { DetalleEmpleadoComponent } from './pages/empleado/detalle-empleado/detalle-empleado.component';
import { LsthoyComponent } from './pages/asistencia/lsthoy/lsthoy.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VerEmpleadoComponent } from './pages/empleado/ver-empleado/ver-empleado.component';
import { LstdepartamentoComponent } from './pages/departamento/lstdepartamento/lstdepartamento.component';
import { VerDepartamentoComponent } from './pages/departamento/ver-departamento/ver-departamento.component';
import { AgregarDepartamentoComponent } from './pages/departamento/agregar-departamento/agregar-departamento.component';
import { JustificacionComponent } from './pages/justificacion/justificacion.component';
import { AdminJustificacionesComponent } from './pages/justificacion/admin-justificaciones/admin-justificaciones.component';
import { DashboardEmpleadoComponent } from './pages/dashboard-empleado/dashboard-empleado.component';
import { CheckAsistenciaComponent } from './pages/asistencia/check-asistencia/check-asistencia.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { LicenciasComponent } from './pages/licencias/licencias.component';
import { HorariosComponent } from './pages/horarios/horarios.component';
import { NominaComponent } from './pages/nomina/nomina.component';
import { ComunicacionComponent } from './pages/comunicacion/comunicacion.component';
import { DashboardAvanzadoComponent } from './pages/dashboard-avanzado/dashboard-avanzado.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'pages',
        component: PagesComponent,
        children: [
            { path: 'marcar-asistencia', component: CheckAsistenciaComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'dashboard-empleado', component: DashboardEmpleadoComponent },
            { path: 'empleados', component: LstEmpleadoComponent },
            { path: 'empleados/ver', component: VerEmpleadoComponent },
            { path: 'empleados/ver/:id', component: VerEmpleadoComponent },
            { path: 'empleados/:id', component: DetalleEmpleadoComponent },
            { path: 'asistencias-hoy/:id', component: DetalleAsistenciaComponent },
            { path: 'asistencias', component: LstAsistenciaComponent },
            { path: 'asistencias-hoy', component: LsthoyComponent },
            { path: 'departamentos', component: LstdepartamentoComponent },
            { path: 'departamentos/crear', component: AgregarDepartamentoComponent },
            { path: 'departamentos/ver/:id', component: VerDepartamentoComponent },
            { path: 'justificacion', component: JustificacionComponent },
            { path: 'justificacion/admin', component: AdminJustificacionesComponent },
            { path: 'reportes', component: ReportesComponent },
            { path: 'licencias', component: LicenciasComponent },
            { path: 'horarios', component: HorariosComponent },
            { path: 'nomina', component: NominaComponent },
            { path: 'comunicacion', component: ComunicacionComponent },
            { path: 'dashboard-avanzado', component: DashboardAvanzadoComponent },
            { path: '', redirectTo: 'dashboard-empleado', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'pages/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'pages/dashboard' }
];
