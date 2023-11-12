// AddStudentComponent.jsx
import React, { useState } from "react";
import NavbarComponent3 from "./NavbarComponent3";
import StudentService from "../services/StudentService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import styled from "styled-components";


export default function AddStudentComponent() {
  const initialState = {
    rut: "",
    nombres: "",
    apellidos: "",
    tipo_colegio: "",
    nombre_colegio: "",
    fecha_nacimiento: "",
    ano_egreso: "",
  };

  const [student, setStudent] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    swal({
      title: "¿Está seguro de que desea registrar al estudiante?",
      text: "Una vez registrado, deberá editar la información directamente en la base de datos si necesita realizar cambios.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willRegister) => {
      if (willRegister) {
        StudentService.addStudent(student)
          .then(() => {
            swal("Estudiante registrado con éxito", {
              icon: "success",
            });
            // Reset form or redirect after success
          })
          .catch((error) => {
            swal("Error al registrar el estudiante", {
              icon: "error",
            });
            console.error("Error al registrar el estudiante", error);
          });
      } else {
        swal("Registro cancelado");
      }
    });
  };

  return (
    <Styles>
      <NavbarComponent3 />
      <div className="home">
        <div className="mainclass">
          <div className="form1">
            <h1 className="text-center"><b>Registrar nuevo Estudiante</b></h1>
            <Form onSubmit={handleSubmit}>
              {/* Campo Rut */}
              <Form.Group className="mb-3" controlId="rut">
                <Form.Label>Rut</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el rut del estudiante"
                  name="rut"
                  value={student.rut}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Campo Nombres */}
              <Form.Group className="mb-3" controlId="nombres">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese los nombres del estudiante"
                  name="nombres"
                  value={student.nombres}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Campo Apellidos */}
              <Form.Group className="mb-3" controlId="apellidos">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese los apellidos del estudiante"
                  name="apellidos"
                  value={student.apellidos}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Campo Tipo de Colegio */}
              <Form.Group className="mb-3" controlId="tipo_colegio">
                <Form.Label>Tipo de Colegio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el tipo de colegio"
                  name="tipo_colegio"
                  value={student.tipo_colegio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Campo Nombre del Colegio */}
              <Form.Group className="mb-3" controlId="nombre_colegio">
                <Form.Label>Nombre del colegio</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del colegio"
                  name="nombre_colegio"
                  value={student.nombre_colegio}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Campo Fecha de Nacimiento */}
              <Form.Group className="mb-3" controlId="fecha_nacimiento">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la fecha de nacimiento"
                  name="fecha_nacimiento"
                  value={student.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Campo Año de Egreso */}
              <Form.Group className="mb-3" controlId="ano_egreso">
                <Form.Label>Año de Egreso</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el año de egreso"
                  name="ano_egreso"
                  value={student.ano_egreso}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Registrar Estudiante
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Styles>
  );
}


const Styles = styled.div`
  .home {
    background-color: #f2f2f2; // Color de fondo suave
    margin: 0;
    padding: 0;
    min-height: 100vh; // Asegura que la home ocupe toda la altura de la pantalla
    display: flex;
    justify-content: center; // Centra el contenedor del formulario
    align-items: center; // Centra el contenedor del formulario verticalmente
  }

  .mainclass {
    width: 50%; // Ancho del contenedor del formulario
    margin: auto;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); // Sombra suave para el contenedor
    background-color: #fff; // Fondo blanco para el contenedor del formulario
    border-radius: 8px; // Bordes redondeados para el contenedor
  }

  .form1 {
    padding: 20px;
  }

  h1.text-center {
    color: #333; // Color oscuro para el texto para mejorar la legibilidad
    margin-bottom: 30px; // Espacio debajo del título
  }

  Form {
    margin: 0 auto; // Centra el formulario en el contenedor
    max-width: 500px; // Máximo ancho del formulario
  }

  .form-group {
    margin-bottom: 15px; // Espacio entre los campos del formulario
  }

  .form-label {
    display: block; // Asegura que la etiqueta sea un bloque para alinear con el input
    margin-bottom: 5px; // Espacio entre la etiqueta y el campo de entrada
    color: #555; // Color de la etiqueta
    font-weight: bold; // Etiquetas en negrita para destacar
  }

  .form-control {
    border-radius: 5px; // Bordes redondeados para los campos de entrada
    border: 1px solid #ddd; // Borde suave para los campos de entrada
    padding: 10px; // Relleno para los campos de entrada
    width: 100%; // Ancho completo dentro del contenedor del formulario
    box-sizing: border-box; // Asegura que el padding no afecte el ancho total
  }

  Button {
    width: 100%; // El botón ocupa todo el ancho del contenedor del formulario
    padding: 10px; // Relleno para el botón
    border-radius: 5px; // Bordes redondeados para el botón
    border: none; // Sin borde para el botón
    background-color: #5cb85c; // Color del botón para acciones positivas
    color: white; // Texto blanco para el botón
    font-size: 16px; // Tamaño del texto del botón
    cursor: pointer; // Cursor de puntero para indicar que es clickeable
    margin-top: 20px; // Espacio encima del botón
    transition: background-color 0.3s ease; // Transición suave para el color de fondo al pasar el ratón por encima
  }

  Button:hover {
    background-color: #4cae4c; // Oscurecer el botón al pasar el ratón por encima para feedback al usuario
  }

  // Estilos adicionales según necesidades
`;
