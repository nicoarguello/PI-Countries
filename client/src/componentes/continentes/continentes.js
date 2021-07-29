import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../estilos/continentes.css";
import { detalle, volver } from "../../actions/index";

const Continente = () => {
  const dispatch = useDispatch();
  const filtro = useSelector((x) => x.filtro);
  console.log(filtro)

  return (
    <div className="con">
      <h1 className='con_titulo1' >Continentes</h1>
      <h2 className='con_titulo2'>{filtro[0] ? filtro[0].continente : '' }</h2>

      <ul className="continente">
        {filtro.map((item, index) => (
          <div key={index}  className="div_cont1"> 
            <Link to="/home/detalle">
              <img
                className="img_c"
                src={item.bandera}
                alt="No se encuentra la imagen"
                onClick={() => dispatch(detalle(item.alphaCode))}
              />        
            </Link>
            <h3>{item.nombre}</h3>
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
export default Continente;
