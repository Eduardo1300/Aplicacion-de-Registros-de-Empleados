export class CreateEmpleadoDto {
  nombre: string;
  apellido: string;
  dni: string;
  correo?: string;
  telefono?: string;
  fechaIngreso: Date;
  estado?: string;
  departamentoId?: number;
  cargoId?: number;
  password?: string;
}
