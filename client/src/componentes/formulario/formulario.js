import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../estilos/formulario.css";
import { agregar, todos } from "../../actions/index";
import React, { useState, useEffect } from "react";
import img from "../../imagenes/paises.jpg";
import { useForm } from "react-hook-form";

const Formulario = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todos());
  }, [dispatch]);

  const todo = useSelector((x) => x.todos);

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dificultad = [
    { value: 1, label: "Muy facil" },
    { value: 2, label: "Facil" },
    { value: 3, label: "Moderado" },
    { value: 4, label: "Dificil" },
    { value: 5, label: "Muy dificil" },
  ];
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

  const temporada = [
    { value: 1, label: "Primavera" },
    { value: 2, label: "Verano" },
    { value: 3, label: "Otoño" },
    { value: 4, label: "Invierno" },
  ];

  const horas = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
    { value: 13, label: "13" },
    { value: 14, label: "14" },
    { value: 15, label: "15" },
    { value: 16, label: "16" },
    { value: 17, label: "17" },
    { value: 18, label: "18" },
    { value: 19, label: "19" },
    { value: 20, label: "20" },
    { value: 21, label: "21" },
    { value: 22, label: "22" },
    { value: 23, label: "23" },
  ];
  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value, name);
  };

  const [input, setInput] = useState({
    alphaCode: "",
    nombre: [],
    actividad: "",
    dificultad: "",
    duracion: "",
    temporada: "",
  });

  function submit(data, e) {
    const alphaCode = [];
    const nombre = [];

    console.log(data);
    setInput({
      ...input,
      alphaCode: alphaCode,
      nombre: nombre,
      actividad: data.actividad,
      dificultad: data.dificultad,
      duracion: data.duracion,
      temporada: data.temporada,
    });

    dispatch(agregar(data));
    e.target.reset();
    reset({ data });
  }

  return (
    <div className="contenedor_f" img={img} src={img}>
      <form
        className="formulario"
        onChange={(e) => ChangeInput(e)}
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="f_titulo">Agrega una Actividad</h1>
        <ul>
          <h4 className="titulo_form">Pais</h4>
          <select
            className="f_input"
            name="alpha_code"
            onChange={(e) => ChangeInput(e)}
            {...register("alpha_code", {
              required: {
                value: true,
                message: "Debe seleccionar un pais ",
              },
            })}
          >
            {" "}
            <option></option>
            {todo.map((x, index) => (
              <option key={index} value={x.alphaCode}>
                {x.nombre}
              </option>
            ))}
          </select>
          <span className="err">{errors?.alpha_code?.message}</span>

          <h4 className="titulo_form">Actividad</h4>
          <select
            className="f_input"
            name="actividad"
            onChange={(e) => ChangeInput(e)}
            {...register("actividad", {
              required: {
                value: true,
                message: "Debe seleccionar una actividad",
              },
            })}
          >
            {" "}
            <option></option>
            {actividad.map((x, index) => (
              <option key={index} value={x.label}>
                {x.label}
              </option>
            ))}
          </select>
          <span className="err">{errors?.actividad?.message}</span>

          <h4 className="titulo_form">Dificultad</h4>
          <select
            className="f_input"
            name="dificultad"
            onChange={(e) => ChangeInput(e)}
            {...register("dificultad", {
              required: {
                value: true,
                message: "Debe seleccionar una dificultad ",
              },
            })}
          >
            {" "}
            <option></option>
            {dificultad.map((x, index) => (
              <option key={index} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
          <span className="err">{errors?.dificultad?.message}</span>

          <h4 className="titulo_form">Duracion en horas</h4>
          <select
            className="f_input"
            autoComplete="off"
            type="text"
            name="duracion"
            {...register("duracion", {
              required: {
                value: true,
                message: "Debe seleccionar una duracion en horas ",
              },
            })}
          >
            {" "}
            <option></option>
            {horas.map((x, index) => (
              <option key={index} value={x.value}>
                {x.label}
              </option>
            ))}
          </select>
          <span className="err">{errors?.duracion?.message}</span>

          <h4 className="titulo_form">Temporada</h4>
          <div className="temporada">
            {temporada.map((x, item) => (
              <span className="estaciones" key={item} value={x.value}>
                {x.label}{" "}
                <input
                  key={item}
                  autoComplete="off"
                  type="radio"
                  onChange={(e) => ChangeInput(e)}
                  placeholder="Temporada..."
                  name="temporada"
                  value={x.label}
                  {...register("temporada", {
                    required: {
                      value: true,
                      message: "Debe seleccionar una temporada",
                    },
                  })}
                />{" "}
              </span>
            ))}
          </div>
          <span className="err">{errors?.temporada?.message}</span>

          <button className="f_buscar" type="submit">
            Guardar
          </button>
        </ul>
      </form>
      <Link to="/home">
        <button className="f_link"> Pag Principal </button>{" "}
      </Link>
    </div>
  );
};

export default Formulario;
