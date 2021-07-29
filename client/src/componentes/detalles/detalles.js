import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../estilos/detalle.css";
import { volver } from "../../actions/index";

const Detalle = () => {
  const dispatch = useDispatch();
  const detalles = useSelector((x) => x.detallePais);
  console.log(detalles)

  return (
    <div className="detalle">
      
        <h1 className="encabezado">Detalles De Paises</h1>
        <div className="cont_">
          <div className="img_detalles">
            <img className="img_deta" src={detalles.bandera} alt="" />
          </div>
          <div className="texto">
            <h2 className="titulo">{detalles.nombre}</h2>
            <h3 className="titulo1"> {detalles.continente}</h3>
            <h4 className="detail">Codigo de Pais: {detalles.alphaCode}</h4>
            <h4 className="detail">Capital: {detalles.capital}</h4>
            <h4 className="detail">Subregión: {detalles.subregion}</h4>
            <h4 className="detail">Area: {detalles.area} Km2</h4>
            <h4 className="detail">Poblacion: {detalles.poblacion}</h4>
          </div>

          <div className="actividades">
            <h3 className="titulo2">Actividades Turisticas:</h3>
            {detalles.actividades &&
              detalles.actividades.map((item, index) => (
                <ul key={index} className="act">
                  {" "}
                  {index + 1}° Actividad:
                  <div className='listado'>
                  <p>{item.nombre}</p>
                  <p>Dificultad: {item.dificultad}</p>
                  <p>Duracion: {item.duracion} hs</p>
                  <p>Temporada: {item.temporada}</p>
                  </div>
                </ul>
              ))}
          </div>
        </div>
      <div className='boton__' >
        <Link to="/home" className="link">
          <button className="btn_h" onClick={() => dispatch(volver())}>
            {" "}
            Inico
          </button>{" "}
        </Link>
      </div>
      
    </div>
  );
};

export default Detalle;
