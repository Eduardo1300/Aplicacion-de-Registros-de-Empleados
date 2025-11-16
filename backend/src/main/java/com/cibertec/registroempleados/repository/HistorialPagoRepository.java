package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.HistorialPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface HistorialPagoRepository extends JpaRepository<HistorialPago, Long> {
    @Query("SELECT hp FROM HistorialPago hp WHERE hp.empleado.id = :empleadoId ORDER BY hp.fechaPago DESC")
    List<HistorialPago> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT hp FROM HistorialPago hp WHERE hp.periodoPago = :periodo ORDER BY hp.fechaPago DESC")
    List<HistorialPago> findByPeriodo(@Param("periodo") String periodo);

    @Query("SELECT hp FROM HistorialPago hp WHERE hp.empleado.id = :empleadoId AND hp.periodoPago = :periodo")
    Optional<HistorialPago> findByEmpleadoAndPeriodo(@Param("empleadoId") Long empleadoId, @Param("periodo") String periodo);

    @Query("SELECT hp FROM HistorialPago hp WHERE hp.estado = 'PAGADO' ORDER BY hp.fechaPago DESC")
    List<HistorialPago> findPagados();

    @Query("SELECT hp FROM HistorialPago hp WHERE hp.estado = 'PENDIENTE'")
    List<HistorialPago> findPendientes();
}
