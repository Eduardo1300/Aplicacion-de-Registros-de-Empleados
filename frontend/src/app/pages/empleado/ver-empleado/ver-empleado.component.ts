import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoserviceService } from '../empleadoservice.service';
import { AuthService } from '../../../services/auth.service';
import { Empleado } from '../empleado';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ver-empleado',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './ver-empleado.component.html',
  styleUrls: []
})
export class VerEmpleadoComponent implements OnInit, OnDestroy {
  empleado: Empleado | null = null;
  empleadoIdActual: number | null = null;
  esSuProfiil: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoserviceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del empleado actual desde el JWT
    this.empleadoIdActual = this.authService.getEmpleadoIdActual();
    
    if (!this.empleadoIdActual) {
      console.error('No se pudo obtener el ID del empleado actual');
      this.router.navigate(['/pages/dashboard-empleado']);
      return;
    }

    // Obtener el ID de la ruta (si existe, es cuando el admin ve a otro empleado)
    const idDeLaRuta = this.route.snapshot.paramMap.get('id');
    
    if (idDeLaRuta) {
      // El admin está viendo a otro empleado
      this.empleadoService.getEmpleadoById(Number(idDeLaRuta))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.empleado = response;
            this.esSuProfiil = false;
            console.log('Empleado cargado (admin viendo otro empleado):', response);
          },
          error: (e) => {
            console.error('Error al cargar el empleado:', e);
            this.router.navigate(['/pages/empleados']);
          }
        });
    } else {
      // El empleado está viendo su propio perfil
      this.empleadoService.getEmpleadoById(this.empleadoIdActual)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.empleado = response;
            this.esSuProfiil = true;
            console.log('Empleado actual cargado (mi perfil):', response);
          },
          error: (e) => {
            console.error('Error al cargar el empleado actual:', e);
            this.router.navigate(['/pages/dashboard-empleado']);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDepartamentoBadgeClass(nombre?: string): string {
    if (!nombre) return '';
    const key = nombre.toLowerCase().replace(/ /g, '-');
    return `bg-depto-${key}`;
  }

  onVolver(): void {
    window.history.length > 1 ? window.history.back() : location.href = '/pages/dashboard-empleado';
  }
}