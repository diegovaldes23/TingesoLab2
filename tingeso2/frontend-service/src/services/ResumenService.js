import axios from 'axios';

class ResumenService {
  // Método para obtener la lista de resúmenes
  getResumenes() {
    return axios.get('http://localhost:8080/resumen/listar-resumenes')
      .then(response => response.data)
      .catch(error => console.error('Error al obtener resúmenes:', error));
  }

  // Método para generar un nuevo resumen
  generarResumen(rut) {
    return axios.post('http://localhost:8080/resumen/generar-resumen', new URLSearchParams({ rut }))
      .then(response => response.data)
      .catch(error => console.error('Error al generar resumen:', error));
  }
}

export default new ResumenService();
