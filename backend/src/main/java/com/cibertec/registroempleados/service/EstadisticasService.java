package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.dto.*;
import com.cibertec.registroempleados.model.Asistencia;
import com.cibertec.registroempleados.model.Justificacion;
import com.cibertec.registroempleados.repository.AsistenciaRepository;
import com.cibertec.registroempleados.repository.JustificacionRepository;
import com.cibertec.registroempleados.repository.EmpleadoRepository;
import com.cibertec.registroempleados.repository.DepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EstadisticasService {

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Autowired
    private JustificacionRepository justificacionRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private DepartamentoRepository departamentoRepository;

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * Obtiene estadísticas generales del día actual
     */
    @Cacheable(value = "estadisticas", key = "'hoy'")
    public EstadisticasDTO getEstadisticasHoy() {
        LocalDate hoy = LocalDate.now();
        List<Asistencia> asistenciasHoy = asistenciaRepository.findByFechaAsistencia(hoy);
        
        long totalEmpleados = empleadoRepository.count();
        long presentesHoy = asistenciasHoy.stream()
            .filter(a -> a.getEstado() == Asistencia.EstadoAsistencia.PRESENTE)
            .count();
        long retardosHoy = asistenciasHoy.size() - presentesHoy;
        long ausrentesHoy = totalEmpleados - presentesHoy - retardosHoy;
        
        double porcentajeAsistencia = totalEmpleados > 0 
            ? (presentesHoy * 100.0) / totalEmpleados 
            : 0;

        List<EstadisticasDTO.AsistenciaPorDepartamento> asistenciaPorDept = 
            getAsistenciaPorDepartamento(hoy, asistenciasHoy);

        return EstadisticasDTO.builder()
            .totalEmpleados(totalEmpleados)
            .presentesHoy(presentesHoy)
            .ausrentesHoy(ausrentesHoy)
            .retardosHoy(retardosHoy)
            .porcentajeAsistencia(porcentajeAsistencia)
            .asistenciaPorDepartamento(asistenciaPorDept)
            .build();
    }

    /**
     * Obtiene asistencia por departamento en una fecha específica
     */
    private List<EstadisticasDTO.AsistenciaPorDepartamento> getAsistenciaPorDepartamento(LocalDate fecha, List<Asistencia> asistencias) {
        return departamentoRepository.findAll().stream()
            .map(dept -> {
                List<Long> empleadosDelDept = empleadoRepository.findAll().stream()
                    .filter(e -> e.getDepartamento() != null && e.getDepartamento().getId().equals(dept.getId()))
                    .map(e -> e.getId())
                    .collect(Collectors.toList());
                
                long totalEmpleados = empleadosDelDept.size();
                
                long presentes = asistencias.stream()
                    .filter(a -> empleadosDelDept.contains(a.getEmpleado().getId()) &&
                            a.getEstado() == Asistencia.EstadoAsistencia.PRESENTE)
                    .count();
                
                long retardos = asistencias.size() - presentes;
                long ausentes = totalEmpleados - presentes - retardos;
                
                double porcentaje = totalEmpleados > 0 
                    ? (presentes * 100.0) / totalEmpleados 
                    : 0;

                return EstadisticasDTO.AsistenciaPorDepartamento.builder()
                    .departamento(dept.getNombre())
                    .totalEmpleados(totalEmpleados)
                    .presentes(presentes)
                    .ausentes(ausentes)
                    .retardos(retardos)
                    .porcentaje(porcentaje)
                    .build();
            })
            .collect(Collectors.toList());
    }

    /**
     * Obtiene tendencia de asistencia últimos 30 días
     */
    @Cacheable(value = "tendencias", key = "'30dias'")
    public List<EstadisticasDTO.TendenciaAsistencia> getTendenciaAsistencia30Dias() {
        List<EstadisticasDTO.TendenciaAsistencia> tendencias = new ArrayList<>();
        LocalDate hoy = LocalDate.now();
        long totalEmpleados = empleadoRepository.count();

        for (int i = 29; i >= 0; i--) {
            LocalDate fecha = hoy.minusDays(i);
            List<Asistencia> asistencias = asistenciaRepository.findByFechaAsistencia(fecha);
            
            long presentes = asistencias.stream()
                .filter(a -> a.getEstado() == Asistencia.EstadoAsistencia.PRESENTE)
                .count();
            long retardos = asistencias.size() - presentes;
            long ausentes = totalEmpleados - presentes - retardos;
            
            double porcentaje = totalEmpleados > 0 
                ? (presentes * 100.0) / totalEmpleados 
                : 0;

            tendencias.add(EstadisticasDTO.TendenciaAsistencia.builder()
                .fecha(fecha.format(dateFormatter))
                .presentes(presentes)
                .ausentes(ausentes)
                .retardos(retardos)
                .porcentaje(porcentaje)
                .build());
        }

        return tendencias;
    }

    /**
     * Obtiene horas de mayor afluencia (horarios pico)
     */
    @Cacheable(value = "horarios-pico", key = "'hoy'")
    public HorariosPicoDTO getHorariosPico() {
        LocalDate hoy = LocalDate.now();
        List<Asistencia> asistenciasHoy = asistenciaRepository.findByFechaAsistencia(hoy);

        Map<Integer, Long> registrosPorHora = new HashMap<>();
        for (int hora = 0; hora < 24; hora++) {
            registrosPorHora.put(hora, 0L);
        }

        // Contar registros por hora
        for (Asistencia asistencia : asistenciasHoy) {
            if (asistencia.getHoraEntrada() != null) {
                int hora = asistencia.getHoraEntrada().getHour();
                registrosPorHora.put(hora, registrosPorHora.get(hora) + 1);
            }
        }

        List<HorariosPicoDTO.HoraPico> horasPico = registrosPorHora.entrySet()
            .stream()
            .filter(e -> e.getValue() > 0)
            .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
            .limit(10)
            .map(e -> {
                double porcentaje = asistenciasHoy.size() > 0 
                    ? (e.getValue() * 100.0) / asistenciasHoy.size() 
                    : 0;
                    
                return HorariosPicoDTO.HoraPico.builder()
                    .hora(e.getKey())
                    .horaFormato(String.format("%02d:00", e.getKey()))
                    .cantidad(e.getValue())
                    .porcentaje(porcentaje)
                    .build();
            })
            .sorted(Comparator.comparingInt(HorariosPicoDTO.HoraPico::getHora))
            .collect(Collectors.toList());

        return HorariosPicoDTO.builder()
            .horasPico(horasPico)
            .registrosPorHora(registrosPorHora)
            .build();
    }

    /**
     * Obtiene distribución de empleados por departamento
     */
    @Cacheable(value = "distribucion-empleados")
    public Map<String, Long> getDistribucionEmpleados() {
        return empleadoRepository.findAll().stream()
            .filter(emp -> emp.getDepartamento() != null)
            .collect(Collectors.groupingBy(
                emp -> emp.getDepartamento().getNombre(),
                Collectors.counting()
            ));
    }

    /**
     * Obtiene justificaciones por tipo
     */
    @Cacheable(value = "justificaciones-tipo", key = "'hoy'")
    public Map<String, Long> getJustificacionesPorTipo() {
        LocalDate hoy = LocalDate.now();
        // Agrupamos por tipo de justificación
        return justificacionRepository.findAll().stream()
            .filter(j -> j.getFechaJustificacion() != null && j.getFechaJustificacion().equals(hoy))
            .collect(Collectors.groupingBy(
                Justificacion::getTipoJustificacion,
                Collectors.counting()
            ));
    }

    /**
     * Obtiene heatmap de asistencia mensual
     */
    public HeatmapAsistenciaDTO getHeatmapAsistencia(int año, int mes) {
        YearMonth yearMonth = YearMonth.of(año, mes);
        LocalDate primerDia = yearMonth.atDay(1);
        LocalDate ultimoDia = yearMonth.atEndOfMonth();

        List<HeatmapAsistenciaDTO.EmpleadoHeatmap> datos = empleadoRepository.findAll()
            .stream()
            .map(empleado -> {
                List<HeatmapAsistenciaDTO.DiaHeatmap> dias = new ArrayList<>();
                
                for (LocalDate fecha = primerDia; !fecha.isAfter(ultimoDia); fecha = fecha.plusDays(1)) {
                    // Buscar asistencias del empleado en esa fecha
                    List<Asistencia> asistencias = asistenciaRepository.findByFechaAsistencia(fecha)
                        .stream()
                        .filter(a -> a.getEmpleado().getId().equals(empleado.getId()))
                        .collect(Collectors.toList());
                    
                    String estado = asistencias.isEmpty() ? "AUSENTE" : asistencias.get(0).getEstado().toString();
                    
                    HeatmapAsistenciaDTO.DiaHeatmap dia = HeatmapAsistenciaDTO.DiaHeatmap.builder()
                        .dia(fecha.getDayOfMonth())
                        .estado(estado)
                        .horaEntrada(asistencias.isEmpty() ? null : 
                            (asistencias.get(0).getHoraEntrada() != null ? 
                            asistencias.get(0).getHoraEntrada().toString() : null))
                        .horaSalida(asistencias.isEmpty() ? null :
                            (asistencias.get(0).getHoraSalida() != null ?
                            asistencias.get(0).getHoraSalida().toString() : null))
                        .build();
                    
                    dias.add(dia);
                }

                return HeatmapAsistenciaDTO.EmpleadoHeatmap.builder()
                    .empleadoId(empleado.getId())
                    .empleadoNombre(empleado.getNombre() + " " + empleado.getApellido())
                    .departamento(empleado.getDepartamento() != null ? empleado.getDepartamento().getNombre() : "Sin departamento")
                    .dias(dias)
                    .build();
            })
            .collect(Collectors.toList());

        return HeatmapAsistenciaDTO.builder()
            .datos(datos)
            .build();
    }
}
