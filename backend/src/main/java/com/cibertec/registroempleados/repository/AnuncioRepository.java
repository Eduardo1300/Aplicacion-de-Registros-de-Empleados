package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {
    @Query("SELECT a FROM Anuncio a WHERE a.visible = true AND a.estado = 'ACTIVO' ORDER BY a.destacado DESC, a.fechaPublicacion DESC")
    List<Anuncio> findPublicos();

    @Query("SELECT a FROM Anuncio a WHERE a.categoria = :categoria AND a.visible = true ORDER BY a.fechaPublicacion DESC")
    List<Anuncio> findByCategoria(@Param("categoria") String categoria);

    @Query("SELECT a FROM Anuncio a WHERE a.destacado = true ORDER BY a.fechaPublicacion DESC")
    List<Anuncio> findDestacados();

    @Query("SELECT a FROM Anuncio a WHERE a.estado = 'ARCHIVADO' ORDER BY a.fechaPublicacion DESC")
    List<Anuncio> findArchivados();
}
