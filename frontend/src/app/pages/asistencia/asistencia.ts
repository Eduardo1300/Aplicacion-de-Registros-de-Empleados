import { Empleado } from "../empleado/empleado";

export interface Asistencia{
    id: number,
    fecha: Date,
    horaEntrada: string,
    horaSalida: string,
    empleado: Empleado,
    estadoAsist?: string
}