package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    @Query("SELECT n FROM Notificacion n WHERE n.empleado.id = :empleadoId ORDER BY n.fechaCreacion DESC")
    List<Notificacion> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT n FROM Notificacion n WHERE n.empleado.id = :empleadoId AND n.leida = false ORDER BY n.fechaCreacion DESC")
    List<Notificacion> findNoLeidasByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT n FROM Notificacion n WHERE n.empleado.id = :empleadoId AND n.prioridad = 'CRITICA'")
    List<Notificacion> findCriticas(@Param("empleadoId") Long empleadoId);

    @Query("SELECT COUNT(n) FROM Notificacion n WHERE n.empleado.id = :empleadoId AND n.leida = false")
    Long countNoLeidasByEmpleado(@Param("empleadoId") Long empleadoId);
}
