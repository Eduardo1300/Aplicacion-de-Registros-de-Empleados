package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Justificacion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JustificacionRepository extends JpaRepository<Justificacion, Long> { 
    List<Justificacion> findByEmpleadoId(Long empleadoId);
}


