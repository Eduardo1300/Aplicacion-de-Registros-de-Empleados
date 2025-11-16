package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.dto.EmpleadoResponse;
import com.cibertec.registroempleados.model.Empleado;
import com.cibertec.registroempleados.model.Rol;
import com.cibertec.registroempleados.model.Usuario;
import com.cibertec.registroempleados.repository.EmpleadoRepository;
import com.cibertec.registroempleados.repository.RolRepository;
import com.cibertec.registroempleados.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EmpleadoService {
    private final EmpleadoRepository empleadoRepository;
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    
    public List<Empleado> listarEmpleado() {
        return empleadoRepository.findAll();
    }

    public EmpleadoResponse guardarEmpleado(Empleado empleado) {
        // Si el ID es null o 0, se considera un nuevo empleado
        boolean esNuevo = empleado.getId() == null || empleado.getId() == 0;
        
        // Para nuevos empleados, establecer ID a null para que Hibernate genere uno
        if (esNuevo) {
            empleado.setId(null);
        }
        
        Empleado empleadoGuardado = empleadoRepository.save(empleado);
        
        if (esNuevo) {
            String nombreUsuario = generarNombreUsuario(empleadoGuardado.getNombre(), empleadoGuardado.getApellido());
            boolean usuarioCreado = crearUsuarioAutomaticamente(empleadoGuardado, nombreUsuario);
            
            if (usuarioCreado) {
                return new EmpleadoResponse(empleadoGuardado, nombreUsuario, "1234");
            }
        }
        
        return new EmpleadoResponse(empleadoGuardado);
    }
    
    private boolean crearUsuarioAutomaticamente(Empleado empleado, String nombreUsuario) {
        if (usuarioRepository.existsByNombreUsuario(nombreUsuario)) {
            return false;
        }
        
        Optional<Rol> rolEmpleado = rolRepository.findByNombre(Rol.NombreRol.EMPLEADO);
        if (rolEmpleado.isEmpty()) {
            return false;
        }
        
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombreUsuario(nombreUsuario);
        nuevoUsuario.setClave(passwordEncoder.encode("1234"));
        nuevoUsuario.setEmpleado(empleado);
        nuevoUsuario.setRol(rolEmpleado.get());
        
        usuarioRepository.save(nuevoUsuario);
        return true;
    }
    
    private String generarNombreUsuario(String nombre, String apellido) {
        return (nombre + "." + apellido)
            .toLowerCase()
            .replaceAll("\\s+", ".")
            .replaceAll("[áàäâ]", "a")
            .replaceAll("[éèëê]", "e")
            .replaceAll("[íìïî]", "i")
            .replaceAll("[óòöô]", "o")
            .replaceAll("[úùüû]", "u")
            .replaceAll("[ñ]", "n");
    }

    public Optional<Empleado> obtenerPorId(Long id) {
        return empleadoRepository.findById(id);
    }
}
