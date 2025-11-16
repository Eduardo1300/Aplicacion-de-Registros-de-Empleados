package com.cibertec.registroempleados.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cibertec.registroempleados.model.HoraExtra;

@Repository
public interface HoraExtraRepository extends JpaRepository<HoraExtra, Long> {
    List<HoraExtra> findByEmpleadoId(Long empleadoId);
    List<HoraExtra> findByAprobadoFalse();
    
    @Query("SELECT h FROM HoraExtra h WHERE h.empleado.id = :empId AND h.fecha >= :inicio AND h.fecha <= :fin")
    List<HoraExtra> findByEmpleadoAndPeriodo(@Param("empId") Long empleadoId, 
                                              @Param("inicio") LocalDate inicio, 
                                              @Param("fin") LocalDate fin);
    
    @Query("SELECT SUM(h.horasExtra) FROM HoraExtra h WHERE h.empleado.id = :empId AND h.aprobado = true AND h.fecha >= :inicio AND h.fecha <= :fin")
    java.math.BigDecimal sumHorasExtraAprobadas(@Param("empId") Long empleadoId, 
                                                 @Param("inicio") LocalDate inicio, 
                                                 @Param("fin") LocalDate fin);
}
