package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Evaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface EvaluacionRepository extends JpaRepository<Evaluacion, Long> {
    @Query("SELECT e FROM Evaluacion e WHERE e.empleado.id = :empleadoId ORDER BY e.fechaEvaluacion DESC")
    List<Evaluacion> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT e FROM Evaluacion e WHERE e.periodoEvaluacion = :periodo")
    List<Evaluacion> findByPeriodo(@Param("periodo") String periodo);

    @Query("SELECT e FROM Evaluacion e WHERE e.empleado.id = :empleadoId AND e.periodoEvaluacion = :periodo")
    Optional<Evaluacion> findByEmpleadoAndPeriodo(@Param("empleadoId") Long empleadoId, @Param("periodo") String periodo);

    @Query("SELECT e FROM Evaluacion e WHERE e.estado = 'COMPLETADA' ORDER BY e.calificacionGeneral DESC LIMIT 10")
    List<Evaluacion> findTop10Mejores();

    @Query("SELECT e FROM Evaluacion e WHERE e.estado = 'PENDIENTE'")
    List<Evaluacion> findPendientes();
}
