package com.cibertec.registroempleados.repository;


import com.cibertec.registroempleados.model.Empleado;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> { 
	Optional<Empleado> findBydni(String dni);
	boolean existsByDni(String dni);
}
