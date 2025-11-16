package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Salario;
import com.cibertec.registroempleados.repository.SalarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SalarioService {
    @Autowired
    private SalarioRepository salarioRepository;

    public Salario crear(Salario salario) {
        return salarioRepository.save(salario);
    }

    public Optional<Salario> obtenerPorId(Long id) {
        return salarioRepository.findById(id);
    }

    public List<Salario> obtenerTodos() {
        return salarioRepository.findAllSalarios();
    }

    public List<Salario> obtenerPorEmpleado(Long empleadoId) {
        return salarioRepository.findAllByEmpleado(empleadoId);
    }

    public Optional<Salario> obtenerActivo(Long empleadoId) {
        return salarioRepository.findSalarioActivoByEmpleado(empleadoId);
    }

    public Salario actualizar(Long id, Salario salarioNuevo) {
        return salarioRepository.findById(id).map(salario -> {
            salario.setMontoBase(salarioNuevo.getMontoBase());
            salario.setFrecuenciaPago(salarioNuevo.getFrecuenciaPago());
            salario.setEstado(salarioNuevo.getEstado());
            return salarioRepository.save(salario);
        }).orElseThrow(() -> new RuntimeException("Salario no encontrado"));
    }

    public void eliminar(Long id) {
        salarioRepository.deleteById(id);
    }

    public boolean inactivar(Long id) {
        return salarioRepository.findById(id).map(salario -> {
            salario.setEstado("INACTIVO");
            salarioRepository.save(salario);
            return true;
        }).orElse(false);
    }
}
