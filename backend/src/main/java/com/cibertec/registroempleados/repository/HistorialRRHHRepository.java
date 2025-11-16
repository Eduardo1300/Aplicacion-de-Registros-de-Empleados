package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.HistorialRRHH;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface HistorialRRHHRepository extends JpaRepository<HistorialRRHH, Long> {
    @Query("SELECT h FROM HistorialRRHH h WHERE h.empleado.id = :empleadoId ORDER BY h.fechaEvento DESC")
    List<HistorialRRHH> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT h FROM HistorialRRHH h WHERE h.tipoEvento = :tipo ORDER BY h.fechaEvento DESC")
    List<HistorialRRHH> findByTipo(@Param("tipo") String tipo);

    @Query("SELECT h FROM HistorialRRHH h WHERE h.tipoEvento IN ('ASCENSO', 'CAMBIO_CARGO', 'CAMBIO_DEPARTAMENTO') ORDER BY h.fechaEvento DESC")
    List<HistorialRRHH> findCambiosOrganizacionales();
}
