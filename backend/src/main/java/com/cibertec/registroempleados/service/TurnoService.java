package com.cibertec.registroempleados.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.registroempleados.model.Turno;
import com.cibertec.registroempleados.repository.TurnoRepository;

@Service
public class TurnoService {
    
    @Autowired
    private TurnoRepository turnoRepository;
    
    public Turno crear(Turno turno) {
        return turnoRepository.save(turno);
    }
    
    public List<Turno> listarTodos() {
        return turnoRepository.findAll();
    }
    
    public List<Turno> listarActivos() {
        return turnoRepository.findByActivoTrue();
    }
    
    public Optional<Turno> obtenerPorId(Long id) {
        return turnoRepository.findById(id);
    }
    
    public Optional<Turno> obtenerPorNombre(String nombre) {
        return turnoRepository.findByNombre(nombre);
    }
    
    public Turno actualizar(Long id, Turno turno) {
        Optional<Turno> turnoOpt = turnoRepository.findById(id);
        if (turnoOpt.isPresent()) {
            Turno t = turnoOpt.get();
            t.setNombre(turno.getNombre());
            t.setHoraInicio(turno.getHoraInicio());
            t.setHoraFin(turno.getHoraFin());
            t.setDescansoInicio(turno.getDescansoInicio());
            t.setDescansoFin(turno.getDescansoFin());
            t.setHorasTrabajo(turno.getHorasTrabajo());
            t.setDescripcion(turno.getDescripcion());
            return turnoRepository.save(t);
        }
        return null;
    }
    
    public void eliminar(Long id) {
        turnoRepository.deleteById(id);
    }
}
