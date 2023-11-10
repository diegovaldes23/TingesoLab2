// CuotasService.js
import axios from 'axios';

class CuotasService {
  generarCuotas(rut, cantidadCuotas) {
    return axios.post(`http://tu-dominio.com/cuotas/generar/${rut}/${cantidadCuotas}`);
  }
}

export default new CuotasService();
