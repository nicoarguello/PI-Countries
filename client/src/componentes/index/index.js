import React from "react";
import { Link } from "react-router-dom";
import "../../estilos/inicio.css";


const Inicio = () => {
  return (
    <div className="inicio">

      <h1 className='titulo_inicio'>Bienvenido a la App de Paises</h1>
      <div className='fondo_animado'></div>

      <Link className="entrar" to="/home"> <button className='btn_i'>ENTRAR</button>
        
      </Link>
    </div>
  );
};

export default Inicio;
