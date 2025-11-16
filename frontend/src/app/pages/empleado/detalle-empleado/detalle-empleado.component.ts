import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { Departamento } from '../../departamento/Departamento';
import { EmpleadoserviceService } from '../empleadoservice.service';
import { EmpleadoModel } from '../../../Model/EmpleadoModel';

enum FormMode {
  Crear,
  Editar
}

@Component({
  selector: 'app-detalle-empleado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {
  
  departamentos: Departamento[] = [];
  cargos: any[] = [];
  empleadosExistentes: any[] = [];
  empleado: EmpleadoModel = this.inicializarEmpleado();
  
  titulo: string = "";
  mode: FormMode = FormMode.Crear;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empleadoService: EmpleadoserviceService
  ) {}

  ngOnInit() {
    this.cargarDepartamentos();
    this.cargarCargos();
    this.cargarEmpleadosExistentes();
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'nuevo') {
      this.mode = FormMode.Editar;
      this.titulo = "Modificar Datos del Empleado";
      this.cargarEmpleado(Number(id));
    } else {
      this.mode = FormMode.Crear;
      this.titulo = "Registrar Nuevo Empleado";
      this.empleado = this.inicializarEmpleado();
    }
  }

  cargarDepartamentos() {
    this.empleadoService.getDepartamentos().subscribe({
      next: (res) => { this.departamentos = res; },
      error: (err) => console.error('Error cargando departamentos', err)
    });
  }

  cargarCargos() {
    this.empleadoService.getCargos().subscribe({
      next: (res) => { this.cargos = res; },
      error: (err) => console.error('Error cargando cargos', err)
    });
  }

  cargarEmpleadosExistentes() {
    this.empleadoService.getAllEmpleado().subscribe({
      next: (res: any[]) => { this.empleadosExistentes = res; },
      error: (err: any) => console.error('Error cargando empleados', err)
    });
  }

  cargarEmpleado(id: number) {
    this.empleadoService.getEmpleadoById(id).subscribe({
      next: (response) => {
        this.empleado = {
          ...response,
          estado: response.estado || "Activo",
          cargo: response.cargo && response.cargo.id ? response.cargo : { id: 0, nombre: "" },
          // Convertir fecha a string si es necesario para el input date
          fechaIngreso: this.convertirFechaAString(response.fechaIngreso)
        };
      },
      error: (err) => {
        console.error('Error cargando empleado', err);
        alert('No se pudo cargar el empleado.');
        this.router.navigate(['/pages/empleados']);
      }
    });
  }

  private convertirFechaAString(fecha: any): any {
    if (!fecha) return new Date();
    if (typeof fecha === 'string') return fecha;
    if (fecha instanceof Date) {
      return fecha.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  }

  guardarCambios() {
    // Validación básica
    if (!this.empleado.nombre?.trim()) {
      alert('El nombre es requerido');
      return;
    }
    if (!this.empleado.apellido?.trim()) {
      alert('El apellido es requerido');
      return;
    }
    if (!this.empleado.dni?.trim()) {
      alert('El DNI es requerido');
      return;
    }
    if (!this.empleado.correo?.trim()) {
      alert('El correo es requerido');
      return;
    }
    if (!this.empleado.departamento) {
      alert('Debe seleccionar un departamento');
      return;
    }
    if (!this.empleado.cargo) {
      alert('Debe seleccionar un cargo');
      return;
    }

    // Validar DNI - solo números y 8 dígitos
    const dniPattern = /^\d{8}$/;
    if (!dniPattern.test(this.empleado.dni)) {
      alert('El DNI debe contener exactamente 8 dígitos');
      return;
    }

    // Validar DNI único en modo crear
    if (this.mode === FormMode.Crear) {
      const dniEnUso = this.empleadosExistentes?.some(e => e.dni === this.empleado.dni);
      if (dniEnUso) {
        alert('El DNI ' + this.empleado.dni + ' ya está registrado en el sistema');
        return;
      }
    }

    const observable = this.mode === FormMode.Crear
      ? this.empleadoService.saveEmpleado(this.empleado)
      : this.empleadoService.updateEmpleado(this.empleado);

    observable.subscribe({
      next: () => {
        alert('Empleado guardado exitosamente');
        this.router.navigate(['/pages/empleados']);
      },
      error: (err) => {
        console.error('Error al guardar empleado', err);
        // Mostrar mensaje específico si es error de DNI duplicado
        if (err.error?.message?.includes('dni') || err.error?.message?.includes('Duplicate')) {
          alert('El DNI ingresado ya existe en el sistema. Use un DNI diferente.');
        } else {
          alert('No se pudo guardar la información: ' + (err.error?.message || err.message));
        }
      }
    });
  }

  cancelar() {
    this.router.navigate(['/pages/empleados']);
  }

  onVolver() {
    this.router.navigate(['/pages/empleados']);
  }

  getDepartamentoNombre(): string {
    if (this.empleado.departamento?.id) {
      const depto = this.departamentos.find(d => d.id === this.empleado.departamento?.id);
      return depto?.nombre || '';
    }
    return '';
  }

  private inicializarEmpleado(): EmpleadoModel {
    const hoy = new Date().toISOString().split('T')[0];
    return {
      id: 0, // 0 para nuevo empleado
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      fechaIngreso: hoy as any,
      dni: "",
      estado: "Activo",
      departamento: null,
      cargo: null
    };
  }
}