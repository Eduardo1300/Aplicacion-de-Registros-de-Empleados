import { Controller, Post, Body, HttpCode, HttpStatus, Get, Put, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { LoginEmpleadoDto } from '../dto/login-empleado.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { EmpleadoJwtAuthGuard } from './empleado-jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from '../entities/empleado.entity';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { nombreUsuario: string; clave: string }) {
    const { nombreUsuario, clave } = body;
    
    if (!nombreUsuario || !clave) {
      throw new UnauthorizedException('Credenciales requeridas');
    }

    if (/^\d{8}$/.test(nombreUsuario)) {
      return await this.authService.loginEmpleado({ dni: nombreUsuario, password: clave });
    }
    
    return await this.authService.login({ nombreUsuario, clave });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: { nombreUsuario: string; clave: string; rolId: number }) {
    return this.authService.register(body.nombreUsuario, body.clave, body.rolId);
  }

  @Post('login-empleado')
  @HttpCode(HttpStatus.OK)
  async loginEmpleado(@Body() loginEmpleadoDto: LoginEmpleadoDto) {
    return this.authService.loginEmpleado(loginEmpleadoDto);
  }

  @Get('perfil')
  @UseGuards(EmpleadoJwtAuthGuard)
  async getPerfil(@Request() req) {
    const empleadoId = req.user.id || req.user.sub;
    return this.authService.getEmpleadoPerfil(empleadoId);
  }

  @Put('perfil')
  @UseGuards(EmpleadoJwtAuthGuard)
  async updatePerfil(@Request() req, @Body() body: { correo?: string; telefono?: string }) {
    const empleadoId = req.user.id || req.user.sub;
    return this.authService.updateEmpleadoPerfil(empleadoId, body);
  }

  @Put('cambiar-password')
  @UseGuards(EmpleadoJwtAuthGuard)
  async cambiarPassword(@Request() req, @Body() body: { password_actual: string; password_nueva: string }) {
    const empleadoId = req.user.id || req.user.sub;
    return this.authService.cambiarPassword(empleadoId, body.password_actual, body.password_nueva);
  }

  @Get('vacaciones/saldo')
  @UseGuards(EmpleadoJwtAuthGuard)
  async getSaldoVacaciones(@Request() req) {
    const empleadoId = req.user.id || req.user.sub;
    const empleado = await this.empleadoRepository.findOne({
      where: { id: empleadoId },
    });

    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }

    return {
      disponibles: empleado.dias_vacaciones - empleado.dias_vacaciones_usados,
      total: empleado.dias_vacaciones,
      usados: empleado.dias_vacaciones_usados,
    };
  }
}
