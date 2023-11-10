import React, { Component } from "react";
import NavbarComponent3 from "./NavbarComponent3";
import styled from "styled-components";

class ResumenComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resumenes: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/resumenes/listar-resumenes") // Asume que esta es la URL correcta para tu API
          .then((response) => response.json())
          .then((data) => this.setState({ resumenes: data }));
    }

    render() {
        return (
            <div className="home">
                <NavbarComponent3 />
                <Styles>
                    <h1 className="text-center"> <b>Listado de Resúmenes</b></h1>
                    <div className="f">
                        <table border="1" class="content-table">
                            <thead>
                                <tr>
                                    <th>Rut</th>
                                    <th>Nombre del Estudiante</th>
                                    <th>Exámenes Rendidos</th>
                                    <th>Promedio de Puntajes</th>
                                    <th>Monto Total Acumulado</th>
                                    <th>Tipo de Pago CC</th>
                                    <th>N° Cuotas Pactadas</th>
                                    <th>N° Cuotas Pagadas</th>
                                    <th>Monto Total Pagado</th>
                                    <th>Fecha Último Pago</th>
                                    <th>Saldo Pendiente</th>
                                    <th>N° Cuotas en Retraso</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.resumenes.map((resumen) => (
                                    <tr key={resumen.rut}>
                                        <td>{resumen.rut}</td>
                                        <td>{resumen.nombre_estudiante}</td>
                                        <td>{resumen.examen_rendido}</td>
                                        <td>{resumen.promedio_puntaje}</td>
                                        <td>{resumen.monto_totalA}</td>
                                        <td>{resumen.tipo_pagoCC}</td>
                                        <td>{resumen.n_total_cuotas_pactadas}</td>
                                        <td>{resumen.n_cuotas_pagadas}</td>
                                        <td>{resumen.monto_totalP}</td>
                                        <td>{resumen.fecha_pago}</td>
                                        <td>{resumen.saldo_pagar}</td>
                                        <td>{resumen.n_cuotas_retraso}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Styles>
            </div>
        );
    }
}

export default ResumenComponent;


const Styles = styled.div`


.text-center {
    text-align: center;
    justify-content: center;
    padding-top: 8px;
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 30px;
    letter-spacing: 0px;
    word-spacing: 2px;
    color: #000000;
    font-weight: 700;
    text-decoration: none solid rgb(68, 68, 68);
    font-style: normal;
    font-variant: normal;
    text-transform: uppercase;
}

.f{
    justify-content: center;
    align-items: center;
    display: flex;
}
*{
    font-family: sans-serif;
    box-sizing: content-box;
    margin: 0;
    padding: 0;
}
.content-table{
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.8em;
    min-width: 200px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    margin-left: 4%;
    margin-right: 4%;
}
.content-table thead tr{
    background-color: #D49D7A;
    color: #ffffff;
    text-align: center;
    font-weight: bold;
}
.content-table th,
.content-table td{
    padding: 12px 15px;
    text-align: center;
}
.content-table tbody tr{
    border-bottom: 1px solid #dddddd;
}
.content-table tbody tr:nth-of-type(even){
    background-color: #f3f3f3;
}
.content-table tbody tr:last-of-type{
    border-bottom: 2px solid #009879;
}
.content-table tbody tr.active-row{
    font-weight: bold;
    color: #009879;
}
`