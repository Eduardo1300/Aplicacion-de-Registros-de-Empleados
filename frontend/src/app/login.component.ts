import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Por favor, ingrese usuario y contraseña.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        setTimeout(() => {
          const rol = this.authService.getRolActual();
          console.log('Rol actual:', rol);
          if (rol === 'EMPLEADO') {
            this.router.navigate(['/pages/dashboard-empleado']);
          } else {
            this.router.navigate(['/pages/dashboard']);
          }
        }, 100);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = 'Usuario o contraseña incorrectos. Por favor, intente de nuevo.';
      }
    });
  }
}
