package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.Empleado;
import com.cibertec.registroempleados.model.Rol;
import com.cibertec.registroempleados.model.Usuario;
import com.cibertec.registroempleados.repository.EmpleadoRepository;
import com.cibertec.registroempleados.repository.RolRepository;
import com.cibertec.registroempleados.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/util")
public class UtilController {
    
    private final UsuarioRepository usuarioRepository;
    private final EmpleadoRepository empleadoRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    
    @PostMapping("/create-test-user")
    public ResponseEntity<String> createTestUser() {
        try {
            Optional<Empleado> empleadoOpt = empleadoRepository.findById(1L);
            if (empleadoOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("No se encontró empleado con ID 1");
            }
            
            Optional<Rol> rolOpt = rolRepository.findByNombre(Rol.NombreRol.ADMIN);
            if (rolOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("No se encontró rol ADMIN");
            }
            
            usuarioRepository.findByNombreUsuario("admin").ifPresent(usuario -> {
                usuarioRepository.delete(usuario);
            });
            
            Usuario usuario = new Usuario();
            usuario.setNombreUsuario("admin");
            usuario.setClave(passwordEncoder.encode("1234"));
            usuario.setEmpleado(empleadoOpt.get());
            usuario.setRol(rolOpt.get());
            
            Usuario savedUser = usuarioRepository.save(usuario);
            
            return ResponseEntity.ok("Usuario admin creado: admin / 1234. ID: " + savedUser.getId());
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/check-users")
    public ResponseEntity<String> checkUsers() {
        try {
            long userCount = usuarioRepository.count();
            return ResponseEntity.ok("Total de usuarios en la base de datos: " + userCount);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/generate-hash")
    public ResponseEntity<String> generateHash(@RequestParam(defaultValue = "1234") String password) {
        String hash = passwordEncoder.encode(password);
        return ResponseEntity.ok("Contraseña: " + password + " | Hash: " + hash);
    }
}
