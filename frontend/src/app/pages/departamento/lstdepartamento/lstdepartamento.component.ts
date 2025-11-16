import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LstdepartamentoService } from '../lstdepartamento.service';
import { Departamento } from '../Departamento';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DepartmentFilterPipe } from '../department-filter.pipe';


@Component({
  selector: 'app-lstdepartamento',
  standalone: true,
  imports: [FormsModule, CommonModule, DepartmentFilterPipe],
  templateUrl: './lstdepartamento.component.html',
  styleUrls: ['./lstdepartamento.component.css']
})
export class LstdepartamentoComponent implements OnInit {
  departamentos: Departamento[] = [];
  filtroNombre: string = '';

  constructor(
    private departamentoService: LstdepartamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (res) => {
        this.departamentos = res;
      },
      error: (err) => {
        console.error('Error cargando departamentos', err);
      }
    });
  }

  onNavigateCrearDepartamento(): void {
    // Navega a la vista de crear departamento (puedes crear la ruta si lo deseas)
    this.router.navigate(['/pages/departamentos/crear']);
  }

  onNavigateEditDepartamento(id: number): void {
    this.router.navigate(['/pages/departamentos/ver', id]);
  }

  onDeleteDepartamento(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este departamento?')) {
      this.departamentoService.deleteDepartamento(id).subscribe({
        next: () => {
          this.cargarDepartamentos();
        },
        error: (err) => {
          alert('Error al eliminar departamento');
          console.error(err);
        }
      });
    }
  }
}
