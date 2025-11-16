package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.LogAcceso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface LogAccesoRepository extends JpaRepository<LogAcceso, Long> {
    @Query("SELECT l FROM LogAcceso l WHERE l.empleado.id = :empleadoId ORDER BY l.fechaEntrada DESC")
    List<LogAcceso> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT l FROM LogAcceso l WHERE l.estado = 'ACTIVA'")
    List<LogAcceso> findActivos();

    @Query("SELECT l FROM LogAcceso l WHERE l.tipoAcceso = :tipo ORDER BY l.fechaEntrada DESC")
    List<LogAcceso> findByTipoAcceso(@Param("tipo") String tipo);

    @Query("SELECT l FROM LogAcceso l WHERE l.motivoCierre = 'TIMEOUT' ORDER BY l.fechaEntrada DESC")
    List<LogAcceso> findTimeouts();

    @Query("SELECT COUNT(l) FROM LogAcceso l WHERE l.empleado.id = :empleadoId AND l.estado = 'ACTIVA'")
    Long countActivosByEmpleado(@Param("empleadoId") Long empleadoId);
}
