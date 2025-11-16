package com.cibertec.registroempleados.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.SaldoLicencia;

@Repository
public interface SaldoLicenciaRepository extends JpaRepository<SaldoLicencia, Long> {
    Optional<SaldoLicencia> findByEmpleadoIdAndTipoLicenciaIdAndAnio(Long empleadoId, Long tipoLicenciaId, Integer anio);
    List<SaldoLicencia> findByEmpleadoId(Long empleadoId);
    List<SaldoLicencia> findByTipoLicenciaIdAndAnio(Long tipoLicenciaId, Integer anio);
    
    @Query("SELECT s FROM SaldoLicencia s WHERE s.empleado.id = :empId AND s.saldoDisponible > 0")
    List<SaldoLicencia> findSaldosDisponiblesByEmpleado(@Param("empId") Long empleadoId);
}
