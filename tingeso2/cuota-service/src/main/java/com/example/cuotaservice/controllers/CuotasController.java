package com.example.cuotaservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.cuotaservice.entities.CuotasEntity;
import com.example.cuotaservice.services.CuotasService;
import com.example.cuotaservice.services.Pago;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cuota")
public class CuotasController {

    @Autowired
    private CuotasService cuotasService;

    @Autowired
    private Pago pagoService;

    // Listar todas las cuotas o filtrar por RUT
    @GetMapping
    public ResponseEntity<List<CuotasEntity>> listarCuotas(@RequestParam(value = "rut", required = false) String rut) {
        List<CuotasEntity> cuotas;
        if (rut != null && !rut.isEmpty()) {
            cuotas = cuotasService.findByRut(rut);
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
            // Es importante devolver un estado HTTP adecuado para las respuestas de error.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el pago: " + e.getMessage());
        }
    }

    // Obtener la cantidad de cuotas pagadas por RUT
    @GetMapping("/cantidad-pagas/{rut}")
    public ResponseEntity<Integer> obtenerCantidadPagas(@PathVariable String rut) {
        Integer cantidadPagas = cuotasService.findcantidadpagas(rut);
        // Se maneja el caso donde cantidadPagas puede ser null
        if (cantidadPagas == null) {
            cantidadPagas = 0; // O manejar de otra manera como lanzar una excepción
        }
        return ResponseEntity.ok(cantidadPagas);
    }

    // Obtener el monto total pagado por RUT
    @GetMapping("/monto-total-pagado/{rut}")
    public ResponseEntity<Double> obtenerMontoTotalPagado(@PathVariable String rut) {
        Double montoTotalPagado = cuotasService.findMontoTotalPagado(rut);
        // Se maneja el caso donde montoTotalPagado puede ser null
        if (montoTotalPagado == null) {
            montoTotalPagado = 0.0; // O manejar de otra manera como lanzar una excepción
        }
        return ResponseEntity.ok(montoTotalPagado);
    }

    // Obtener el monto total pendiente por RUT
    @GetMapping("/monto-total-pendiente/{rut}")
    public ResponseEntity<Double> obtenerMontoTotalPendiente(@PathVariable String rut) {
        Double montoTotalPendiente = cuotasService.findMontoTotalPendiente(rut);
        // Se maneja el caso donde montoTotalPendiente puede ser null
        if (montoTotalPendiente == null) {
            montoTotalPendiente = 0.0; // O manejar de otra manera como lanzar una excepción
        }
        return ResponseEntity.ok(montoTotalPendiente);
    }

    @GetMapping("/ver/{rut}")
    public ResponseEntity<List<CuotasEntity>> obtenerCuotasPorRut(@PathVariable String rut) {
        try {
            List<CuotasEntity> cuotas = cuotasService.findByRut(rut);
            if(cuotas == null || cuotas.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(cuotas, HttpStatus.OK);
        } catch (Exception e) {
            // Loggear el error y manejar adecuadamente la excepción
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
