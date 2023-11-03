package com.example.estudianteservice.repositories;

import com.example.estudianteservice.entities.EstudiantesEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstudiantesRepository extends CrudRepository<EstudiantesEntity, Long> {

    Optional<EstudiantesEntity> findByRut(String rut);
}
