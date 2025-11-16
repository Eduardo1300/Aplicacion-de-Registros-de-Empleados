package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Competencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CompetenciaRepository extends JpaRepository<Competencia, Long> {
    @Query("SELECT c FROM Competencia c WHERE c.empleado.id = :empleadoId ORDER BY c.nombreCompetencia")
    List<Competencia> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT c FROM Competencia c WHERE c.estado = 'ACTIVA' ORDER BY c.nivel DESC")
    List<Competencia> findActivas();

    @Query("SELECT c FROM Competencia c WHERE c.empleado.id = :empleadoId AND c.nivel = :nivel")
    List<Competencia> findByEmpleadoAndNivel(@Param("empleadoId") Long empleadoId, @Param("nivel") String nivel);

    @Query("SELECT c FROM Competencia c WHERE c.certificada = true")
    List<Competencia> findCertificadas();
}
