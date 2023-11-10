import axios from "axios";



class FileUploadService{
    

    uploadFile(file){
        return axios.post(`http://localhost:8080/pruebas/file-upload`, file);
    }

    getExams(){
        return axios.get(`http://localhost:8080/pruebas/listar-pruebas`);
    }
}

export default new FileUploadService()
