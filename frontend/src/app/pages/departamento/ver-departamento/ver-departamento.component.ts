import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LstdepartamentoService } from '../lstdepartamento.service';

@Component({
  selector: 'app-ver-departamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-departamento.component.html',
  styleUrls: ['./ver-departamento.component.css']
})
export class VerDepartamentoComponent implements OnInit {
  departamento: any = null;
  cargando = true;
  error: string | null = null;
  editMode = false;
  guardando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: LstdepartamentoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID del departamento desde ruta:', id);
      
      if (id) {
        this.cargarDepartamento(+id);
      } else {
        this.error = 'No se especificó un ID de departamento';
        this.cargando = false;
      }
    });
  }

  cargarDepartamento(id: number): void {
    this.cargando = true;
    this.error = null;
    
    console.log('Cargando departamento con ID:', id);
    
    this.departamentoService.getDepartamentoById(id).subscribe({
      next: (response: any) => {
        console.log('Departamento cargado exitosamente:', response);
        this.departamento = response;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar el departamento:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        
        this.error = `Error al cargar el departamento: ${err.status} - ${err.message}`;
        this.departamento = null;
        this.cargando = false;
      }
    });
  }

  activarEdicion(): void {
    this.editMode = true;
  }

  guardarCambios(): void {
    if (!this.departamento || !this.departamento.nombre) {
      alert('El nombre del departamento es requerido');
      return;
    }

    this.guardando = true;
    this.error = null;

    this.departamentoService.actualizarDepartamento(this.departamento.id, this.departamento).subscribe({
      next: () => {
        this.guardando = false;
        this.editMode = false;
        alert('Departamento actualizado exitosamente');
      },
      error: (err: any) => {
        this.guardando = false;
        this.error = 'Error al actualizar el departamento';
        console.error(err);
      }
    });
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.cargarDepartamento(this.departamento.id);
  }

  onVolver(): void {
    this.router.navigate(['/pages/departamentos']);
  }
}