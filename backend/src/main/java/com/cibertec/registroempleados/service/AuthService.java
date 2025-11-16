package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.dto.LoginRequest;
import com.cibertec.registroempleados.dto.LoginResponse;
import com.cibertec.registroempleados.model.Usuario;
import com.cibertec.registroempleados.repository.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private static final String SECRET_KEY = "tu_clave_secreta_super_segura_y_larga_para_jwt_1234567890";
    private static final long EXPIRATION_TIME = 86400000; // 24 horas en milisegundos
    
    public LoginResponse login(LoginRequest request) {
        String nombreUsuario = request.getNombreUsuario();
        log.info("Intento de login con usuario: {}", nombreUsuario);
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombreUsuario(nombreUsuario);
        
        if (usuarioOpt.isEmpty()) {
            log.error("Usuario no encontrado: {}", nombreUsuario);
            throw new RuntimeException("Credenciales inválidas");
        }
        
        Usuario usuario = usuarioOpt.get();
        
        // Comparación directa de contraseña (temporal - sin hash)
        // TODO: Implementar hash bcrypt en producción
        boolean passwordMatches = request.getClave().equals(usuario.getClave());
        
        log.info("Contraseña recibida: {}", request.getClave());
        log.info("Contraseña en BD: {}", usuario.getClave());
        log.info("¿Contraseña coincide?: {}", passwordMatches);
        
        if (!passwordMatches) {
            log.error("Contraseña incorrecta para usuario: {}", nombreUsuario);
            throw new RuntimeException("Credenciales inválidas");
        }
        
        // Generar JWT token
        String token = generarJWT(usuario);
        
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setNombreUsuario(usuario.getNombreUsuario());
        response.setRol(usuario.getRol().getNombre().name());
        
        // Manejo de empleado opcional
        if (usuario.getEmpleado() != null) {
            response.setEmpleadoNombre(usuario.getEmpleado().getNombre() + " " + usuario.getEmpleado().getApellido());
            response.setEmpleadoId(usuario.getEmpleado().getId());
        } else {
            response.setEmpleadoNombre("Admin");
            response.setEmpleadoId(null);
        }
        
        log.info("Login exitoso para usuario: {}", nombreUsuario);
        return response;
    }
    
    private String generarJWT(Usuario usuario) {
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), 0, SECRET_KEY.getBytes().length, "HmacSHA256");
        
        var jwtBuilder = Jwts.builder()
                .setSubject(usuario.getNombreUsuario())
                .claim("role", usuario.getRol().getNombre().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME));
        
        // Agregar datos del empleado solo si existe
        if (usuario.getEmpleado() != null) {
            jwtBuilder.claim("empleadoId", usuario.getEmpleado().getId());
            jwtBuilder.claim("empleadoNombre", usuario.getEmpleado().getNombre());
        }
        
        return jwtBuilder.signWith(key, SignatureAlgorithm.HS256).compact();
    }
    
    public Optional<Usuario> findByNombreUsuario(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }
}
