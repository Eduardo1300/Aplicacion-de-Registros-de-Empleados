import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente Dashboard', () => {
    expect(component).toBeTruthy();
  });

  it('debería definir el dataset de asistenciasPorMes', () => {
    expect(component.asistenciasPorMes).toBeDefined();
    expect(Array.isArray(component.asistenciasPorMes)).toBeTrue();
    expect(component.asistenciasPorMes.length).toBeGreaterThan(0);
  });

  it('debería definir el dataset de porcentajeAsistencia', () => {
    expect(component.porcentajeAsistencia).toBeDefined();
    expect(typeof component.porcentajeAsistencia).toBe('number');
  });

  it('debería renderizar los gráficos (canvas) en la plantilla', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#chartMes')).toBeTruthy();
    expect(compiled.querySelector('#chartTardanza')).toBeTruthy();
    expect(compiled.querySelector('#chartPorcentaje')).toBeTruthy();
  });
});
