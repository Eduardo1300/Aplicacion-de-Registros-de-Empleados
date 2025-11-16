import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../Model/UsuarioModel';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  
  isSidebarToggled = false;
  usuario: { nombre: string } | null = null;
  rol: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuarioActual();
    this.rol = this.authService.getRolActual();
    // Debug: log JWT payload and role
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        console.log('JWT payload:', decoded);
        console.log('Rol detectado:', this.rol);
      } catch (e) {
        console.error('Error decodificando JWT:', e);
      }
    }
  }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
  }

  logout(event: MouseEvent): void {
    event.preventDefault(); // Prevenir la navegación por defecto del enlace
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}