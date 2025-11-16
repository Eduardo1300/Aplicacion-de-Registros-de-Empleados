package com.cibertec.registroempleados.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.ConfiguracionReporte;

@Repository
public interface ConfiguracionReporteRepository extends JpaRepository<ConfiguracionReporte, Long> {
    List<ConfiguracionReporte> findByActivoTrue();
    List<ConfiguracionReporte> findByUsuarioCreadorId(Long usuarioId);
    Optional<ConfiguracionReporte> findByNombreAndUsuarioCreadorId(String nombre, Long usuarioId);
}
