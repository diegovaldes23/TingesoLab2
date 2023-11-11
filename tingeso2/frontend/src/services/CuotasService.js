import axios from 'axios';

const API_URL = "http://localhost:8080/cuota";

class CuotasService {
    generarCuotas(rut, cantidadCuotas) {
        return axios.post(`${API_URL}/generar/${rut}/${cantidadCuotas}`);
    }

    procesarPago(id) {
        return axios.post(`${API_URL}/pago/${id}`);
    }
}

export default new CuotasService();
