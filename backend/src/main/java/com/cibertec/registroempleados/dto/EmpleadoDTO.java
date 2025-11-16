package com.cibertec.registroempleados.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmpleadoDTO {
    private Long id;
    private String nombres;
    private String apellidos;
    private String dni;
    private String email;
    private String telefono;
    private String contacto;
    private LocalDate fechaIngreso;
    private String estado;
    private Long cargoId;
    private String cargoNombre;
    private Long departamentoId;
    private String departamentoNombre;
}
