package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.Cargo;
import com.cibertec.registroempleados.repository.CargoRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CargoService {
    private final CargoRepository cargoRepository;
    
    public List<Cargo> listarCargos() {
        return cargoRepository.findAll();
    }

    public Cargo guardarCargo(Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    public Optional<Cargo> obtenerPorId(Long id) {
        return cargoRepository.findById(id);
    }
    
    public void eliminarCargo(Long id) {
        cargoRepository.deleteById(id);
    }
}

