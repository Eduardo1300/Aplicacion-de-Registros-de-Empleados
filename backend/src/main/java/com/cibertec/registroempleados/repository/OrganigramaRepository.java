package com.cibertec.registroempleados.repository;

import com.cibertec.registroempleados.model.Organigrama;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface OrganigramaRepository extends JpaRepository<Organigrama, Long> {
    @Query("SELECT o FROM Organigrama o WHERE o.empleado.id = :empleadoId")
    Optional<Organigrama> findByEmpleado(@Param("empleadoId") Long empleadoId);

    @Query("SELECT o FROM Organigrama o WHERE o.superior.id = :superiorId")
    List<Organigrama> findSubordinados(@Param("superiorId") Long superiorId);

    @Query("SELECT o FROM Organigrama o WHERE o.nivelJerarquico = :nivel ORDER BY o.departamento")
    List<Organigrama> findByNivel(@Param("nivel") Integer nivel);

    @Query("SELECT o FROM Organigrama o WHERE o.estado = 'ACTIVO' ORDER BY o.nivelJerarquico")
    List<Organigrama> findArbol();

    @Query("SELECT o FROM Organigrama o WHERE o.departamento = :depto")
    List<Organigrama> findByDepartamento(@Param("depto") String depto);
}
