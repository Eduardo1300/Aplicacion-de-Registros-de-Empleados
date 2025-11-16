package com.cibertec.registroempleados.controller;

import com.cibertec.registroempleados.model.HistorialPago;
import com.cibertec.registroempleados.service.HistorialPagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/historial-pagos")
@CrossOrigin(origins = "*")
public class HistorialPagoController {
    @Autowired
    private HistorialPagoService historialPagoService;

    @PostMapping
    public ResponseEntity<HistorialPago> crear(@RequestBody HistorialPago historialPago) {
        return ResponseEntity.ok(historialPagoService.crear(historialPago));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistorialPago> obtener(@PathVariable Long id) {
        Optional<HistorialPago> pago = historialPagoService.obtenerPorId(id);
        return pago.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/empleado/{empleadoId}")
    public ResponseEntity<List<HistorialPago>> obtenerPorEmpleado(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(historialPagoService.obtenerPorEmpleado(empleadoId));
    }

    @GetMapping("/periodo/{periodo}")
    public ResponseEntity<List<HistorialPago>> obtenerPorPeriodo(@PathVariable String periodo) {
        return ResponseEntity.ok(historialPagoService.obtenerPorPeriodo(periodo));
    }

    @GetMapping("/pagados")
    public ResponseEntity<List<HistorialPago>> obtenerPagados() {
        return ResponseEntity.ok(historialPagoService.obtenerPagados());
    }

    @GetMapping("/pendientes")
    public ResponseEntity<List<HistorialPago>> obtenerPendientes() {
        return ResponseEntity.ok(historialPagoService.obtenerPendientes());
    }

    @PatchMapping("/{id}/marcar-pagado")
    public ResponseEntity<Void> marcarComoPagado(@PathVariable Long id) {
        historialPagoService.marcarComoPagado(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelarPago(@PathVariable Long id) {
        historialPagoService.cancelarPago(id);
        return ResponseEntity.noContent().build();
    }
}
