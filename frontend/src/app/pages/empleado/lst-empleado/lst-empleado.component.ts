import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoModel } from '../../../Model/EmpleadoModel';
import { EmpleadoService } from '../../../services/empleadoservice.service';

@Component({
  selector: 'app-lst-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lst-empleado.component.html',
  styleUrls: ['./lst-empleado.component.css']
})
export class LstEmpleadoComponent implements OnInit {
  empleados: EmpleadoModel[] = [];
  filtroNombre: string = '';

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (data) => {
        console.log('Fetched employees:', data); // Debugging log
        this.empleados = data;
      },
      error: (err) => {
        console.error('Error fetching employees:', err); // Debugging log
        if (err.status === 403) {
          // Eliminar mensaje de acceso denegado
        }
      }
    });
  }

  get empleadosFiltrados(): EmpleadoModel[] {
    if (!this.filtroNombre) return this.empleados;
    return this.empleados.filter(e =>
      (e.nombre + ' ' + e.apellido).toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  agregarEmpleado() {
    this.router.navigate(['/pages/empleados/nuevo']);
  }

  verEmpleado(id: number) {
    // Navegar a la ruta que carga un empleado específico
    this.router.navigate(['/pages/empleados/ver', id]);
  }

  editarEmpleado(id: number) {
    // Navegar a la ruta de edición
    this.router.navigate(['/pages/empleados', id]);
  }
}