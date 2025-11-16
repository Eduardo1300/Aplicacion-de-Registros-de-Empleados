package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.HistoricoEmpleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface HistoricoEmpleadoRepository extends JpaRepository<HistoricoEmpleado, Long> {
    @Query("SELECT h FROM HistoricoEmpleado h WHERE h.empleado.id = :empleadoId ORDER BY h.fechaCambioEfectivo DESC")
    List<HistoricoEmpleado> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT h FROM HistoricoEmpleado h WHERE h.tipoCambio = :tipo ORDER BY h.fechaCambioEfectivo DESC")
    List<HistoricoEmpleado> findByTipoCambio(@Param("tipo") String tipo);

    @Query("SELECT h FROM HistoricoEmpleado h WHERE h.aprobado = false")
    List<HistoricoEmpleado> findPendientesAprobacion();

    @Query("SELECT h FROM HistoricoEmpleado h WHERE h.empleado.id = :empleadoId AND h.tipoCambio IN ('SALARIO', 'POSICION', 'DEPARTAMENTO') ORDER BY h.fechaCambioEfectivo DESC")
    List<HistoricoEmpleado> findCambiosImportantes(@Param("empleadoId") Long empleadoId);
}
