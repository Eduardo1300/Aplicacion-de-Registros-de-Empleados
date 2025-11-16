package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.AnalisesDesempeño;

@Repository
public interface AnalisesDesempeñoRepository extends JpaRepository<AnalisesDesempeño, Long> {
    Optional<AnalisesDesempeño> findByDepartamentoIdAndPeriodo(Long departamentoId, LocalDate periodo);
    List<AnalisesDesempeño> findByDepartamentoId(Long departamentoId);
    
    @Query("SELECT a FROM AnalisesDesempeño a WHERE a.periodo >= :inicio AND a.periodo <= :fin ORDER BY a.productividad DESC")
    List<AnalisesDesempeño> findByPeriodoOrdenado(@Param("inicio") LocalDate inicio, @Param("fin") LocalDate fin);
}
