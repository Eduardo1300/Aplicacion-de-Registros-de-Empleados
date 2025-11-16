package com.cibertec.registroempleados.service;

import com.cibertec.registroempleados.model.HistorialPago;
import com.cibertec.registroempleados.repository.HistorialPagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HistorialPagoService {
    @Autowired
    private HistorialPagoRepository historialPagoRepository;

    public HistorialPago crear(HistorialPago historialPago) {
        return historialPagoRepository.save(historialPago);
    }

    public Optional<HistorialPago> obtenerPorId(Long id) {
        return historialPagoRepository.findById(id);
    }

    public List<HistorialPago> obtenerPorEmpleado(Long empleadoId) {
        return historialPagoRepository.findByEmpleado(empleadoId);
    }

    public List<HistorialPago> obtenerPorPeriodo(String periodo) {
        return historialPagoRepository.findByPeriodo(periodo);
    }

    public List<HistorialPago> obtenerPagados() {
        return historialPagoRepository.findPagados();
    }

    public List<HistorialPago> obtenerPendientes() {
        return historialPagoRepository.findPendientes();
    }

    public Optional<HistorialPago> obtenerPorEmpleadoYPeriodo(Long empleadoId, String periodo) {
        return historialPagoRepository.findByEmpleadoAndPeriodo(empleadoId, periodo);
    }

    public BigDecimal calcularMontoNeto(BigDecimal salarioBase, BigDecimal totalBonificaciones, BigDecimal totalDeducciones) {
        BigDecimal monto = salarioBase.add(totalBonificaciones).subtract(totalDeducciones);
        return monto.max(BigDecimal.ZERO);
    }

    public HistorialPago procesarPago(Long empleadoId, String periodoPago, BigDecimal salarioBase) {
        HistorialPago pago = new HistorialPago();
        pago.setSalarioBase(salarioBase);
        pago.setPeriodoPago(periodoPago);
        pago.setFechaPago(LocalDateTime.now());
        pago.setEstado("PROCESADO");
        return historialPagoRepository.save(pago);
    }

    public void marcarComoPagado(Long id) {
        historialPagoRepository.findById(id).ifPresent(pago -> {
            pago.setEstado("PAGADO");
            historialPagoRepository.save(pago);
        });
    }

    public void cancelarPago(Long id) {
        historialPagoRepository.findById(id).ifPresent(pago -> {
            pago.setEstado("CANCELADO");
            historialPagoRepository.save(pago);
        });
    }
}
