package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Horario;
import com.cibertec.registroempleados.repository.HorarioRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class HorarioService {
    private final HorarioRepository horarioRepository;
    
    public List<Horario> listarHorarios() {
        return horarioRepository.findAll();
    }
    
    public List<Horario> listarHorariosPorEmpleado(Long empleadoId) {
        return horarioRepository.findByEmpleadoId(empleadoId);
    }

    public Horario guardarHorario(Horario horario) {
        return horarioRepository.save(horario);
    }

    public Optional<Horario> obtenerPorId(Long id) {
        return horarioRepository.findById(id);
    }
    
    public void eliminarHorario(Long id) {
        horarioRepository.deleteById(id);
    }
}

