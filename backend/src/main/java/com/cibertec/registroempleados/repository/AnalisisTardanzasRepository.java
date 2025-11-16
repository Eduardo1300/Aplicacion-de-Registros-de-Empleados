package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.AnalisisTardanzas;

@Repository
public interface AnalisisTardanzasRepository extends JpaRepository<AnalisisTardanzas, Long> {
    Optional<AnalisisTardanzas> findByEmpleadoIdAndPeriodo(Long empleadoId, LocalDate periodo);
    List<AnalisisTardanzas> findByEmpleadoId(Long empleadoId);
    
    @Query("SELECT a FROM AnalisisTardanzas a WHERE a.periodo >= :inicio AND a.periodo <= :fin")
    List<AnalisisTardanzas> findByPeriodo(@Param("inicio") LocalDate inicio, @Param("fin") LocalDate fin);
}
