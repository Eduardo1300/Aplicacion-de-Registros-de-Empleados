package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Evaluacion;
import com.cibertec.registroempleados.repository.EvaluacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EvaluacionService {
    @Autowired
    private EvaluacionRepository evaluacionRepository;

    public Evaluacion crear(Evaluacion evaluacion) {
        return evaluacionRepository.save(evaluacion);
    }

    public Optional<Evaluacion> obtenerPorId(Long id) {
        return evaluacionRepository.findById(id);
    }

    public List<Evaluacion> obtenerPorEmpleado(Long empleadoId) {
        return evaluacionRepository.findByEmpleado(empleadoId);
    }

    public List<Evaluacion> obtenerPorPeriodo(String periodo) {
        return evaluacionRepository.findByPeriodo(periodo);
    }

    public List<Evaluacion> obtenerTop10Mejores() {
        return evaluacionRepository.findTop10Mejores();
    }

    public Evaluacion actualizar(Long id, Evaluacion evaluacionNueva) {
        return evaluacionRepository.findById(id).map(evaluacion -> {
            evaluacion.setCalificacionGeneral(evaluacionNueva.getCalificacionGeneral());
            evaluacion.setComentariosEvaluador(evaluacionNueva.getComentariosEvaluador());
            evaluacion.setEstado(evaluacionNueva.getEstado());
            return evaluacionRepository.save(evaluacion);
        }).orElseThrow(() -> new RuntimeException("Evaluación no encontrada"));
    }

    public void eliminar(Long id) {
        evaluacionRepository.deleteById(id);
    }

    public Double calcularPromedioEmpleado(Long empleadoId) {
        List<Evaluacion> evaluaciones = evaluacionRepository.findByEmpleado(empleadoId);
        if (evaluaciones.isEmpty()) return 0.0;
        return evaluaciones.stream()
            .mapToInt(e -> e.getCalificacionGeneral() != null ? e.getCalificacionGeneral() : 0)
            .average()
            .orElse(0.0);
    }
}
