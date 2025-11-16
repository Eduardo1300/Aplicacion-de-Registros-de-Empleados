package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Asistencia;
import com.cibertec.registroempleados.repository.AsistenciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AsistenciaService {
    private final AsistenciaRepository repository;

    public List<Asistencia> listar() {
        return repository.findAll();
    }

    public Asistencia guardar(Asistencia asistencia) {
        return repository.save(asistencia);
    }

    public Optional<Asistencia> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public List<Asistencia> listarAsistenciasHoy(LocalDate fecha){
        return repository.findByFechaAsistencia(fecha);
    }
}
