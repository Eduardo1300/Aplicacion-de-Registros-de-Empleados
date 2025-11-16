package com.cibertec.registroempleados.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginRequest {
    @JsonProperty("nombreUsuario")
    private String nombreUsuario;
    
    @JsonProperty("username")
    private String username;
    
    private String clave;
    
    // Getter que acepta tanto nombreUsuario como username
    public String getNombreUsuario() {
        return nombreUsuario != null ? nombreUsuario : username;
    }
}
