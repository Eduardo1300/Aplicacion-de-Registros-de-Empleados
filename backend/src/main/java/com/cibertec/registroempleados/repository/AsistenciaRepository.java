package com.cibertec.registroempleados.repository;


import com.cibertec.registroempleados.model.Asistencia;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> { 

	List<Asistencia> findByFechaAsistencia(LocalDate fechaAsistencia);
}

