import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../entities/usuario.entity';
import { LoginDto } from '../dto/login.dto';
import { LoginResponse } from '../dto/login-response.dto';
import { PermissionService } from '../modules/permission/permission.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
    private permissionService: PermissionService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const usuario = await this.usuarioRepository.findOne({
      where: { nombreUsuario: loginDto.nombreUsuario },
      relations: ['rol', 'empleado', 'rol.permissions', 'rol.permissions.permission'],
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const passwordMatches = await bcrypt.compare(loginDto.clave, usuario.clave);
    if (!passwordMatches) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.jwtService.sign({
      sub: usuario.id,
      username: usuario.nombreUsuario,
      role: usuario.rol.nombre,
    });

    // Obtener permisos del usuario basado en su rol
    const permisos = usuario.rol.permissions.map((rp) => ({
      resource: rp.permission.resource,
      action: rp.permission.action,
    }));

    const response: LoginResponse = {
      token,
      nombreUsuario: usuario.nombreUsuario,
      rol: usuario.rol.nombre,
      empleadoNombre: usuario.empleado 
        ? `${usuario.empleado.nombre} ${usuario.empleado.apellido}`
        : 'Admin',
      empleadoId: usuario.empleado?.id ?? null,
      permisos,
    };

    return response;
  }

  async register(nombreUsuario: string, clave: string, rolId: number) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(clave, salt);

    const usuario = this.usuarioRepository.create({
      nombreUsuario,
      clave: hashedPassword,
      rol: { id: rolId },
    });

    return this.usuarioRepository.save(usuario);
  }

  async validateUser(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol', 'empleado', 'rol.permissions', 'rol.permissions.permission'],
    });
  }
}
