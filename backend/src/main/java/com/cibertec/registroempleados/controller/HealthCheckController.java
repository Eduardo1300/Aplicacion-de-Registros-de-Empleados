package com.cibertec.registroempleados.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "*")
public class HealthCheckController {

    @GetMapping("/ping")
    public HealthResponse ping() {
        return new HealthResponse("pong", System.currentTimeMillis());
    }

    @GetMapping("/status")
    public HealthResponse status() {
        return new HealthResponse("OK", System.currentTimeMillis());
    }

    public static class HealthResponse {
        public String status;
        public long timestamp;

        public HealthResponse(String status, long timestamp) {
            this.status = status;
            this.timestamp = timestamp;
        }

        public String getStatus() {
            return status;
        }

        public long getTimestamp() {
            return timestamp;
        }
    }
}
