package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.ContactoFormulario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ContactoFormularioRepository extends JpaRepository<ContactoFormulario, Long> {
    @Query("SELECT c FROM ContactoFormulario c WHERE c.estado = 'NUEVO' ORDER BY c.prioridad DESC, c.fechaCreacion ASC")
    List<ContactoFormulario> findNuevos();

    @Query("SELECT c FROM ContactoFormulario c WHERE c.estado = 'EN_REVISION'")
    List<ContactoFormulario> findEnRevision();

    @Query("SELECT c FROM ContactoFormulario c WHERE c.tipoConsulta = :tipo ORDER BY c.fechaCreacion DESC")
    List<ContactoFormulario> findByTipo(@Param("tipo") String tipo);

    @Query("SELECT c FROM ContactoFormulario c WHERE c.prioridad = 'CRITICA' AND c.estado != 'CERRADO'")
    List<ContactoFormulario> findCriticas();

    @Query("SELECT c FROM ContactoFormulario c WHERE c.email = :email ORDER BY c.fechaCreacion DESC")
    List<ContactoFormulario> findByEmail(@Param("email") String email);
}
