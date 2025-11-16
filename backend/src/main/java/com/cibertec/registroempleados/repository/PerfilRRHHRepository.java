package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.PerfilRRHH;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface PerfilRRHHRepository extends JpaRepository<PerfilRRHH, Long> {
    @Query("SELECT p FROM PerfilRRHH p WHERE p.empleado.id = :empleadoId")
    Optional<PerfilRRHH> findByEmpleado(@Param("empleadoId") Long empleadoId);
}
