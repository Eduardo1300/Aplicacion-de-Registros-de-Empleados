package com.cibertec.registroempleados.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.registroempleados.model.SolicitudLicencia;
import com.cibertec.registroempleados.repository.SolicitudLicenciaRepository;

@Service
public class SolicitudLicenciaService {
    
    @Autowired
    private SolicitudLicenciaRepository solicitudLicenciaRepository;
    
    public SolicitudLicencia crear(SolicitudLicencia solicitud) {
        solicitud.setFechaSolicitud(LocalDateTime.now());
        solicitud.setEstado("PENDIENTE");
        return solicitudLicenciaRepository.save(solicitud);
    }
    
    public List<SolicitudLicencia> listarTodos() {
        return solicitudLicenciaRepository.findAll();
    }
    
    public Optional<SolicitudLicencia> obtenerPorId(Long id) {
        return solicitudLicenciaRepository.findById(id);
    }
    
    public List<SolicitudLicencia> listarPorEmpleado(Long empleadoId) {
        return solicitudLicenciaRepository.findByEmpleadoId(empleadoId);
    }
    
    public List<SolicitudLicencia> listarPendientes() {
        return solicitudLicenciaRepository.findPendientes();
    }
    
    public SolicitudLicencia aprobar(Long id) {
        Optional<SolicitudLicencia> opt = solicitudLicenciaRepository.findById(id);
        if (opt.isPresent()) {
            SolicitudLicencia solicitud = opt.get();
            solicitud.setEstado("APROBADA");
            solicitud.setFechaRespuesta(LocalDateTime.now());
            return solicitudLicenciaRepository.save(solicitud);
        }
        return null;
    }
    
    public SolicitudLicencia rechazar(Long id, String observaciones) {
        Optional<SolicitudLicencia> opt = solicitudLicenciaRepository.findById(id);
        if (opt.isPresent()) {
            SolicitudLicencia solicitud = opt.get();
            solicitud.setEstado("RECHAZADA");
            solicitud.setFechaRespuesta(LocalDateTime.now());
            solicitud.setObservaciones(observaciones);
            return solicitudLicenciaRepository.save(solicitud);
        }
        return null;
    }
    
    public void eliminar(Long id) {
        solicitudLicenciaRepository.deleteById(id);
    }
}
