import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Empleado } from '../entities/empleado.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { EmpleadoJwtStrategy } from './empleado-jwt.strategy';
import { PermissionModule } from '../modules/permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Empleado]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule.register({ defaultStrategy: 'empleado-jwt', property: 'empleado' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_y_larga_para_jwt_1234567890',
      signOptions: { expiresIn: '24h' },
    }),
    forwardRef(() => PermissionModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmpleadoJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
