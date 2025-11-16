import { Pipe, PipeTransform } from '@angular/core';
import { Departamento } from './Departamento';

@Pipe({
  name: 'departmentFilter',
  standalone: true
})
export class DepartmentFilterPipe implements PipeTransform {
  transform(departamentos: Departamento[], filtro: string): Departamento[] {
    if (!departamentos) return [];
    if (!filtro || filtro.trim() === '') return departamentos;
    const lower = filtro.toLowerCase();
    return departamentos.filter(dep => dep.nombre?.toLowerCase().includes(lower));
  }
}
