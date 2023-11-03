package com.example.cuotaservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.cuotaservice.entities.CuotasEntity;
import com.example.cuotaservice.services.CuotasService;
import com.example.cuotaservice.services.Pago;

import java.text.ParseException;
import java.util.ArrayList;

@RestController
@RequestMapping("/cuotas")
public class CuotasController {

    @Autowired
    private CuotasService cuotasService;

    @Autowired
    private Pago pagoService;

    // Listar todas las cuotas o filtrar por RUT
    @GetMapping
    public ResponseEntity<ArrayList<CuotasEntity>> listarCuotas(@RequestParam(value = "rut", required = false) String rut) {
        ArrayList<CuotasEntity> cuotas;
        if (rut != null && !rut.isEmpty()) {
            cuotas = cuotasService.findRut(rut);
        } else {
            cuotas = cuotasService.findAll();
        }
        if(cuotas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cuotas);
    }

    // Crear una nueva cuota
    @PostMapping("/generar/{rut}/{cantidad_cuotas}")
    public ResponseEntity<String> crearCuota(@PathVariable("rut") String rut,
                                             @PathVariable("cantidad_cuotas") int cantidad_cuotas) throws ParseException {
        if (pagoService.maximoCuotasColegio(rut, cantidad_cuotas)) {
            pagoService.calculoCuotas(rut, cantidad_cuotas);
            return ResponseEntity.ok("Cuotas creadas con éxito.");
        } else {
            return ResponseEntity.badRequest().body("Cantidad de cuotas incorrecta o estudiante no existe.");
        }
    }

    // Procesar un pago
    @PostMapping("/pago/{id}")
    public ResponseEntity<String> procesarPago(@PathVariable("id") int id) {
        try {
            cuotasService.pagando(id);
            return ResponseEntity.ok("Pago procesado con éxito.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al procesar el pago: " + e.getMessage());
        }
    }

    // Obtener la cantidad de cuotas pagadas por RUT
    @GetMapping("/cantidad-pagas/{rut}")
    public ResponseEntity<Integer> obtenerCantidadPagas(@PathVariable String rut) {
        try {
            int cantidadPagas = cuotasService.findcantidadpagas(rut);
            return ResponseEntity.ok(cantidadPagas);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Obtener el monto total pagado por RUT
    @GetMapping("/monto-total-pagado/{rut}")
    public ResponseEntity<Double> obtenerMontoTotalPagado(@PathVariable String rut) {
        try {
            Double montoTotalPagado = cuotasService.findMontoTotalPagado(rut);
            return ResponseEntity.ok(montoTotalPagado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Obtener el monto total pendiente por RUT
    @GetMapping("/monto-total-pendiente/{rut}")
    public ResponseEntity<Double> obtenerMontoTotalPendiente(@PathVariable String rut) {
        try {
            Double montoTotalPendiente = cuotasService.findMontoTotalPendiente(rut);
            return ResponseEntity.ok(montoTotalPendiente);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
