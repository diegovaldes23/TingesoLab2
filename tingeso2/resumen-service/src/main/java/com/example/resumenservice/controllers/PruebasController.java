package com.example.resumenservice.controllers;


import com.example.resumenservice.entities.PruebasEntity;
import com.example.resumenservice.services.PruebasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("/pruebas")
public class PruebasController {
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

}