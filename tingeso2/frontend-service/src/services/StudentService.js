// StudentService.js
import axios from "axios";

const API_URL = "http://localhost:8080/estudiante/nuevo-estudiante";

class StudentService {
  addStudent(studentData) {
    return axios.post(API_URL, studentData);
  }
}

export default new StudentService();
