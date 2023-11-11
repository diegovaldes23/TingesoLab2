package com.example.resumenservice.services;

import com.example.resumenservice.entities.PruebasEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.resumenservice.model.CuotasEntity;
import com.example.resumenservice.model.EstudiantesEntity;
import com.example.resumenservice.entities.ResumenEntity;
import com.example.resumenservice.repositories.ResumenRepository;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ResumenService {
    @Autowired
    ResumenRepository resumenRepository;

    @Autowired
    PruebasService pruebasService;

    private final RestTemplate restTemplate;
    private final String cuotasServiceUrl = "http://cuota-service/cuota"; // La URL base del servicio de cuotas


    @Autowired
    public ResumenService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ArrayList<ResumenEntity> obtenerResumenes(){
        return (ArrayList<ResumenEntity>) resumenRepository.findAll();
    }

    public List<CuotasEntity> obtenerCuotasPorRut(String rut) {
        ResponseEntity<List<CuotasEntity>> response =
                restTemplate.exchange(
                        "http://cuota-service/cuota/ver/" + rut,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<CuotasEntity>>() {}
                );

        return response.getBody(); // Aquí manejas la posibilidad de null si es necesario
    }

    public EstudiantesEntity obtenerEstudiantePorRut(String rut) {
        EstudiantesEntity estudiante = restTemplate.getForObject("http://estudiante-service/estudiante/buscar-estudiante/" + rut,
                EstudiantesEntity.class);
        return estudiante;
    }

    // Método modificado para calcular el resumen
    public void calculoResumen(String rut) throws ParseException {
        // Obtener datos del estudiante y cuotas
        EstudiantesEntity estudianteActual = obtenerEstudiantePorRut(rut);
        List<CuotasEntity> cuotasEstudiante = obtenerCuotasPorRut(rut);
        List<PruebasEntity> pruebasEstudiante = pruebasService.findByRut(rut);

        // Calcular cantidad total de cuotas y pruebas
        int cantidadCuotas = cuotasEstudiante.size();
        int pruebasRendidas = pruebasEstudiante.size();
        double promedioPuntaje = pruebasRendidas > 0 ?
                pruebasEstudiante.stream()
                        .mapToDouble(prueba -> {
                            try {
                                return Double.parseDouble(prueba.getPuntaje());
                            } catch (NumberFormatException e) {
                                // Manejar la excepción si el String no puede convertirse en double
                                return 0.0;
                            }
                        })
                        .average().orElse(0) :
                0;

        // Crear y configurar el objeto ResumenEntity
        ResumenEntity resumen = new ResumenEntity();
        resumen.setRut(estudianteActual.getRut());
        resumen.setNombre_estudiante(estudianteActual.getNombres());
        resumen.setExamen_rendido(pruebasRendidas);
        resumen.setPromedio_puntaje(promedioPuntaje);

        // Llamadas al servicio de cuotas para calcular montos
        int cuotasPagadas = obtenerCantidadCuotasPagadas(rut);
        double montoTotalPagado = obtenerMontoTotalPagado(rut);
        double montoTotalPendiente = obtenerMontoTotalPendiente(rut);
        double arancelReal = montoTotalPagado + montoTotalPendiente; // Asumimos que el arancel real es la suma de pagado y pendiente

        // Configurar datos financieros
        resumen.setMonto_totalA(arancelReal);
        resumen.setTipo_pagoCC(verTipo(cantidadCuotas));
        resumen.setN_total_cuotas_pactadas(cantidadCuotas);
        resumen.setN_cuotas_pagadas(cuotasPagadas);
        resumen.setFecha_pago(calcularUltimoPago(cuotasEstudiante));
        resumen.setSaldo_pagar(arancelReal - montoTotalPagado);
        resumen.setMonto_totalP(arancelReal - montoTotalPendiente);

        // Guardar en base de datos
        resumenRepository.save(resumen);
    }



    public String calcularUltimoPago(List<CuotasEntity> cuotas) {
        String ultimoPago = null;
        Date fechaUltimoPago = null;

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        for (CuotasEntity cuota : cuotas) {
            if ("Pagado".equals(cuota.getEstado())) {
                try {
                    Date fechaPago = dateFormat.parse(cuota.getFecha_pago());

                    if (fechaUltimoPago == null || fechaPago.after(fechaUltimoPago)) {
                        fechaUltimoPago = fechaPago ;
                        ultimoPago = dateFormat.format(fechaPago);
                    }
                } catch (ParseException e) {
                    // Manejo de excepciones si hay problemas al analizar la fecha
                    e.printStackTrace();
                }
            }
        }

        return ultimoPago;
    }

    public String verTipo(int cantidad_cuota){
        if (cantidad_cuota == 0){
            return "Contado";
        }else {
            return "Cuotas";
        }
    }

    private int obtenerCantidadCuotasPagadas(String rut) {
        Integer cantidadPagadas = restTemplate.getForObject(cuotasServiceUrl + "/cantidad-pagas/" + rut, Integer.class);
        if (cantidadPagadas == null) {
            // Manejar el caso de null, por ejemplo, devolver 0
            return 0;
        }
        return cantidadPagadas;
    }

    private double obtenerMontoTotalPagado(String rut) {
        Double montoTotalPagado = restTemplate.getForObject(cuotasServiceUrl + "/monto-total-pagado/" + rut, Double.class);
        if (montoTotalPagado == null) {
            // Manejar el caso de null, por ejemplo, devolver 0.0
            return 0.0;
        }
        return montoTotalPagado;
    }

    private double obtenerMontoTotalPendiente(String rut) {
        Double montoTotalPendiente = restTemplate.getForObject(cuotasServiceUrl + "/monto-total-pendiente/" + rut, Double.class);
        if (montoTotalPendiente == null) {
            // Manejar el caso de null, por ejemplo, devolver 0.0
            return 0.0;
        }
        return montoTotalPendiente;
    }




}
