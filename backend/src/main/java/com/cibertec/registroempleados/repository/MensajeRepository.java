package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Mensaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
    @Query("SELECT m FROM Mensaje m WHERE m.destinatario.id = :empleadoId ORDER BY m.fechaCreacion DESC")
    List<Mensaje> findByDestinatario(@Param("empleadoId") Long empleadoId);

    @Query("SELECT m FROM Mensaje m WHERE m.remitente.id = :empleadoId ORDER BY m.fechaCreacion DESC")
    List<Mensaje> findByRemitente(@Param("empleadoId") Long empleadoId);

    @Query("SELECT m FROM Mensaje m WHERE m.destinatario.id = :empleadoId AND m.leido = false ORDER BY m.fechaCreacion DESC")
    List<Mensaje> findNoLeidosByDestinatario(@Param("empleadoId") Long empleadoId);

    @Query("SELECT m FROM Mensaje m WHERE (m.remitente.id = :empleadoId OR m.destinatario.id = :empleadoId) ORDER BY m.fechaCreacion DESC")
    List<Mensaje> findConversacion(@Param("empleadoId") Long empleadoId);

    @Query("SELECT COUNT(m) FROM Mensaje m WHERE m.destinatario.id = :empleadoId AND m.leido = false")
    Long countNoLeidosByDestinatario(@Param("empleadoId") Long empleadoId);
}
