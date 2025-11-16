package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Departamento;
import com.cibertec.registroempleados.repository.DepartamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartamentoService {
    private final DepartamentoRepository repository;

    public List<Departamento> listar() {
        return repository.findAll();
    }

    public Departamento guardar(Departamento departamento) {
        return repository.save(departamento);
    }

    public Optional<Departamento> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
