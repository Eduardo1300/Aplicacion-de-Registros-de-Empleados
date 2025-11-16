import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LstdepartamentoService } from '../lstdepartamento.service';
import { Departamento } from '../Departamento';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-departamento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-departamento.component.html',
  styleUrls: []
})
export class AgregarDepartamentoComponent {
  departamento: Partial<Departamento> = { nombre: '', descripcion: '' };
  loading = false;
  error: string | null = null;

  constructor(
    private departamentoService: LstdepartamentoService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = null;
    this.departamentoService.agregarDepartamento(this.departamento).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/pages/departamentos']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error al agregar departamento';
        console.error(err);
      }
    });
  }

  onVolver(): void {
    this.router.navigate(['/pages/departamentos']);
  }
}
