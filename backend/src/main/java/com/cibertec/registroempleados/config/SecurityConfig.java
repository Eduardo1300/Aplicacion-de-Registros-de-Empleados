package com.cibertec.registroempleados.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/health/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/rol").permitAll()
                .requestMatchers("/api/util/**").permitAll()
                .requestMatchers("OPTIONS", "/").permitAll()  // Permitir preflight requests
                .requestMatchers("OPTIONS", "/**").permitAll()  // Permitir preflight requests en rutas
                .requestMatchers("GET", "/api/empleado/**").permitAll()
                .requestMatchers("GET", "/api/departamento/**").permitAll()
                .requestMatchers("GET", "/api/cargo/**").permitAll()
                .requestMatchers("GET", "/api/asistencia/**").permitAll()
                .requestMatchers("GET", "/api/horario/**").permitAll()
                .requestMatchers("GET", "/api/falta/**").permitAll()
                .requestMatchers("GET", "/api/justificacion/**").permitAll()
                .requestMatchers("GET", "/api/estadisticas/**").permitAll()
                .requestMatchers("POST", "/api/empleado/**").hasRole("ADMIN")
                .requestMatchers("PUT", "/api/empleado/**").hasRole("ADMIN")
                .requestMatchers("POST", "/api/asistencia/**").permitAll()
                .requestMatchers("PATCH", "/api/asistencia/**").permitAll()
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

