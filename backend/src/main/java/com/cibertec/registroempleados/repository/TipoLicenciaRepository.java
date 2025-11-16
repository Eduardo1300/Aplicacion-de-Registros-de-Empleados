package com.cibertec.registroempleados.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.TipoLicencia;

@Repository
public interface TipoLicenciaRepository extends JpaRepository<TipoLicencia, Long> {
    Optional<TipoLicencia> findByNombre(String nombre);
    List<TipoLicencia> findByActivoTrue();
}
