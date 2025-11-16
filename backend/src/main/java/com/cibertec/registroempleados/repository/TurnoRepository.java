package com.cibertec.registroempleados.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.Turno;

@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    Optional<Turno> findByNombre(String nombre);
    List<Turno> findByActivoTrue();
    
    @Query("SELECT t FROM Turno t WHERE t.activo = true ORDER BY t.horaInicio")
    List<Turno> findAllActivoOrderByHora();
}
