import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaserviceService } from '../asistenciaservice.service';
import { AuthService } from '../../../services/auth.service';
import { AsistenciaModel } from '../../../Model/AsistenciaModel';

@Component({
  selector: 'app-check-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-asistencia.component.html',
  styleUrls: ['./check-asistencia.component.css']
})
export class CheckAsistenciaComponent implements OnInit {
  
  // Estado de la asistencia
  asistenciaHoy: any = null;
  registroHoy: any = null;
  
  // Información del empleado
  empleadoId: number | null = null;
  empleadoNombre: string = '';
  
  // Timestamps
  horaActual: string = '';
  fechaActual: string = '';
  
  // Estados
  yaMarcoEntrada: boolean = false;
  yaMarcoSalida: boolean = false;
  tiempoTranscurrido: string = '';
  
  // Mensaje feedback
  mensajeExito: string = '';
  mensajeError: string = '';
  mostrarMensaje: boolean = false;

  constructor(
    private asistenciaService: AsistenciaserviceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerEmpleadoDelAuthService();
    this.obtenerAsistenciaHoy();
    this.actualizarHoraActual();
    
    // Actualizar hora cada segundo
    setInterval(() => {
      this.actualizarHoraActual();
      // Actualizar tiempo transcurrido si hay entrada pero no salida
      if (this.yaMarcoEntrada && !this.yaMarcoSalida) {
        this.calcularTiempoTranscurrido();
      }
    }, 1000);
  }

  /**
   * Obtiene el ID y nombre del empleado usando AuthService
   */
  obtenerEmpleadoDelAuthService(): void {
    this.empleadoId = this.authService.getEmpleadoIdActual();
    
    if (!this.empleadoId) {
      console.error('No se pudo obtener el ID del empleado');
      this.empleadoNombre = 'Empleado';
      return;
    }

    // Obtener el nombre del token si está disponible
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        if (decoded.empleadoNombre) {
          this.empleadoNombre = decoded.empleadoNombre;
        }
      } catch (error) {
        console.error('Error decodificando token:', error);
        this.empleadoNombre = 'Empleado';
      }
    }
    
    console.log('Empleado cargado - ID:', this.empleadoId, 'Nombre:', this.empleadoNombre);
  }

  /**
   * Obtiene la asistencia del día actual
   */
  obtenerAsistenciaHoy(): void {
    if (!this.empleadoId) {
      console.error('No hay empleadoId disponible');
      return;
    }

    this.asistenciaService.getAsistenciaHoy().subscribe({
      next: (asistencias: any[]) => {
        // Buscar la asistencia de hoy para este empleado
        const hoy = new Date().toISOString().split('T')[0];
        this.registroHoy = asistencias.find((a: any) => {
          // Comparar con el ID del empleado (puede ser objeto o número)
          const empleadoId = typeof a.empleado === 'object' ? a.empleado?.id : a.empleado_id;
          const fechaAsistencia = new Date(a.fecha).toISOString().split('T')[0];
          console.log(`Comparando - EmpleadoId: ${empleadoId} vs ${this.empleadoId}, Fecha: ${fechaAsistencia} vs ${hoy}`);
          return empleadoId === this.empleadoId && fechaAsistencia === hoy;
        });
        
        if (this.registroHoy) {
          this.yaMarcoEntrada = true;
          if (this.registroHoy.horaSalida || this.registroHoy.hora_salida) {
            this.yaMarcoSalida = true;
          }
          this.calcularTiempoTranscurrido();
        }
        
        console.log('Registro de hoy:', this.registroHoy);
      },
      error: (err: any) => {
        console.error('Error obteniendo asistencias:', err);
        this.mostrarMensajeError('Error al cargar los registros de asistencia');
      }
    });
  }

  /**
   * Marca la entrada del empleado
   */
  marcarEntrada(): void {
    if (!this.empleadoId) {
      this.mostrarMensajeError('Error: No se pudo obtener tu ID de empleado');
      return;
    }

    if (this.yaMarcoEntrada) {
      this.mostrarMensajeError('Ya marcaste entrada hoy');
      return;
    }

    const hoy = new Date();
    
    // Formatear la hora en formato HH:mm:ss
    const horaFormato = hoy.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const asistencia: any = {
      empleado: { id: this.empleadoId },  // Enviar objeto con ID del empleado
      fecha: hoy.toISOString().split('T')[0],
      horaEntrada: horaFormato,
      estadoAsist: 'Asistio'  // Usar camelCase según el modelo backend
    };

    console.log('Enviando asistencia:', asistencia);

    this.asistenciaService.saveAsistencia(asistencia).subscribe({
      next: (response: any) => {
        console.log('Entrada registrada:', response);
        console.log('Respuesta del servidor - ID:', response.id);
        console.log('Respuesta completa:', JSON.stringify(response));
        
        // Asegurar que se asigne inmediatamente con todos los campos
        this.registroHoy = response;
        this.yaMarcoEntrada = true;
        
        // Verificar que el registro tiene ID
        if (!this.registroHoy.id) {
          console.error('ERROR: El registro no tiene ID:', this.registroHoy);
          this.mostrarMensajeError('Error: No se pudo guardar el registro correctamente');
          return;
        }
        
        console.log('registroHoy asignado con ID:', this.registroHoy.id);
        this.mostrarMensajeExito('✓ Entrada registrada correctamente');
      },
      error: (err: any) => {
        console.error('Error registrando entrada:', err);
        this.mostrarMensajeError('Error al registrar entrada. Intenta de nuevo.');
      }
    });
  }

  /**
   * Marca la salida del empleado
   */
  marcarSalida(): void {
    console.log('marcarSalida - yaMarcoEntrada:', this.yaMarcoEntrada);
    console.log('marcarSalida - yaMarcoSalida:', this.yaMarcoSalida);
    console.log('marcarSalida - registroHoy:', this.registroHoy);
    
    if (!this.yaMarcoEntrada) {
      this.mostrarMensajeError('Primero debes marcar entrada');
      return;
    }

    if (this.yaMarcoSalida) {
      this.mostrarMensajeError('Ya marcaste salida hoy');
      return;
    }

    if (!this.registroHoy) {
      console.error('ERROR: registroHoy es null/undefined');
      this.mostrarMensajeError('Error: No se encontró el registro de entrada');
      return;
    }

    if (!this.registroHoy.id) {
      console.error('ERROR: registroHoy.id es null/undefined. registroHoy:', this.registroHoy);
      this.mostrarMensajeError('Error: No se encontró el ID del registro de entrada');
      return;
    }

    console.log('Marcando salida - ID del registro:', this.registroHoy.id);

    // Actualizar la salida usando PATCH
    this.asistenciaService.updateAsistencia(this.registroHoy.id).subscribe({
      next: (response: any) => {
        console.log('Salida registrada:', response);
        this.registroHoy = response;
        this.yaMarcoSalida = true;
        this.calcularTiempoTranscurrido();
        this.mostrarMensajeExito('✓ Salida registrada correctamente');
      },
      error: (err: any) => {
        console.error('Error registrando salida:', err);
        this.mostrarMensajeError('Error al registrar salida. Intenta de nuevo.');
      }
    });
  }

  /**
   * Actualiza la hora y fecha actual
   */
  private actualizarHoraActual(): void {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    this.fechaActual = ahora.toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  /**
   * Calcula el tiempo transcurrido entre entrada y salida
   */
  private calcularTiempoTranscurrido(): void {
    if (!this.registroHoy) {
      return;
    }

    try {
      // Usar propiedades camelCase (backend las devuelve así después de guardar)
      const horaEntrada = this.registroHoy.horaEntrada || this.registroHoy.hora_entrada;
      const horaSalida = this.registroHoy.horaSalida || this.registroHoy.hora_salida;

      if (!horaEntrada) {
        return;
      }

      if (!horaSalida) {
        // Calcular tiempo desde entrada hasta ahora
        const ahora = new Date();
        const entrada = this.parsearHora(horaEntrada);
        const diff = ahora.getTime() - entrada.getTime();
        this.tiempoTranscurrido = this.formatearDiferencia(diff);
      } else {
        // Calcular tiempo entre entrada y salida
        const entrada = this.parsearHora(horaEntrada);
        const salida = this.parsearHora(horaSalida);
        const diff = salida.getTime() - entrada.getTime();
        this.tiempoTranscurrido = this.formatearDiferencia(diff);
      }
    } catch (error) {
      console.error('Error calculando tiempo:', error);
      this.tiempoTranscurrido = '00:00:00';
    }
  }

  /**
   * Parsea una hora en formato HH:MM:SS a Date
   */
  private parsearHora(horaStr: string): Date {
    const hoy = new Date();
    
    // Manejar diferentes formatos de entrada
    let horas = 0, minutos = 0, segundos = 0;
    
    if (typeof horaStr === 'string') {
      const partes = horaStr.split(':');
      horas = parseInt(partes[0], 10) || 0;
      minutos = parseInt(partes[1], 10) || 0;
      segundos = parseInt(partes[2], 10) || 0;
    }
    
    hoy.setHours(horas, minutos, segundos);
    return hoy;
  }

  /**
   * Formatea la diferencia de milisegundos a HH:MM:SS
   */
  private formatearDiferencia(ms: number): string {
    const totalSegundos = Math.floor(ms / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  /**
   * Muestra mensaje de éxito
   */
  private mostrarMensajeExito(mensaje: string): void {
    this.mensajeExito = mensaje;
    this.mensajeError = '';
    this.mostrarMensaje = true;
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 5000);
  }

  /**
   * Muestra mensaje de error
   */
  private mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    this.mensajeExito = '';
    this.mostrarMensaje = true;
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 5000);
  }

  /**
   * Obtiene la clase CSS para el estado de entrada
   */
  getClaseEntrada(): string {
    return this.yaMarcoEntrada ? 'estado-marcado' : 'estado-pendiente';
  }

  /**
   * Obtiene la clase CSS para el estado de salida
   */
  getClaseSalida(): string {
    return this.yaMarcoSalida ? 'estado-marcado' : this.yaMarcoEntrada ? 'estado-disponible' : 'estado-pendiente';
  }
}
