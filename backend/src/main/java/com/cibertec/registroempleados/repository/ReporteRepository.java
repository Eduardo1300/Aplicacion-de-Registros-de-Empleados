package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.Reporte;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    List<Reporte> findByTipoReporte(Reporte.TipoReporte tipo);
    List<Reporte> findByEstado(Reporte.EstadoReporte estado);
    
    @Query("SELECT r FROM Reporte r WHERE r.departamento.id = :depId AND r.fechaInicio >= :inicio AND r.fechaFin <= :fin")
    List<Reporte> findByDepartamentoAndFecha(@Param("depId") Long departamentoId, 
                                              @Param("inicio") LocalDate inicio, 
                                              @Param("fin") LocalDate fin);
}
