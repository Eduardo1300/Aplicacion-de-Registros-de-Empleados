package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Falta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaltaRepository extends JpaRepository<Falta, Long> {
    List<Falta> findByEmpleadoId(Long empleadoId);
    List<Falta> findByEmpleadoIdAndEstado(Long empleadoId, String estado);
}
