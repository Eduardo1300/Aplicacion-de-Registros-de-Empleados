package com.cibertec.registroempleados.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cibertec.registroempleados.dto.ReporteDTO;
import com.cibertec.registroempleados.model.Departamento;
import com.cibertec.registroempleados.model.Reporte;
import com.cibertec.registroempleados.model.Usuario;
import com.cibertec.registroempleados.repository.DepartamentoRepository;
import com.cibertec.registroempleados.repository.ReporteRepository;
import com.cibertec.registroempleados.repository.UsuarioRepository;

@Service
public class ReporteService {
    
    @Autowired
    private ReporteRepository reporteRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private DepartamentoRepository departamentoRepository;
    
    public Reporte crearReporte(ReporteDTO dto) {
        Reporte reporte = new Reporte();
        reporte.setTitulo(dto.getTitulo());
        reporte.setDescripcion(dto.getDescripcion());
        reporte.setTipoReporte(Reporte.TipoReporte.valueOf(dto.getTipoReporte()));
        reporte.setFechaGeneracion(LocalDateTime.now());
        reporte.setEstado(Reporte.EstadoReporte.BORRADOR);
        
        if (dto.getUsuarioGeneradorId() != null) {
            Optional<Usuario> usuario = usuarioRepository.findById(dto.getUsuarioGeneradorId());
            usuario.ifPresent(reporte::setUsuarioGenerador);
        }
        
        if (dto.getDepartamentoId() != null) {
            Optional<Departamento> depto = departamentoRepository.findById(dto.getDepartamentoId());
            depto.ifPresent(reporte::setDepartamento);
        }
        
        reporte.setFechaInicio(dto.getFechaInicio());
        reporte.setFechaFin(dto.getFechaFin());
        
        return reporteRepository.save(reporte);
    }
    
    public List<Reporte> listarTodos() {
        return reporteRepository.findAll();
    }
    
    public Optional<Reporte> obtenerPorId(Long id) {
        return reporteRepository.findById(id);
    }
    
    public List<Reporte> listarPorTipo(String tipo) {
        return reporteRepository.findByTipoReporte(Reporte.TipoReporte.valueOf(tipo));
    }
    
    public List<Reporte> listarPorEstado(String estado) {
        return reporteRepository.findByEstado(Reporte.EstadoReporte.valueOf(estado));
    }
    
    public Reporte actualizarReporte(Long id, ReporteDTO dto) {
        Optional<Reporte> reporteOpt = reporteRepository.findById(id);
        if (reporteOpt.isPresent()) {
            Reporte reporte = reporteOpt.get();
            reporte.setTitulo(dto.getTitulo());
            reporte.setDescripcion(dto.getDescripcion());
            reporte.setFechaInicio(dto.getFechaInicio());
            reporte.setFechaFin(dto.getFechaFin());
            reporte.setFechaActualizacion(LocalDateTime.now());
            return reporteRepository.save(reporte);
        }
        return null;
    }
    
    public void eliminarReporte(Long id) {
        reporteRepository.deleteById(id);
    }
    
    public Reporte generarReporte(Long id) {
        Optional<Reporte> reporteOpt = reporteRepository.findById(id);
        if (reporteOpt.isPresent()) {
            Reporte reporte = reporteOpt.get();
            reporte.setEstado(Reporte.EstadoReporte.GENERADO);
            reporte.setFechaGeneracion(LocalDateTime.now());
            return reporteRepository.save(reporte);
        }
        return null;
    }
}
