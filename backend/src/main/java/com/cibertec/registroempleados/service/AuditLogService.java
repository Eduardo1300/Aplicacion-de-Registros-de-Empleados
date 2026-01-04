package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.entity.AuditLog;
import com.cibertec.registroempleados.repository.AuditLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Transactional
public class AuditLogService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * Registra un cambio en la auditoría
     */
    public void logChange(String entityName, Long entityId, String action, 
                         Object oldValues, Object newValues, Long userId, String username) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .entityName(entityName)
                    .entityId(entityId)
                    .action(action)
                    .oldValues(convertToJson(oldValues))
                    .newValues(convertToJson(newValues))
                    .userId(userId)
                    .username(username)
                    .changes(generateChangeDescription(oldValues, newValues))
                    .ipAddress(getClientIp())
                    .userAgent(getUserAgent())
                    .createdAt(LocalDateTime.now())
                    .build();
            
            auditLogRepository.save(auditLog);
            log.info("Audit log registered: {} - {} (ID: {})", entityName, action, entityId);
        } catch (Exception e) {
            log.error("Error registering audit log: {}", e.getMessage());
        }
    }
    
    /**
     * Registra un cambio simple
     */
    public void logSimpleChange(String entityName, Long entityId, String action, 
                               Long userId, String username) {
        logChange(entityName, entityId, action, null, null, userId, username);
    }
    
    /**
     * Obtiene el historial de cambios de una entidad
     */
    public List<AuditLog> getEntityHistory(String entityName, Long entityId) {
        return auditLogRepository.findByEntityNameAndEntityId(entityName, entityId);
    }
    
    /**
     * Obtiene los logs de un usuario
     */
    public List<AuditLog> getUserActivity(Long userId) {
        return auditLogRepository.findByUserId(userId);
    }
    
    /**
     * Obtiene los logs de un usuario en un rango de fechas
     */
    public List<AuditLog> getUserActivityByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return auditLogRepository.findByUserIdAndDateRange(userId, startDate, endDate);
    }
    
    /**
     * Obtiene los logs de una entidad en un rango de fechas
     */
    public List<AuditLog> getEntityHistoryByDateRange(String entityName, LocalDateTime startDate, LocalDateTime endDate) {
        return auditLogRepository.findByEntityNameAndDateRange(entityName, startDate, endDate);
    }
    
    /**
     * Obtiene todos los logs en un rango de fechas
     */
    public List<AuditLog> getAuditLogsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return auditLogRepository.findByDateRange(startDate, endDate);
    }
    
    /**
     * Cuenta los cambios realizados por un usuario en un rango de fechas
     */
    public Long countUserChanges(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return auditLogRepository.countChangesByUserAndDateRange(userId, startDate, endDate);
    }
    
    /**
     * Convierte un objeto a JSON
     */
    private String convertToJson(Object object) {
        if (object == null) return null;
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            log.error("Error converting object to JSON: {}", e.getMessage());
            return null;
        }
    }
    
    /**
     * Genera una descripción de los cambios realizados
     */
    private String generateChangeDescription(Object oldValues, Object newValues) {
        if (oldValues == null && newValues == null) return "Sin cambios de valores";
        
        try {
            Map<String, Object> oldMap = oldValues != null ? 
                    objectMapper.convertValue(oldValues, Map.class) : new HashMap<>();
            Map<String, Object> newMap = newValues != null ? 
                    objectMapper.convertValue(newValues, Map.class) : new HashMap<>();
            
            StringBuilder description = new StringBuilder();
            
            // Cambios en campos existentes
            for (String key : oldMap.keySet()) {
                Object oldVal = oldMap.get(key);
                Object newVal = newMap.get(key);
                
                if ((oldVal == null && newVal != null) || 
                    (oldVal != null && !oldVal.equals(newVal))) {
                    description.append("'").append(key).append("': ")
                            .append(oldVal).append(" → ").append(newVal).append("; ");
                }
            }
            
            // Nuevos campos
            for (String key : newMap.keySet()) {
                if (!oldMap.containsKey(key)) {
                    description.append("'").append(key).append("' agregado: ")
                            .append(newMap.get(key)).append("; ");
                }
            }
            
            return description.length() > 0 ? description.toString() : "Sin cambios";
        } catch (Exception e) {
            log.error("Error generating change description: {}", e.getMessage());
            return "Error al procesar cambios";
        }
    }
    
    /**
     * Obtiene la IP del cliente
     */
    private String getClientIp() {
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String xForwardedFor = request.getHeader("X-Forwarded-For");
            if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                return xForwardedFor.split(",")[0];
            }
            return request.getRemoteAddr();
        } catch (Exception e) {
            return "UNKNOWN";
        }
    }
    
    /**
     * Obtiene el User-Agent del cliente
     */
    private String getUserAgent() {
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            return request.getHeader("User-Agent");
        } catch (Exception e) {
            return "UNKNOWN";
        }
    }
}
