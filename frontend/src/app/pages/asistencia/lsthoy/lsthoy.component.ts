import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaserviceService } from '../asistenciaservice.service';
import { Asistencia } from '../asistencia';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-lsthoy',
  imports: [FormsModule],
  templateUrl: './lsthoy.component.html',
  styleUrl: './lsthoy.component.css'
})
export class LsthoyComponent {
  filtroNombre: string = '';
  asistencias: Asistencia[] = [];
  rol: string | null = null;
  empleadoId: number | null = null;
  private authService = inject(AuthService);
  constructor(
    private router: ActivatedRoute,
    private asistenciaService: AsistenciaserviceService,
    private route: Router
  ) {}
    ngOnInit() {
      this.rol = this.authService.getRolActual();
      this.empleadoId = this.authService.getEmpleadoIdActual();
      
      if (this.rol === 'EMPLEADO' && this.empleadoId) {
        this.cargarAsistenciasDelEmpleado();
      } else {
        this.cargarTodasLasAsistencias();
      }
    }

    cargarAsistenciasDelEmpleado(): void {
      if (this.empleadoId) {
        this.asistenciaService.getAsistenciaHoy().subscribe({
          next: (response) => {
            this.asistencias = response.filter(a => a.empleado?.id === this.empleadoId);
          }
        });
      }
    }

    cargarTodasLasAsistencias(): void {
      this.asistenciaService.getAsistenciaHoy().subscribe({
        next: (response) => {
          this.asistencias = response;
        }
      });
    }

    onGenerarAsistencia() {
      this.route.navigate(['nuevo'], { relativeTo: this.router });
    }
    onGenerarSalida(id: number): void{
      this.asistenciaService.updateAsistencia(id).subscribe({
        next: (res) => {
          console.log("Hora actualizada", res);
          alert("Se marco la hora de salida")
          this.ngOnInit();
        },
        error: (err) => {
          console.error("Error al actualizar hora", err);
        }
      })
    }
    verificarContrasena() {
      this.route.navigate(['/pages/asistencias']);
    }
  get Filtros(): Asistencia[] {
    if (!this.filtroNombre) return this.asistencias;
    return this.asistencias.filter(item =>
      (item.empleado.nombre + ' ' + item.empleado.apellido).toLowerCase().includes(this.filtroNombre.toLowerCase()))
  }
}
