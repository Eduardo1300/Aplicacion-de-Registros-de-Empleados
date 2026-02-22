import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from '../entities/usuario.entity';
import { Empleado } from '../entities/empleado.entity';
import { LoginDto } from '../dto/login.dto';
import { LoginEmpleadoDto } from '../dto/login-empleado.dto';
import { LoginResponse } from '../dto/login-response.dto';
import { PermissionService } from '../modules/permission/permission.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
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

  async loginEmpleado(loginEmpleadoDto: LoginEmpleadoDto) {
    const empleado = await this.empleadoRepository.findOne({
      where: { dni: loginEmpleadoDto.dni },
      relations: ['cargo', 'departamento'],
    });

    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }

    if (empleado.estado !== 'Activo') {
      throw new Error('Empleado inactivo');
    }

    if (!empleado.password_hash) {
      throw new Error('Empleado sin contraseña configurada');
    }

    const passwordMatches = await bcrypt.compare(loginEmpleadoDto.password, empleado.password_hash);
    if (!passwordMatches) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.jwtService.sign({
      sub: empleado.id,
      dni: empleado.dni,
      role: 'empleado',
    });

    return {
      token,
      empleado: {
        id: empleado.id,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        dni: empleado.dni,
        correo: empleado.correo,
        telefono: empleado.telefono,
        cargo: empleado.cargo,
        departamento: empleado.departamento,
        fecha_ingreso: empleado.fechaIngreso,
        estado: empleado.estado,
        dias_vacaciones: empleado.dias_vacaciones,
        dias_vacaciones_usados: empleado.dias_vacaciones_usados,
      },
    };
  }

  async getEmpleadoPerfil(empleadoId: number) {
    const empleado = await this.empleadoRepository.findOne({
      where: { id: empleadoId },
      relations: ['cargo', 'departamento'],
    });

    if (!empleado) {
      throw new BadRequestException('Empleado no encontrado');
    }

    return {
      id: empleado.id,
      nombre: empleado.nombre,
      apellido: empleado.apellido,
      dni: empleado.dni,
      correo: empleado.correo,
      telefono: empleado.telefono,
      cargo: empleado.cargo,
      departamento: empleado.departamento,
      fecha_ingreso: empleado.fechaIngreso,
      estado: empleado.estado,
      dias_vacaciones: empleado.dias_vacaciones,
      dias_vacaciones_usados: empleado.dias_vacaciones_usados,
    };
  }

  async updateEmpleadoPerfil(empleadoId: number, data: { correo?: string; telefono?: string }) {
    const empleado = await this.empleadoRepository.findOne({
      where: { id: empleadoId },
    });

    if (!empleado) {
      throw new BadRequestException('Empleado no encontrado');
    }

    if (data.correo) empleado.correo = data.correo;
    if (data.telefono) empleado.telefono = data.telefono;

    await this.empleadoRepository.save(empleado);

    return { message: 'Perfil actualizado correctamente' };
  }

  async cambiarPassword(empleadoId: number, passwordActual: string, passwordNueva: string) {
    const empleado = await this.empleadoRepository.findOne({
      where: { id: empleadoId },
    });

    if (!empleado) {
      throw new BadRequestException('Empleado no encontrado');
    }

    if (empleado.password_hash) {
      const passwordMatches = await bcrypt.compare(passwordActual, empleado.password_hash);
      if (!passwordMatches) {
        throw new BadRequestException('Contraseña actual incorrecta');
      }
    }

    const salt = await bcrypt.genSalt();
    empleado.password_hash = await bcrypt.hash(passwordNueva, salt);

    await this.empleadoRepository.save(empleado);

    return { message: 'Contraseña cambiada correctamente' };
  }

  async validateUser(id: number): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol', 'empleado', 'rol.permissions', 'rol.permissions.permission'],
    });
  }
}
