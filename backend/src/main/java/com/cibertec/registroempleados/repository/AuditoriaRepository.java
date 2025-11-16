package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Auditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
    @Query("SELECT a FROM Auditoria a WHERE a.usuarioId = :usuarioId ORDER BY a.fechaCreacion DESC")
    List<Auditoria> findByUsuario(@Param("usuarioId") Long usuarioId);

    @Query("SELECT a FROM Auditoria a WHERE a.accion = :accion ORDER BY a.fechaCreacion DESC")
    List<Auditoria> findByAccion(@Param("accion") String accion);

    @Query("SELECT a FROM Auditoria a WHERE a.entidad = :entidad ORDER BY a.fechaCreacion DESC")
    List<Auditoria> findByEntidad(@Param("entidad") String entidad);

    @Query("SELECT a FROM Auditoria a WHERE a.resultado = 'ERROR' ORDER BY a.fechaCreacion DESC")
    List<Auditoria> findErrores();

    @Query("SELECT a FROM Auditoria a WHERE a.resultado = 'INTENTO_FALLIDO' ORDER BY a.fechaCreacion DESC")
    List<Auditoria> findIntentosFallidos();

    @Query("SELECT a FROM Auditoria a ORDER BY a.fechaCreacion DESC LIMIT 1000")
    List<Auditoria> findTop1000();
}
