package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.entity.AuditLog;
import com.cibertec.registroempleados.service.AuditLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/audit-logs")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuditLogController {
    
    @Autowired
    private AuditLogService auditLogService;
    
    /**
     * Obtiene el historial de cambios de una entidad
     */
    @GetMapping("/entity/{entityName}/{entityId}")
    public ResponseEntity<?> getEntityHistory(
            @PathVariable String entityName,
            @PathVariable Long entityId) {
        try {
            List<AuditLog> history = auditLogService.getEntityHistory(entityName, entityId);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("success", true);
                put("data", history);
                put("count", history.size());
            }});
        } catch (Exception e) {
            log.error("Error retrieving entity history: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new HashMap<String, Object>() {{
                        put("success", false);
                        put("message", "Error retrieving entity history");
                    }}
            );
        }
    }
    
    /**
     * Obtiene la actividad de un usuario
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserActivity(@PathVariable Long userId) {
        try {
            List<AuditLog> activity = auditLogService.getUserActivity(userId);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("success", true);
                put("data", activity);
                put("count", activity.size());
            }});
        } catch (Exception e) {
            log.error("Error retrieving user activity: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new HashMap<String, Object>() {{
                        put("success", false);
                        put("message", "Error retrieving user activity");
                    }}
            );
        }
    }
    
    /**
     * Obtiene la actividad de un usuario en un rango de fechas
     */
    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<?> getUserActivityByDateRange(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        try {
            List<AuditLog> activity = auditLogService.getUserActivityByDateRange(userId, startDate, endDate);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("success", true);
                put("data", activity);
                put("count", activity.size());
            }});
        } catch (Exception e) {
            log.error("Error retrieving user activity by date range: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new HashMap<String, Object>() {{
                        put("success", false);
                        put("message", "Error retrieving user activity");
                    }}
            );
        }
    }
    
    /**
     * Obtiene el historial de una entidad en un rango de fechas
     */
    @GetMapping("/entity/{entityName}/date-range")
    public ResponseEntity<?> getEntityHistoryByDateRange(
            @PathVariable String entityName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        try {
            List<AuditLog> history = auditLogService.getEntityHistoryByDateRange(entityName, startDate, endDate);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("success", true);
                put("data", history);
                put("count", history.size());
            }});
        } catch (Exception e) {
            log.error("Error retrieving entity history by date range: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new HashMap<String, Object>() {{
                        put("success", false);
                        put("message", "Error retrieving entity history");
                    }}
            );
        }
    }
    
    /**
     * Obtiene todos los logs en un rango de fechas
     */
    @GetMapping("/date-range")
    public ResponseEntity<?> getAuditLogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        try {
            List<AuditLog> logs = auditLogService.getAuditLogsByDateRange(startDate, endDate);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("success", true);
                put("data", logs);
                put("count", logs.size());
            }});
        } catch (Exception e) {
            log.error("Error retrieving audit logs by date range: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new HashMap<String, Object>() {{
                        put("success", false);
                        put("message", "Error retrieving audit logs");
                    }}
            );
        }
    }
    
    /**
     * Cuenta los cambios realizados por un usuario
     */
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<?> countUserChanges(
            @PathVariable Long userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        try {
            Long count = auditLogService.countUserChanges(userId, startDate, endDate);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("success", true);
                put("count", count);
            }});
        } catch (Exception e) {
            log.error("Error counting user changes: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new HashMap<String, Object>() {{
                        put("success", false);
                        put("message", "Error counting user changes");
                    }}
            );
        }
    }
}
