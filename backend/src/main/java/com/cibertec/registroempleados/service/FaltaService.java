package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Falta;
import com.cibertec.registroempleados.repository.FaltaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FaltaService {
    private final FaltaRepository faltaRepository;
    
    public List<Falta> listar() {
        return faltaRepository.findAll();
    }
    
    public Optional<Falta> obtenerPorId(Long id) {
        return faltaRepository.findById(id);
    }
    
    public Falta guardar(Falta falta) {
        return faltaRepository.save(falta);
    }
    
    public List<Falta> obtenerPorEmpleado(Long empleadoId) {
        return faltaRepository.findByEmpleadoId(empleadoId);
    }
    
    public List<Falta> obtenerPorEmpleadoYEstado(Long empleadoId, String estado) {
        return faltaRepository.findByEmpleadoIdAndEstado(empleadoId, estado);
    }
    
    public void eliminar(Long id) {
        faltaRepository.deleteById(id);
    }
}
