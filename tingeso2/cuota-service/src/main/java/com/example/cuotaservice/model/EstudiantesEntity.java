package com.example.cuotaservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data                                   // Genera automáticamente getters, setters, toString, equals, y hashCode
@NoArgsConstructor                      // Constructor sin argumentos
@AllArgsConstructor                     // Constructor con todos los argumentos
public class EstudiantesEntity {

    private String rut;             // Identificación única del estudiante
    private String nombres;         // Nombres del estudiante
    private String apellidos;       // Apellidos del estudiante
    private String tipo_colegio;    // Tipo de colegio del estudiante
    private String nombre_colegio;  // Nombre del colegio del estudiante
    private String fecha_nacimiento;// Fecha de nacimiento del estudiante (considera usar un tipo de dato de fecha)
    private int ano_egreso;         // Año en que el estudiante se graduó

}
