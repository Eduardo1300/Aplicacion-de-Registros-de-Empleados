export type Rol = 'admin' | 'empleado';

export interface Usuario {
  id: number;
  nombre: string;
  rol: Rol;
}

// Ejemplo de usuarios
export const USUARIOS: Usuario[] = [
  { id: 1, nombre: 'Administrador', rol: 'admin' },
  { id: 2, nombre: 'Empleado', rol: 'empleado' }
];
