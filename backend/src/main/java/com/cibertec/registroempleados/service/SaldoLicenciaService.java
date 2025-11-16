package com.cibertec.registroempleados.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.registroempleados.model.SaldoLicencia;
import com.cibertec.registroempleados.repository.SaldoLicenciaRepository;

@Service
public class SaldoLicenciaService {
    
    @Autowired
    private SaldoLicenciaRepository saldoLicenciaRepository;
    
    public SaldoLicencia crear(SaldoLicencia saldoLicencia) {
        if (saldoLicencia.getFechaActualizacion() == null) {
            saldoLicencia.setFechaActualizacion(LocalDate.now());
        }
        return saldoLicenciaRepository.save(saldoLicencia);
    }
    
    public List<SaldoLicencia> listarTodos() {
        return saldoLicenciaRepository.findAll();
    }
    
    public Optional<SaldoLicencia> obtenerPorId(Long id) {
        return saldoLicenciaRepository.findById(id);
    }
    
    public Optional<SaldoLicencia> obtenerSaldoEmpleado(Long empleadoId, Long tipoLicenciaId, Integer anio) {
        return saldoLicenciaRepository.findByEmpleadoIdAndTipoLicenciaIdAndAnio(empleadoId, tipoLicenciaId, anio);
    }
    
    public List<SaldoLicencia> listarPorEmpleado(Long empleadoId) {
        return saldoLicenciaRepository.findByEmpleadoId(empleadoId);
    }
    
    public List<SaldoLicencia> listarSaldosDisponibles(Long empleadoId) {
        return saldoLicenciaRepository.findSaldosDisponiblesByEmpleado(empleadoId);
    }
    
    public SaldoLicencia actualizar(Long id, SaldoLicencia saldoLicencia) {
        Optional<SaldoLicencia> opt = saldoLicenciaRepository.findById(id);
        if (opt.isPresent()) {
            SaldoLicencia sl = opt.get();
            sl.setSaldoDisponible(saldoLicencia.getSaldoDisponible());
            sl.setSaldoUsado(saldoLicencia.getSaldoUsado());
            sl.setFechaActualizacion(LocalDate.now());
            return saldoLicenciaRepository.save(sl);
        }
        return null;
    }
    
    public void reintiarSaldoAnual(Long id) {
        Optional<SaldoLicencia> opt = saldoLicenciaRepository.findById(id);
        if (opt.isPresent()) {
            SaldoLicencia sl = opt.get();
            sl.setSaldoDisponible(sl.getTipoLicencia().getDiasDisponibles());
            sl.setSaldoUsado(0);
            sl.setFechaReinicio(LocalDate.now());
            saldoLicenciaRepository.save(sl);
        }
    }
}
