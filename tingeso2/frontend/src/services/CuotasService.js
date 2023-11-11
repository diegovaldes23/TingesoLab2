// CuotasService.js
import axios from 'axios';
const API_URL = "http://localhost:8080/cuota";



class CuotasService {
  generarCuotas(rut, cantidadCuotas) {
    return axios.post(API_URL+"/generar/"+rut+"/"+cantidadCuotas);
  }
}

export default new CuotasService();
