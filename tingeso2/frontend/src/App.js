import './App.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import FileUploadComponent from './components/FileUploadComponent';
import FileInformationComponent from './components/FileInformationComponent';
import EmployeeComponent from './components/EmployeeComponent';
import NuevoEstudiante from './components/NuevoEstudiante';
import CrearCuota from './components/CrearCuota';
import Vercuotas from './components/Vercuotas';
import CrearResumen from './components/CrearResumen';
import VerResumen from './components/VerResumen';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path= "/subir-archivo" element={<FileUploadComponent />} />
        <Route path= "/informacion-archivo" element={<FileInformationComponent />} />
        <Route path= "/lista-empleados" element={<EmployeeComponent />} />
        <Route path= "/nuevo-estudiante" element={<NuevoEstudiante />} />
        <Route path= "/crear-cuota" element={<CrearCuota />} />
        <Route path= "/ver-cuotas" element={<Vercuotas />} />
        <Route path= "/crear-resumenes" element={<CrearResumen />} />

        <Route path= "/ver-resumenes" element={<VerResumen />} />





      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
