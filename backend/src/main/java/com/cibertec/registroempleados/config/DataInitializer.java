package com.cibertec.registroempleados.config;

import com.cibertec.registroempleados.model.Rol;
import com.cibertec.registroempleados.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final RolRepository rolRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (rolRepository.findByNombre(Rol.NombreRol.ADMIN).isEmpty()) {
            Rol adminRol = new Rol();
            adminRol.setNombre(Rol.NombreRol.ADMIN);
            rolRepository.save(adminRol);
        }
        
        if (rolRepository.findByNombre(Rol.NombreRol.EMPLEADO).isEmpty()) {
            Rol empleadoRol = new Rol();
            empleadoRol.setNombre(Rol.NombreRol.EMPLEADO);
            rolRepository.save(empleadoRol);
        }
    }
}
