package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.CatalogoDepartamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface CatalogoDepartamentoRepository extends JpaRepository<CatalogoDepartamento, Long> {
    Optional<CatalogoDepartamento> findByNombreDepartamento(String nombre);

    Optional<CatalogoDepartamento> findByCodigoDepartamento(String codigo);

    @Query("SELECT c FROM CatalogoDepartamento c WHERE c.estado = 'ACTIVO'")
    List<CatalogoDepartamento> findActivos();

    @Query("SELECT c FROM CatalogoDepartamento c WHERE c.numeroEmpleados > 0 ORDER BY c.numeroEmpleados DESC")
    List<CatalogoDepartamento> findConEmpleados();
}
