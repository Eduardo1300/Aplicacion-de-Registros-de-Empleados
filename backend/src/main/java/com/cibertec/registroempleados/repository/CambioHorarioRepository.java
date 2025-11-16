package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.CambioHorario;

@Repository
public interface CambioHorarioRepository extends JpaRepository<CambioHorario, Long> {
    List<CambioHorario> findByEmpleadoId(Long empleadoId);
    List<CambioHorario> findByEstado(String estado);
    
    @Query("SELECT c FROM CambioHorario c WHERE c.empleado.id = :empId AND c.fechaSolicitud >= :inicio AND c.fechaSolicitud <= :fin")
    List<CambioHorario> findByEmpleadoAndPeriodo(@Param("empId") Long empleadoId, 
                                                   @Param("inicio") LocalDate inicio, 
                                                   @Param("fin") LocalDate fin);
}
