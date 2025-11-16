package com.cibertec.registroempleados.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ValidationService {

    // Email validation
    public boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) return false;
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        return email.matches(emailRegex);
    }

    // Phone validation (Peru format)
    public boolean isValidPhone(String phone) {
        if (phone == null || phone.isEmpty()) return false;
        String phoneRegex = "^(\\+51|0)?[1-9]\\d{8,9}$";
        return phone.replaceAll("\\s", "").matches(phoneRegex);
    }

    // DNI validation (Peru format)
    public boolean isValidDNI(String dni) {
        if (dni == null || dni.isEmpty()) return false;
        return dni.matches("^\\d{8}$");
    }

    // Not empty validation
    public boolean isNotEmpty(String value) {
        return value != null && !value.trim().isEmpty();
    }

    // Min length validation
    public boolean minLength(String value, int length) {
        return value != null && value.length() >= length;
    }

    // Max length validation
    public boolean maxLength(String value, int length) {
        return value != null && value.length() <= length;
    }

    // Generic validation with multiple rules
    public Map<String, String> validateEmpleado(String nombres, String apellidos, String email, String telefono, String dni) {
        Map<String, String> errors = new HashMap<>();

        if (!isNotEmpty(nombres)) {
            errors.put("nombres", "El nombre es requerido");
        } else if (!minLength(nombres, 2)) {
            errors.put("nombres", "El nombre debe tener al menos 2 caracteres");
        }

        if (!isNotEmpty(apellidos)) {
            errors.put("apellidos", "Los apellidos son requeridos");
        } else if (!minLength(apellidos, 2)) {
            errors.put("apellidos", "Los apellidos deben tener al menos 2 caracteres");
        }

        if (!isNotEmpty(email)) {
            errors.put("email", "El email es requerido");
        } else if (!isValidEmail(email)) {
            errors.put("email", "El email es inválido");
        }

        if (!isNotEmpty(telefono)) {
            errors.put("telefono", "El teléfono es requerido");
        } else if (!isValidPhone(telefono)) {
            errors.put("telefono", "El teléfono es inválido");
        }

        if (!isNotEmpty(dni)) {
            errors.put("dni", "El DNI es requerido");
        } else if (!isValidDNI(dni)) {
            errors.put("dni", "El DNI debe tener 8 dígitos");
        }

        return errors;
    }
}
