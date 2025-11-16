package com.cibertec.registroempleados.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class LoggerService {

    public void info(String message) {
        log.info("[INFO] {}", message);
    }

    public void info(String message, Object... args) {
        log.info("[INFO] {}", String.format(message, args));
    }

    public void debug(String message) {
        log.debug("[DEBUG] {}", message);
    }

    public void debug(String message, Object... args) {
        log.debug("[DEBUG] {}", String.format(message, args));
    }

    public void warn(String message) {
        log.warn("[WARN] {}", message);
    }

    public void warn(String message, Throwable throwable) {
        log.warn("[WARN] {}", message, throwable);
    }

    public void error(String message) {
        log.error("[ERROR] {}", message);
    }

    public void error(String message, Throwable throwable) {
        log.error("[ERROR] {}", message, throwable);
    }

    public void error(String message, Object... args) {
        log.error("[ERROR] {}", String.format(message, args));
    }
}
