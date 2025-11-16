import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comunicacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comunicacion.component.html',
  styleUrl: './comunicacion.component.css'
})
export class ComunicacionComponent implements OnInit {
  notificaciones: any[] = [];
  anuncios: any[] = [];
  mensajes: any[] = [];
  activeTab = 'notificaciones';
  nuevoAnuncio: any = { titulo: '', contenido: '', categoria: 'EMPRESA' };
  mostrarFormulario = false;

  ngOnInit(): void {
    this.cargarNotificaciones();
    this.cargarAnuncios();
    this.cargarMensajes();
  }

  cargarNotificaciones(): void {
    this.notificaciones = [
      { id: 1, titulo: 'Aprobación de Licencia', mensaje: 'Tu solicitud de licencia ha sido aprobada', prioridad: 'ALTA', leida: false },
      { id: 2, titulo: 'Nuevo Anuncio', mensaje: 'Se ha publicado un anuncio importante', prioridad: 'NORMAL', leida: true }
    ];
  }

  cargarAnuncios(): void {
    this.anuncios = [
      { id: 1, titulo: 'Capacitación de Seguridad', contenido: 'Se llevará a cabo capacitación el próximo viernes', destacado: true },
      { id: 2, titulo: 'Horario de Oficina', contenido: 'Nuevo horario de oficina a partir de enero', destacado: false }
    ];
  }

  cargarMensajes(): void {
    this.mensajes = [
      { id: 1, remitente: 'Jefe de RRHH', asunto: 'Reunión de desempeño', leido: false },
      { id: 2, remitente: 'Compañero', asunto: 'Proyecto colaborativo', leido: true }
    ];
  }

  guardarAnuncio(): void {
    if (this.nuevoAnuncio.titulo && this.nuevoAnuncio.contenido) {
      this.anuncios.push({
        id: Date.now(),
        ...this.nuevoAnuncio,
        destacado: false
      });
      this.nuevoAnuncio = { titulo: '', contenido: '', categoria: 'EMPRESA' };
      this.mostrarFormulario = false;
    }
  }

  marcarLeida(id: number): void {
    const notif = this.notificaciones.find(n => n.id === id);
    if (notif) notif.leida = true;
  }

  deleteAnuncio(id: number): void {
    this.anuncios = this.anuncios.filter(a => a.id !== id);
  }

  selectTab(tab: string): void {
    this.activeTab = tab;
  }
}
