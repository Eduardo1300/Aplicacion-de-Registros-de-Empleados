package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Bonificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BonificacionRepository extends JpaRepository<Bonificacion, Long> {
    @Query("SELECT b FROM Bonificacion b WHERE b.empleado.id = :empleadoId ORDER BY b.fechaOtorgamiento DESC")
    List<Bonificacion> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT b FROM Bonificacion b WHERE b.estado = 'PENDIENTE'")
    List<Bonificacion> findPendientes();

    @Query("SELECT b FROM Bonificacion b WHERE b.empleado.id = :empleadoId AND b.periodo = :periodo")
    List<Bonificacion> findByEmpleadoAndPeriodo(@Param("empleadoId") Long empleadoId, @Param("periodo") String periodo);

    @Query("SELECT b FROM Bonificacion b WHERE b.estado = 'APROBADA' AND b.periodo = :periodo")
    List<Bonificacion> findAprobadasByPeriodo(@Param("periodo") String periodo);
}
