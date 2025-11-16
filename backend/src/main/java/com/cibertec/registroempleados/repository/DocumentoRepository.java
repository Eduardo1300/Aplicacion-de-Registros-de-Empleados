package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    @Query("SELECT d FROM Documento d WHERE d.empleado.id = :empleadoId ORDER BY d.fechaCreacion DESC")
    List<Documento> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT d FROM Documento d WHERE d.tipoDocumento = :tipo ORDER BY d.fechaCreacion DESC")
    List<Documento> findByTipo(@Param("tipo") String tipo);

    @Query("SELECT d FROM Documento d WHERE d.clasificacion = 'CONFIDENCIAL'")
    List<Documento> findConfidenciales();

    @Query("SELECT d FROM Documento d WHERE d.estado = 'VENCIDO'")
    List<Documento> findVencidos();

    @Query("SELECT d FROM Documento d WHERE d.requiereFirma = true AND d.firmado = false")
    List<Documento> findPendientesFirma();
}
