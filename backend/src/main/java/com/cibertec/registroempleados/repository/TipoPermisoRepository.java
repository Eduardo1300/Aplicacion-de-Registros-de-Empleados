package com.cibertec.registroempleados.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.TipoPermiso;

@Repository
public interface TipoPermisoRepository extends JpaRepository<TipoPermiso, Long> {
    Optional<TipoPermiso> findByNombre(String nombre);
    List<TipoPermiso> findByActivoTrue();
}
