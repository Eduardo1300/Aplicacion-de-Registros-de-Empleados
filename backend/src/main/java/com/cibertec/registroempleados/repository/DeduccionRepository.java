package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Deduccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DeduccionRepository extends JpaRepository<Deduccion, Long> {
    @Query("SELECT d FROM Deduccion d WHERE d.empleado.id = :empleadoId AND d.estado = 'ACTIVA'")
    List<Deduccion> findDeduccionesActivas(@Param("empleadoId") Long empleadoId);

    @Query("SELECT d FROM Deduccion d WHERE d.empleado.id = :empleadoId ORDER BY d.fechaDeduccion DESC")
    List<Deduccion> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT d FROM Deduccion d WHERE d.tipoDeduccion = :tipo AND d.estado = 'ACTIVA'")
    List<Deduccion> findByTipo(@Param("tipo") String tipo);

    @Query("SELECT d FROM Deduccion d WHERE d.periodo = :periodo ORDER BY d.fechaDeduccion DESC")
    List<Deduccion> findByPeriodo(@Param("periodo") String periodo);
}
