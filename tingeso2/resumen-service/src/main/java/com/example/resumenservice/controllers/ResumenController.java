package com.example.resumenservice.controllers;

import com.example.resumenservice.entities.PruebasEntity;
import com.example.resumenservice.entities.ResumenEntity;
import com.example.resumenservice.services.PruebasService;
import com.example.resumenservice.services.ResumenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/resumen")
public class ResumenController {

    @Autowired
    PruebasService pruebasService;

    @GetMapping("/file-upload")
    public String main(){
        return "file-upload";
    }

    // Método para manejar solicitudes GET y devolver la lista de pruebas
    @GetMapping("/listar-pruebas")
    public ResponseEntity<List<PruebasEntity>> listarPruebas() {
        List<PruebasEntity> pruebas = pruebasService.obtenerPruebas();
        if (pruebas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pruebas);
    }

    @PostMapping("/file-upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file){
        pruebasService.guardar(file);

        pruebasService.leerTxt("students_exams.csv");
        return ResponseEntity.ok("Funciona");
    }

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

    @GetMapping("/pruebas/{rut}")
    public ResponseEntity<List<PruebasEntity>> obtenerPruebasPorRut(@PathVariable String rut) {
        try {
            List<PruebasEntity> pruebas = pruebasService.findByRut(rut);
            if(pruebas == null || pruebas.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(pruebas, HttpStatus.OK);
        } catch (Exception e) {
            // Loggear el error y manejar adecuadamente la excepción
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
