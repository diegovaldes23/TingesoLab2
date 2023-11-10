package com.example.resumenservice.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "pruebas")    // Nombre de la tabla en la base de datos
@Data                       // Genera automáticamente getters, setters, toString, equals, y hashCode
@NoArgsConstructor          // Constructor sin argumentos
@AllArgsConstructor         // Constructor con todos los argumentos
public class PruebasEntity {
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;                 // Identificador único de la prueba
    @Column(nullable = false)
    private String rut_estudiante;  // Rut del estudiante asociado a la prueba
    private String fecha_examen;    // Fecha en la que se realizó el examen (considera usar un tipo de dato de fecha)
    private String puntaje;         // Puntaje obtenido en la prueba
}

