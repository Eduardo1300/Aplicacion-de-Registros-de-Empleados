package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.RolGranular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface RolGranularRepository extends JpaRepository<RolGranular, Long> {
    Optional<RolGranular> findByNombreRol(String nombreRol);

    @Query("SELECT r FROM RolGranular r WHERE r.estado = 'ACTIVO'")
    List<RolGranular> findActivos();

    @Query("SELECT r FROM RolGranular r WHERE r.puedeAprobarSolicitudes = true")
    List<RolGranular> findAprobadores();

    @Query("SELECT r FROM RolGranular r WHERE r.accesoDatosSensibles = true")
    List<RolGranular> findConAccesoSensibles();
}
