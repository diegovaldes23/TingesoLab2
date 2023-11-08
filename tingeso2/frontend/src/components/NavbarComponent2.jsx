import React from "react";
import styled from "styled-components";

function NavbarComponent2(){
    return(
        <>
        <NavStyle>
            <header className="header">
                <div className="logo">
                    <h1>Top Education</h1>
                </div>
                <nav>
                </nav>
                <a className="btn" href="/"><button>Volver al menú principal</button></a>
                <a className="btn-2" href="/subir-archivo"><button>Cargar un nuevo Data.txt</button></a>
            </header>
        </NavStyle>
        </>
    )
}

export default NavbarComponent2;

const NavStyle = styled.nav`
  .header {
    background-color: rgb(181, 109, 23); /* Color de fondo actualizado */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 85px;
    padding: 5px 10%;
  }
  .header .logo {
    margin-right: auto;
    color: white;
    font-family: 'Pacifico', serif; /* Asegúrate de que la fuente esté importada correctamente */
  }
  .header .btn button,
  .header .btn-2 button {
    margin-left: 20px;
    font-weight: 700;
    color: #1b3039;
    padding: 9px 25px;
    background: #eceff1;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
  .header .btn button:hover,
  .header .btn-2 button:hover {
    background-color: #e2f1f8;
    color: #ffbc0e;
    transform: scale(1.1); /* Efecto de escalado al pasar el mouse */
  }
`;
