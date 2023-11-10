package com.example.resumenservice.model;

import lombok.Data;



@Data                           // Genera automáticamente getters, setters, toString, equals, y hashCode
public class CuotasEntity {

    private String rut;             // Identificación única asociada a la cuota
    private int cantidad_cuotas;    // Cantidad de cuotas asociadas
    private double capital;         // Monto de capital de la cuota
    private double descuento_prueba;// Descuento aplicado (podría necesitar mayor explicación)
    private double multa;           // Monto de la multa (podría necesitar mayor explicación)
    private double monto_total;     // Monto total de la cuota
    private String estado;          // Estado actual de la cuota
    private String fecha_vencimiento;// Fecha de vencimiento de la cuota (considera usar un tipo de dato de fecha)
    private String fecha_pago;
}
