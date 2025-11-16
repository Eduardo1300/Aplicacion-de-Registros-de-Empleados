package com.cibertec.registroempleados.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "roles_granulares")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolGranular {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_rol", nullable = false, unique = true)
    private String nombreRol;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "permisos_modulo_nomina")
    private String permisosModuloNomina; // LEER, CREAR, EDITAR, ELIMINAR, EXPORTAR (separado por comas)

    @Column(name = "permisos_modulo_rrhh")
    private String permisosModuloRRHH;

    @Column(name = "permisos_modulo_reportes")
    private String permisosModuloReportes;

    @Column(name = "permisos_modulo_seguridad")
    private String permisosModuloSeguridad;

    @Column(name = "permisos_modulo_empleados")
    private String permisosModuloEmpleados;

    @Column(name = "permisos_modulo_comunicacion")
    private String permisosModuloComunicacion;

    @Column(name = "puede_aprobar_solicitudes")
    private Boolean puedeAprobarSolicitudes;

    @Column(name = "puede_ver_reportes_sensibles")
    private Boolean puedeVerReportesSensibles;

    @Column(name = "puede_editar_configuracion")
    private Boolean puedeEditarConfiguracion;

    @Column(name = "acceso_datos_sensibles")
    private Boolean accesoDatosSensibles;

    @Column(name = "estado")
    private String estado; // ACTIVO, INACTIVO

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
        this.estado = "ACTIVO";
    }
}
