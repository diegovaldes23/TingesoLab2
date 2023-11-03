package com.example.cuotaservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data                       // Genera automáticamente getters, setters, toString, equals, y hashCode
@NoArgsConstructor          // Constructor sin argumentos
@AllArgsConstructor         // Constructor con todos los argumentos
public class PruebasEntity {
                 // Identificador único de la prueba
    private String rut_estudiante;  // Rut del estudiante asociado a la prueba
    private String fecha_examen;    // Fecha en la que se realizó el examen (considera usar un tipo de dato de fecha)
    private String puntaje;         // Puntaje obtenido en la prueba
}

