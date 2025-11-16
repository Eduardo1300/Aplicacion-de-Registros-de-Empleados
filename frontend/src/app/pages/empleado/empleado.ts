import { Departamento } from "../departamento/Departamento";

export interface Empleado{
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    fechaIngreso: Date;
    dni: string;
    estado?: string;
    departamento: { id: number; nombre: string } | null;
    cargo?: { id: number; nombre: string } | null;
}
