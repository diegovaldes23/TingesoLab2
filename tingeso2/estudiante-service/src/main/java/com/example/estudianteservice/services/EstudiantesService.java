package com.example.estudianteservice.services;

import com.example.estudianteservice.entities.EstudiantesEntity;
import com.example.estudianteservice.repositories.EstudiantesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudiantesService {
    @Autowired
    private EstudiantesRepository estudiantesRepository;

    // Obtener todos los estudiantes
    public List<EstudiantesEntity> obtenerEstudiantes() {
        return (List<EstudiantesEntity>) estudiantesRepository.findAll();
    }

    // Guardar un estudiante
    public EstudiantesEntity guardarEstudiante(EstudiantesEntity estudiante) {
        // Aquí puedes añadir lógica adicional si es necesario
        // antes de guardar el estudiante
        return estudiantesRepository.save(estudiante);
    }

    // Buscar un estudiante por su RUT
    public EstudiantesEntity buscarPorRut(String rut) {
        Optional<EstudiantesEntity> estudiante = estudiantesRepository.findByRut(rut);
        return estudiante.orElse(null);
    }


}
