package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.SolicitudLicencia;

@Repository
public interface SolicitudLicenciaRepository extends JpaRepository<SolicitudLicencia, Long> {
    List<SolicitudLicencia> findByEmpleadoId(Long empleadoId);
    List<SolicitudLicencia> findByEstado(String estado);
    
    @Query("SELECT s FROM SolicitudLicencia s WHERE s.empleado.id = :empId AND s.fechaInicio >= :inicio AND s.fechaFin <= :fin")
    List<SolicitudLicencia> findByEmpleadoAndPeriodo(@Param("empId") Long empleadoId, 
                                                      @Param("inicio") LocalDate inicio, 
                                                      @Param("fin") LocalDate fin);
    
    @Query("SELECT s FROM SolicitudLicencia s WHERE s.estado = 'PENDIENTE' ORDER BY s.fechaSolicitud ASC")
    List<SolicitudLicencia> findPendientes();
    
    @Query("SELECT COUNT(s) FROM SolicitudLicencia s WHERE s.empleado.id = :empId AND s.tipoLicencia.id = :tipoId AND s.estado = 'APROBADA' AND YEAR(s.fechaInicio) = :anio")
    Integer countDiasUsados(@Param("empId") Long empleadoId, @Param("tipoId") Long tipoLicenciaId, @Param("anio") Integer anio);
}
