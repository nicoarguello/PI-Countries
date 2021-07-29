import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../estilos/buscar.css";
import { detalle, volver } from "../../actions/index";
const Detalle = () => {
  const dispatch = useDispatch();
  const pais = useSelector((x) => x.pais);

  return (
    <div className="inicio11">
      <h1 className='buscar_titulo'>Resultado de Busqueda</h1>
      {pais.length === 0 && (
        <h1 className="error">No hemos encontrado tu pais</h1>
      )}
      
      <ul className="continente" >
        {pais.map((item, index) => (
          <div className='cont_buscar' key={index}>
            <Link to="/home/detalle">
              <img
                className="img_buscar"
                src={item.bandera}
                alt="No se encuentra la imagen"
                onClick={() => dispatch(detalle(item.alphaCode))}
              />
            </Link>
            <h2>{item.nombre}</h2>
            <h3>{item.continente}</h3>
          </div>
        ))}
      </ul>
      
      <Link to="/home" className="link">
        <button className="btn_h" onClick={() => dispatch(volver())}>
          {" "}
          Volver
        </button>
      </Link>
    </div>
  );
};
export default Detalle;
