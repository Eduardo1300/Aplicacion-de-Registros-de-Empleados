import { Empleado } from "../pages/empleado/empleado";

export interface AsistenciaModel{
    id?: number;
    fecha?: Date | string;
    horaEntrada?: string;
    horaSalida?: string;
    estadoAsist?: string;
    empleado?: Empleado;
    horasDeuda?: number;
}