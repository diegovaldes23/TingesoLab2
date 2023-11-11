import React, { Component } from "react";
import NavbarComponent4 from "./NavbarComponent4"; // Asegúrate de tener este componente
import styled from "styled-components";

class CuotasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cuotas: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/cuota") // Ajusta la URL según tu backend
        .then(response => response.json())
        .then(data => this.setState({ cuotas: data }));
    }

    render() {
        return (
            <div className="home">
                <NavbarComponent4 />
                <Styles>
                    <h1 className="text-center">Listado de Cuotas</h1>
                    <div className="f">
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>Rut</th>
                                    <th>Cantidad de Cuotas</th>
                                    <th>Capital</th>
                                    <th>Descuento Prueba</th>
                                    <th>Multa</th>
                                    <th>Monto Total</th>
                                    <th>Estado</th>
                                    <th>Fecha Vencimiento</th>
                                    <th>Fecha de Pago</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cuotas.map((cuota) => (
                                    <tr key={cuota.id}>
                                        <td>{cuota.rut}</td>
                                        <td>{cuota.cantidad_cuotas}</td>
                                        <td>{cuota.capital}</td>
                                        <td>{cuota.descuento_prueba}</td>
                                        <td>{cuota.multa}</td>
                                        <td>{cuota.monto_total}</td>
                                        <td>{cuota.estado}</td>
                                        <td>{cuota.fecha_vencimiento}</td>
                                        <td>{cuota.fecha_pago}</td>
                                        <td>
                                            <form action="/procesar-pago" method="post">
                                                <input type="hidden" name="id" value={cuota.id} />
                                                <button type="submit" className="btn btn-success btn-sm">Pagar</button>
                                            </form>
                                        </td>
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

export default CuotasComponent;

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
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.content-table{
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.content-table thead tr{
    background-color: #D49D7A;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
}
.content-table th,
.content-table td{
    padding: 12px 15px;
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