import axios from "axios";



class FileUploadService{
    

  uploadFile(file){
    return axios.post(`http://localhost:8080/resumen/file-upload`, file);
  }


    getExams(){
        return axios.get(`http://localhost:8080/resumen/listar-pruebas`);
    }
}

export default new FileUploadService()
