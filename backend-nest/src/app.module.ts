import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { EmpleadoModule } from './modules/empleado/empleado.module';
import { AsistenciaModule } from './modules/asistencia/asistencia.module';
import { DepartamentoModule } from './modules/departamento/departamento.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { LicenciaModule } from './modules/licencia/licencia.module';
import { PermissionModule } from './modules/permission/permission.module';
import * as entities from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'bd_registro_empleados',
      entities: [
        entities.Departamento,
        entities.Cargo,
        entities.Rol,
        entities.Usuario,
        entities.Empleado,
        entities.Asistencia,
        entities.TipoLicencia,
        entities.SolicitudLicencia,
        entities.SaldoLicencia,
        entities.Permission,
        entities.RolePermission,
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    EmpleadoModule,
    AsistenciaModule,
    DepartamentoModule,
    CargoModule,
    LicenciaModule,
    PermissionModule,
  ],
})
export class AppModule {}
