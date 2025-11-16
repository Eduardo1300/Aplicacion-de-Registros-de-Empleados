import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el formulario', () => {
    expect(component).toBeTruthy();
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  it('debería validar que los campos sean obligatorios', () => {
    component.username = '';
    component.password = '';
    component.login();
    expect(component.error).toBe('Por favor, ingrese usuario y contraseña.');
  });

  it('debería llamar a AuthService.login al enviar el formulario', () => {
    component.username = 'admin';
    component.password = 'admin123';
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));
    component.login();
    expect(authServiceSpy.login).toHaveBeenCalledWith('admin', 'admin123');
  });

  it('debería mostrar mensaje de error si las credenciales son inválidas', () => {
    component.username = 'Invalido';
    component.password = 'wrongpass';
    authServiceSpy.login.and.returnValue(throwError(() => ({ status: 403 })));
    component.login();
    expect(component.error).toBe('Usuario o contraseña incorrectos. Por favor, intente de nuevo.');
  });
});
