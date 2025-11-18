package com.cibertec.registroempleados.repository;


import com.cibertec.registroempleados.model.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
    Optional<Departamento> findByNombreIgnoreCase(String nombre);
}
