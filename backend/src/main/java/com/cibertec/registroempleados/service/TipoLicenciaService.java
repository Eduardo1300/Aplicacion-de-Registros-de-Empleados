package com.cibertec.registroempleados.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.registroempleados.model.TipoLicencia;
import com.cibertec.registroempleados.repository.TipoLicenciaRepository;

@Service
public class TipoLicenciaService {
    
    @Autowired
    private TipoLicenciaRepository tipoLicenciaRepository;
    
    public TipoLicencia crear(TipoLicencia tipoLicencia) {
        return tipoLicenciaRepository.save(tipoLicencia);
    }
    
    public List<TipoLicencia> listarTodos() {
        return tipoLicenciaRepository.findAll();
    }
    
    public List<TipoLicencia> listarActivos() {
        return tipoLicenciaRepository.findByActivoTrue();
    }
    
    public Optional<TipoLicencia> obtenerPorId(Long id) {
        return tipoLicenciaRepository.findById(id);
    }
    
    public Optional<TipoLicencia> obtenerPorNombre(String nombre) {
        return tipoLicenciaRepository.findByNombre(nombre);
    }
    
    public TipoLicencia actualizar(Long id, TipoLicencia tipoLicencia) {
        Optional<TipoLicencia> opt = tipoLicenciaRepository.findById(id);
        if (opt.isPresent()) {
            TipoLicencia tl = opt.get();
            tl.setNombre(tipoLicencia.getNombre());
            tl.setDescripcion(tipoLicencia.getDescripcion());
            tl.setDiasDisponibles(tipoLicencia.getDiasDisponibles());
            tl.setRequiereAprobacion(tipoLicencia.getRequiereAprobacion());
            tl.setPuedeAcumularse(tipoLicencia.getPuedeAcumularse());
            return tipoLicenciaRepository.save(tl);
        }
        return null;
    }
    
    public void eliminar(Long id) {
        tipoLicenciaRepository.deleteById(id);
    }
}
