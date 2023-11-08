import React from "react";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export default function Home() {
  return (
    <div>
      <GlobalStyle />
      <HomeStyle>
        <h1 className="text-center"><b>Top Education</b></h1>
        <div className="box-area">

          <div className="single-box">
            <a href="/lista-empleados">
              <div className="img-area" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/1977/1977768.png')" }}></div>
            </a>
            <div className="img-text">
              <span className="header-text"><strong>Ver Estudiantes</strong></span>
            </div>
          </div>

          <div className="single-box">
            <a href="/subir-archivo">
              <div className="img-area" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/6133/6133923.png')" }}></div>
            </a>
            <div className="img-text">
              <span className="header-text"><strong>Cargar DATA.txt</strong></span>
            </div>
          </div>

          <div className="single-box">
            <a href="/justificativo">
              <div className="img-area" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/3681/3681447.png')" }}></div>
            </a>
            <div className="img-text">
              <span className="header-text"><strong>Pagar Arancel</strong></span>
            </div>
          </div>
          
          <div className="single-box">
            <a href="/planilla-sueldos">
              <div className="img-area" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/128/1321/1321938.png')" }}></div>
            </a>
            <div className="img-text">
              <span className="header-text"><strong>Ver Resúmen</strong></span>
            </div>
          </div>
          
        </div>
      </HomeStyle>
    </div>
  );
}

// Aquí se mantiene el resto de tu código de estilos y componentes.


const GlobalStyle = createGlobalStyle`
body {
  background: #e6dcd2;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
`

const HomeStyle = styled.div`
.text-center {
  text-align: center;
  justify-content: center;
  padding-top: 8px;
  color: #fff;
}

.box-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.single-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1000px;
  height: auto;
  border-radius: 4px;
  background-color: #ffffff;
  text-align: center;
  margin: 20px;
  padding: 20px;
  transition: .3s;
}

.img-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border: 6px solid #e3af7a;
  border-radius: 50%;
  padding: 20px;
  background-size: cover;
  background-position: center center;
}

.header-text {
  font-size: 24px;
  font-weight: 500;
  line-height: 48px;
}

.img-text p {
  font-size: 15px;
  font-weight: 400;
  line-height: 30px;
}

.single-box:hover {
  background: #dfcab5;
  color: #000000;
}

// Estilos para las imágenes
.img-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border: 6px solid #e3af7a;
  border-radius: 50%;
  padding: 20px;
  background-size: cover;
  background-position: center center;
  background-image: url('https://cdn-icons-png.flaticon.com/128/1977/1977768.png'); 
}

`
