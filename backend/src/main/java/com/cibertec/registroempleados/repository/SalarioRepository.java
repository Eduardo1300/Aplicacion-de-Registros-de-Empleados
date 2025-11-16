package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Salario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface SalarioRepository extends JpaRepository<Salario, Long> {
    @Query("SELECT s FROM Salario s WHERE s.empleado.id = :empleadoId AND s.estado = 'ACTIVO'")
    Optional<Salario> findSalarioActivoByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT s FROM Salario s WHERE s.empleado.id = :empleadoId ORDER BY s.fechaInicio DESC")
    List<Salario> findAllByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT s FROM Salario s WHERE s.estado = 'ACTIVO' ORDER BY s.fechaCreacion DESC")
    List<Salario> findAllSalarios();
}
