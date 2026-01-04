package com.cibertec.registroempleados.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String entityName;  // Nombre de la entidad (Empleado, Licencia, etc)
    
    @Column(nullable = false)
    private Long entityId;  // ID de la entidad modificada
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AuditAction action;  // CREATE, UPDATE, DELETE, READ
    
    @Column(name = "user_id")
    private Long userId;
    
    @Column(name = "username", nullable = false)
    private String username;
    
    @Column(columnDefinition = "LONGTEXT")
    private String oldValues;  // JSON con valores anteriores
    
    @Column(columnDefinition = "LONGTEXT")
    private String newValues;  // JSON con valores nuevos
    
    @Column(columnDefinition = "LONGTEXT")
    private String changes;  // Descripción de cambios realizados
    
    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(length = 500)
    private String ipAddress;
    
    @Column(length = 500)
    private String userAgent;
    
    @Column(length = 1000)
    private String reason;  // Razón del cambio
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}

enum AuditAction {
    CREATE,
    UPDATE,
    DELETE,
    VIEW,
    EXPORT,
    LOGIN,
    LOGOUT,
    APPROVE,
    REJECT
}
