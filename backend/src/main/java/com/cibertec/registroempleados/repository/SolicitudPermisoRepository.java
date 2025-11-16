package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.SolicitudPermiso;

@Repository
public interface SolicitudPermisoRepository extends JpaRepository<SolicitudPermiso, Long> {
    List<SolicitudPermiso> findByEmpleadoId(Long empleadoId);
    List<SolicitudPermiso> findByEstado(String estado);
    
    @Query("SELECT s FROM SolicitudPermiso s WHERE s.empleado.id = :empId AND s.fecha >= :inicio AND s.fecha <= :fin")
    List<SolicitudPermiso> findByEmpleadoAndPeriodo(@Param("empId") Long empleadoId, 
                                                     @Param("inicio") LocalDate inicio, 
                                                     @Param("fin") LocalDate fin);
    
    @Query("SELECT s FROM SolicitudPermiso s WHERE s.estado = 'PENDIENTE' ORDER BY s.fechaSolicitud ASC")
    List<SolicitudPermiso> findPendientes();
}
