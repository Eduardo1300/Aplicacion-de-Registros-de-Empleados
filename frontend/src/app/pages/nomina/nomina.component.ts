import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nomina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nomina.component.html',
  styleUrl: './nomina.component.css'
})
export class NominaComponent implements OnInit {
  salarios: any[] = [];
  historialPagos: any[] = [];
  nuevoSalario: any = {
    montoBase: '',
    frecuenciaPago: 'MENSUAL',
    tipoSalario: 'MENSUAL'
  };
  mostrarFormulario = false;
  editandoId: number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.cargarSalarios();
    this.cargarHistorialPagos();
  }

  cargarSalarios(): void {
    this.salarios = [
      { id: 1, empleado: 'Juan Pérez', montoBase: 2500, frecuenciaPago: 'MENSUAL', estado: 'ACTIVO' },
      { id: 2, empleado: 'María García', montoBase: 3000, frecuenciaPago: 'MENSUAL', estado: 'ACTIVO' }
    ];
  }

  cargarHistorialPagos(): void {
    this.historialPagos = [
      { id: 1, empleado: 'Juan Pérez', periodo: 'Octubre 2024', montoNeto: 2400, estado: 'PAGADO' },
      { id: 2, empleado: 'María García', periodo: 'Octubre 2024', montoNeto: 2900, estado: 'PAGADO' }
    ];
  }

  guardarSalario(): void {
    if (!this.nuevoSalario.montoBase) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (this.editandoId) {
      const index = this.salarios.findIndex(s => s.id === this.editandoId);
      if (index !== -1) {
        this.salarios[index] = { ...this.nuevoSalario, id: this.editandoId };
      }
      this.editandoId = null;
    } else {
      this.salarios.push({ ...this.nuevoSalario, id: Date.now(), estado: 'ACTIVO' });
    }

    this.limpiarFormulario();
  }

  editarSalario(salario: any): void {
    this.nuevoSalario = { ...salario };
    this.editandoId = salario.id;
    this.mostrarFormulario = true;
  }

  eliminarSalario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este salario?')) {
      this.salarios = this.salarios.filter(s => s.id !== id);
    }
  }

  limpiarFormulario(): void {
    this.nuevoSalario = {
      montoBase: '',
      frecuenciaPago: 'MENSUAL',
      tipoSalario: 'MENSUAL'
    };
    this.mostrarFormulario = false;
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }
}
