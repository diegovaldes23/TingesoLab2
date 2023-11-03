package com.example.estudianteservice.controllers;

import com.example.estudianteservice.entities.EstudiantesEntity;
import com.example.estudianteservice.services.EstudiantesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estudiante")
public class EstudiantesController {

	@Autowired
	private EstudiantesService estudiantesService;

	// Método para manejar solicitudes GET y devolver la lista de estudiantes
	@GetMapping("/listar-estudiantes")
	public ResponseEntity<List<EstudiantesEntity>> listar() {
		List<EstudiantesEntity> estudiantes = estudiantesService.obtenerEstudiantes();
		if (estudiantes.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(estudiantes);
	}

	// Método para manejar la creación de un nuevo estudiante
	@PostMapping("/nuevo-estudiante")
	public ResponseEntity<EstudiantesEntity> nuevoEstudiante(@RequestBody EstudiantesEntity estudiante) {
		EstudiantesEntity estudianteGuardado = estudiantesService.guardarEstudiante(estudiante);
		if (estudianteGuardado == null) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(estudianteGuardado);
	}

	// Suponiendo que hay un método para buscar estudiantes por rut o algún identificador
	@GetMapping("/buscar-estudiante/{rut}")
	public ResponseEntity<EstudiantesEntity> buscarEstudiante(@PathVariable String rut) {
		EstudiantesEntity estudiante = estudiantesService.buscarPorRut(rut);
		if (estudiante == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(estudiante);
	}

}

