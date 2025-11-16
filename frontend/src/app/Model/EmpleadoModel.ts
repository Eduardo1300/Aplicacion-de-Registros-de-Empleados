import { Departamento } from "../pages/departamento/Departamento";

export interface EmpleadoModel {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  fechaIngreso: Date;
  dni: string;
  estado?: string;
  cargo?: { id: number; nombre: string } | null;
  departamento: {
    id: number;
    nombre: string;
  } | null;
}