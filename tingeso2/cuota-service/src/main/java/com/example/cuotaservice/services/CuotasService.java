package com.example.cuotaservice.services;

import com.example.cuotaservice.entities.CuotasEntity;
import com.example.cuotaservice.repositories.CuotasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

@Service
public class CuotasService {
    @Autowired
    CuotasRepository cuotasRepository;

    //Obtener cuotas

    public ArrayList<CuotasEntity> findRut(String rut){
        return (ArrayList<CuotasEntity>)cuotasRepository.findRut(rut);
    }
    public ArrayList<CuotasEntity>findAll(){
        return (ArrayList<CuotasEntity>)cuotasRepository.findAll();
    }

    public int findcantidadpagas(String rut){return cuotasRepository.findcantidadpagas(rut);}

    public int findCantidad(String rut){return cuotasRepository.findCantidadCuotas(rut);}


    public  Double findMontoTotalPagado(String rut){return cuotasRepository.findMontoTotalPagado(rut);}
    public  Double findMontoTotalPendiente(String rut){return cuotasRepository.findMontoTotalPendiente(rut);}

    //Guardar una cuota
    public void pagando(int id) {
        CuotasEntity cuota = cuotasRepository.findById(id);

        // Obtener la fecha actual
        LocalDate fechaActual = LocalDate.now();

        // Verificar si la fecha actual NO está entre el 5 y el 10 de cada mes
        if (fechaActual.getDayOfMonth() >=5  && fechaActual.getDayOfMonth() <= 19) {
            cuota.setEstado("Pagado");

            // Establecer la fecha de vencimiento como la fecha actual
            cuota.setFecha_pago(fechaActual.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));

            cuotasRepository.save(cuota);
        }
    }


}
