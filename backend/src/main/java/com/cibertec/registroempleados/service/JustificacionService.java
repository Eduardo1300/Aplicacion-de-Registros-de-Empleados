package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Justificacion;
import com.cibertec.registroempleados.repository.JustificacionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class JustificacionService {
    private final JustificacionRepository justificacionRepository;
    
    public List<Justificacion> listarJustificaciones() {
        return justificacionRepository.findAll();
    }
    
    public List<Justificacion> listarJustificacionesPorEmpleado(Long empleadoId) {
        return justificacionRepository.findByEmpleadoId(empleadoId);
    }

    public Justificacion guardarJustificacion(Justificacion justificacion) {
        if (justificacion.getFechaCreacion() == null) {
            justificacion.setFechaCreacion(LocalDateTime.now());
        }
        return justificacionRepository.save(justificacion);
    }

    public Optional<Justificacion> obtenerPorId(Long id) {
        return justificacionRepository.findById(id);
    }
    
    public void eliminarJustificacion(Long id) {
        justificacionRepository.deleteById(id);
    }
}

