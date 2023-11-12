import React, { useState } from 'react';
import NavbarComponent6 from './NavbarComponent6'; // Asumiendo que tienes un componente Navbar similar
import styled from 'styled-components';
import ResumenService from '../services/ResumenService'; // Asume que tienes un servicio de Resumen
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

export default function GenerarResumenComponent() {
  const [rut, setRut] = useState('');

  const handleInputChange = (event) => {
    setRut(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: '¿Está seguro?',
      text: 'Se generará un resumen para el estudiante.',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true
    }).then((willGenerate) => {
      if (willGenerate) {
        ResumenService.generarResumen(rut)
          .then((response) => {
            swal('Resumen generado con éxito', { icon: 'success' });
          })
          .catch((error) => {
            swal('Error al generar el resumen', {
              icon: 'error'
            });
            console.error('Error al generar el resumen:', error);
          });
      } else {
        swal('Generación de resumen cancelada');
      }
    });
  };

  return (
    <Styles>
      <NavbarComponent6 />
      <div className='home'>
        <div className='mainclass'>
          <div className='form1'>
            <h1 className='text-center'><b>Generar Resumen</b></h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='rut'>
                <Form.Label>Rut del Estudiante</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Ingrese el rut del estudiante'
                  value={rut}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Generar Resumen
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
    background-color: #f7f7f7; /* Color de fondo suave */
    padding: 40px 0; /* Espaciado superior e inferior */
    display: flex;
    justify-content: center; /* Centrado horizontal */
  }

  .mainclass {
    width: 100%;
    max-width: 600px; /* Ancho máximo del contenedor */
    margin: auto; /* Centrado vertical */
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra suave para el contenedor */
    background-color: white; /* Fondo blanco para el contenido */
    border-radius: 8px; /* Bordes redondeados */
  }

  .form1 {
    margin: 20px; /* Espaciado interno */
  }

  h1.text-center {
    color: #333; /* Color de texto oscuro */
    margin-bottom: 30px; /* Espaciado debajo del título */
  }

  Form {
    display: flex;
    flex-direction: column; /* Organizar los campos de formulario en columna */
  }

  .form-group {
    margin-bottom: 15px; /* Espaciado entre campos de formulario */
  }

  .form-label {
    font-size: 18px; /* Tamaño de la etiqueta del formulario */
    color: #555; /* Color de la etiqueta del formulario */
    margin-bottom: 5px; /* Espaciado debajo de la etiqueta del formulario */
  }

  .form-control {
    border-radius: 5px; /* Bordes redondeados para campos de entrada */
    border: 1px solid #ddd; /* Borde suave para campos de entrada */
    padding: 10px; /* Espaciado interno en campos de entrada */
    font-size: 16px; /* Tamaño de fuente para campos de entrada */
  }

  Button {
    background-color: #0056b3; /* Color de fondo del botón */
    color: white; /* Texto blanco para el botón */
    padding: 10px 15px; /* Espaciado interno del botón */
    border: none; /* Sin bordes para el botón */
    border-radius: 5px; /* Bordes redondeados para el botón */
    font-size: 18px; /* Tamaño de fuente del botón */
    cursor: pointer; /* Cursor de mano al pasar sobre el botón */
    margin-top: 20px; /* Espaciado arriba del botón */
    transition: background-color 0.3s ease-in-out; /* Transición suave del color de fondo */
  }

  Button:hover {
    background-color: #004494; /* Color de fondo al pasar sobre el botón */
  }
`;