import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../estilos/turismo.css";
import { detalle, volver } from "../../actions/index";

const Turismo = () => {
  const dispatch = useDispatch();
  const actividad = useSelector((x) => x.turismo);

  return (
    <div className="tur">
      <h1 className='tur_titulo1'>Actividades Turisticas</h1>

      <h2 className='tur_titulo2'>{actividad[0] ? actividad[0].actividades[0].nombre : 'No hay paises con esa actividad' }</h2>

      <ul className="detalle1">
        {actividad.map((item, index) => (
          <div key={index} className="div_cont">
            <Link to="/home/detalle">
              <img
                className="img_t"
                src={item.bandera}
                alt="No se encuentra la imagen"
                onClick={() => dispatch(detalle(item.alphaCode))}
              />
            </Link>
            <h2 className='nombre'>{item.nombre}</h2>
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
export default Turismo;
