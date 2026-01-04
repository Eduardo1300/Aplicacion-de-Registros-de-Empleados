export class LoginResponse {
  token: string;
  nombreUsuario: string;
  rol: string;
  empleadoNombre: string;
  empleadoId: number;
  permisos?: { resource: string; action: string }[];
}
