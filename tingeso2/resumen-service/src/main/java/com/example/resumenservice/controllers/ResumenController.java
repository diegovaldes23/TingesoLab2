package com.example.resumenservice.controllers;

import com.example.resumenservice.entities.ResumenEntity;
import com.example.resumenservice.services.ResumenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/resumenes")
public class ResumenController {
    @Autowired
    ResumenService resumenService;

    // Método para manejar solicitudes GET y devolver la lista de resúmenes
    @GetMapping("/listar-resumenes")
    public ResponseEntity<List<ResumenEntity>> listarResumenes() {
        List<ResumenEntity> resumenes = resumenService.obtenerResumenes();
        if (resumenes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(resumenes);
    }

    // Método para generar un nuevo resumen
    @PostMapping("/generar-resumen")
    public ResponseEntity<String> generarResumen(@RequestParam("rut") String rut) {
        try {
            resumenService.calculoResumen(rut);
            return ResponseEntity.ok("Resumen generado con éxito para el RUT: " + rut);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body("Error al generar resumen: " + e.getMessage());
        }
    }
}
