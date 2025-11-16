package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.AsignacionHorario;

@Repository
public interface AsignacionHorarioRepository extends JpaRepository<AsignacionHorario, Long> {
    List<AsignacionHorario> findByEmpleadoId(Long empleadoId);
    
    @Query("SELECT a FROM AsignacionHorario a WHERE a.empleado.id = :empId AND a.estado = 'ACTIVO'")
    Optional<AsignacionHorario> findAsignacionActivaByEmpleado(@Param("empId") Long empleadoId);
    
    @Query("SELECT a FROM AsignacionHorario a WHERE a.fechaInicio <= :fecha AND (a.fechaFin IS NULL OR a.fechaFin >= :fecha) AND a.estado = 'ACTIVO'")
    List<AsignacionHorario> findAsignacionesActivasByFecha(@Param("fecha") LocalDate fecha);
}
