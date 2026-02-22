import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoLicencia, SolicitudLicencia, SaldoLicencia } from '../../entities';
import { TipoLicenciaService } from './tipo-licencia.service';
import { TipoLicenciaController } from './tipo-licencia.controller';
import { SolicitudLicenciaService } from './solicitud-licencia.service';
import { SaldoLicenciaService } from './saldo-licencia.service';
import { SolicitudLicenciaController } from './solicitud-licencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TipoLicencia, SolicitudLicencia, SaldoLicencia])],
  controllers: [SolicitudLicenciaController, TipoLicenciaController],
  providers: [TipoLicenciaService, SolicitudLicenciaService, SaldoLicenciaService],
  exports: [TipoLicenciaService, SolicitudLicenciaService, SaldoLicenciaService],
})
export class LicenciaModule {}
