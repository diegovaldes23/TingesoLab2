import React, { useState } from 'react';
import NavbarComponent5 from './NavbarComponent5';
import styled from 'styled-components';
import CuotasService from '../services/CuotasService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';


export default function GenerarCuotasComponent() {
  const initialState = {
    rut: '',
    cantidadCuotas: ''
  };

  const [input, setInput] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: '¿Está seguro?',
      text: 'Una vez creadas, las cuotas no podrán ser modificadas.',
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true
    }).then((willCreate) => {
      if (willCreate) {
        CuotasService.generarCuotas(input.rut, input.cantidadCuotas)
          .then((response) => {
            swal('Cuotas creadas con éxito', { icon: 'success' });
          })
          .catch((error) => {
            swal('Error al crear las cuotas', {
              icon: 'error'
            });
            console.error('Error al crear las cuotas:', error);
          });
      } else {
        swal('Creación de cuotas cancelada');
      }
    });
  };

  return (
    <Styles>
      <NavbarComponent5 />
      <div className='home'>
        <div className='mainclass'>
          <div className='form1'>
            <h1 className='text-center'><b>Generar Cuotas</b></h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='rut'>
                <Form.Label>Rut del Estudiante</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Ingrese el rut del estudiante'
                  name='rut'
                  value={input.rut}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='cantidadCuotas'>
                <Form.Label>Cantidad de Cuotas</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Ingrese la cantidad de cuotas'
                  name='cantidadCuotas'
                  value={input.cantidadCuotas}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Generar Cuotas
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