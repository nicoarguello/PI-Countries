import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaises,
  siguiente,
  anterior,
  detalle,
  ascendente,
  descendente,
  buscar,
  continentes,
  mas_poblacion,
  menos_poblacion,
  turismo,
} from "actions/index";
import { Link, useHistory } from "react-router-dom";
import "estilos/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let paises = useSelector((x) => x.paises);

  let input = "";

  const actividad = [
    { value: 1, label: "Pesca" },
    { value: 2, label: "Caza" },
    { value: 3, label: "Trekking" },
    { value: 4, label: "Rapel" },
    { value: 5, label: "Rafting" },
    { value: 6, label: "Visita Museos" },
    { value: 7, label: "Visita Viñedos " },
    { value: 8, label: "Surf" },
    { value: 9, label: "Esquí" },
    { value: 10, label: "Esquí Acuatico" },
  ];

  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);

  function handleInput(e) {
    input = e.target.value;
  }

  function handleDispatch(e) {
    e.preventDefault();
    if (input) {
      dispatch(buscar(input));
      return history.push("./home/busqueda");
    }
    return alert("Debe ingresar un Pais");
  }

  let state = { value: "" };
  let estado = { value: "" };

  function handleChange(e) {
    state.value = e.target.value;
    dispatch(continentes(state.value));
    return history.push("./home/continentes");
  }
  function handleChange1(e) {
    estado.value = e.target.value;
    dispatch(turismo(estado.value));
    return history.push("./home/turismo");
  }

  return (
    <div className="contenedor_h">
      <div className="contenedor_opciones">
        <div className="div-b">
          <button onClick={() => dispatch(ascendente())} className="boton_h1">
            {" "}
            Ordenar A-Z
          </button>
          <button onClick={() => dispatch(descendente())} className="boton_h1">
            {" "}
            Ordenar Z-A
          </button>
          <button
            onClick={() => dispatch(mas_poblacion())}
            className="boton_h1"
          >
            {" "}
            Mayor Población
          </button>
          <button
            onClick={() => dispatch(menos_poblacion())}
            className="boton_h1"
          >
            {" "}
            Menor Población
          </button>
          <select className="boton_h1" id="" onChange={handleChange}>
            <option value="">Filtrar por Continente</option>
            <option value="Africa">Africa</option>
            <option value="Americas">america</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Polar">Polar</option>
          </select>

          <select className="boton_h1" id="" onChange={handleChange1}>
            <option value="">Actividad Turistica</option>
            {actividad.map((item, index) => (
              <option key={index} value={item.label}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="busqueda">
        <form className="form_h" onSubmit={handleDispatch}>
          <input
            className="buscar_h"
            autoComplete="off"
            type="text"
            placeholder="Ingrese un Pais..."
            name="pais"
            onChange={handleInput}
          />
          <button className="busca_h" type="submit">
            Buscar
          </button>
        </form>

        <Link to="/home/formulario" className="agrega_h">
          <button className="agrega_b"> Agregar Actividades</button>{" "}
        </Link>
      </div>

      <ul className="paises_h">
        {paises.map((item, index) => (
          <div key={index} className="bloque_paises">
            <Link to="/home/detalle">
              <img
                className="img_h"
                src={item.bandera}
                alt="No se encuentra la imagen"
                onClick={() => dispatch(detalle(item.alphaCode))}
              />
            </Link>
            <h3>{item.nombre}</h3>
            <h4>{item.continente}</h4>
          </div>
        ))}
      </ul>
      <div className="div_btn">
        <button onClick={() => dispatch(anterior())} className="btn_h">
          {" "}
          Atras
        </button>

        <button onClick={() => dispatch(siguiente())} className="btn_h">
          {" "}
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
