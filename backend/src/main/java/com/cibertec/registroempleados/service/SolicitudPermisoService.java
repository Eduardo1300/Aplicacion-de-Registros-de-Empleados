package com.cibertec.registroempleados.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.registroempleados.model.SolicitudPermiso;
import com.cibertec.registroempleados.repository.SolicitudPermisoRepository;

@Service
public class SolicitudPermisoService {
    
    @Autowired
    private SolicitudPermisoRepository solicitudPermisoRepository;
    
    public SolicitudPermiso crear(SolicitudPermiso solicitudPermiso) {
        solicitudPermiso.setFechaSolicitud(LocalDateTime.now());
        solicitudPermiso.setEstado("PENDIENTE");
        return solicitudPermisoRepository.save(solicitudPermiso);
    }
    
    public List<SolicitudPermiso> listarTodos() {
        return solicitudPermisoRepository.findAll();
    }
    
    public List<SolicitudPermiso> listarPendientes() {
        return solicitudPermisoRepository.findByEstado("PENDIENTE");
    }
    
    public List<SolicitudPermiso> listarPorEmpleado(Long empleadoId) {
        return solicitudPermisoRepository.findByEmpleadoId(empleadoId);
    }
    
    public Optional<SolicitudPermiso> obtenerPorId(Long id) {
        return solicitudPermisoRepository.findById(id);
    }
    
    public SolicitudPermiso aprobar(Long id) {
        Optional<SolicitudPermiso> solicitud = solicitudPermisoRepository.findById(id);
        if (solicitud.isPresent()) {
            SolicitudPermiso permiso = solicitud.get();
            permiso.setEstado("APROBADO");
            permiso.setFechaRespuesta(LocalDateTime.now());
            return solicitudPermisoRepository.save(permiso);
        }
        return null;
    }
    
    public SolicitudPermiso rechazar(Long id, String observaciones) {
        Optional<SolicitudPermiso> solicitud = solicitudPermisoRepository.findById(id);
        if (solicitud.isPresent()) {
            SolicitudPermiso permiso = solicitud.get();
            permiso.setEstado("RECHAZADO");
            permiso.setObservaciones(observaciones);
            permiso.setFechaRespuesta(LocalDateTime.now());
            return solicitudPermisoRepository.save(permiso);
        }
        return null;
    }
    
    public void eliminar(Long id) {
        solicitudPermisoRepository.deleteById(id);
    }
}
