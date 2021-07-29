import axios from "axios";

export const GET_PAISES = "GET_PAISES";
export const SIGUIENTE = "SIGUIENTE";
export const ANTERIOR = "ANTERIOR";
export const DETALLE = "DETALLE";
export const ASCENDENTE = "ASCENDENTE";
export const DESCENDETE = "DESCENDETE";
export const BUSCAR = "BUSCAR";
export const AGREGAR = "AGREGAR";
export const VOLVER = "VOLVER";
export const FILTRAR = "FILTRAR";
export const MAS_POBLACION = "MAS_POBLACION";
export const MENOS_POBLACION = "MENOS_POBLACION";
export const TURISMO = "TURISMO";
export const TODOS = "TODOS";
export const POSITION = "POSITION";

export function getPaises() {
  return function (dispatch, getState) {
    const offset = getState().offset;
    let todos = getState().completo;
    axios
      .get(`http://localhost:3001/paises?offset=${offset}&limit=250`)
      .then((r) => {
        let array = [];
        for (let i = 0; i < 10; i++) {
          array.push(r.data[i]);
        }
        todos = r.data;
        dispatch({
          type: GET_PAISES,
          payload: {
            paises: array,
            completo: todos,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function siguiente() {
  return function (dispatch, getState) {
    let completo = getState().completo;
    let variable = getState().variable;
    let array = [];
    // let num= getState().numeros
    // let n=[]
    if (variable < 250) {
      for (let i = variable; i < variable + 10; i++) {
        array.push(completo[i]);
      }

      dispatch({
        type: SIGUIENTE,
        payload: {
          paises: array,
          variable: variable + 10,
          // num: n
        },
      });
    }
  };
}

export function anterior() {
  return function (dispatch, getState) {
    let completo = getState().completo;
    let variable = getState().variable;
    let array = [];
    if (variable > 10) {
      for (let i = variable - 20; i < variable - 10; i++) {
        array.push(completo[i]);
      }
      dispatch({
        type: SIGUIENTE,
        payload: {
          paises: array,
          variable: variable - 10,
        },
      });
    }
  };
}

export function detalle(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/paises/${id}`).then((r) => {
      dispatch({
        type: DETALLE,
        payload: r.data,
      });
    });
  };
}

export function ascendente() {
  return function (dispatch, getState) {
    let a = getState().completo;
    let variable = getState().variable;
    a = a.sort(function (o1, o2) {
      if (o1.nombre > o2.nombre) {
        return 1;
      } else if (o1.nombre < o2.nombre) {
        return -1;
      }
      return 0;
    });
    let b = [];
    for (let i = variable - 10; i < variable; i++) {
      b.push(a[i]);
    }
    dispatch({
      type: ASCENDENTE,
      payload: {
        paises: b,
        completo: a,
      },
    });
  };
}

export function descendente() {
  return function (dispatch, getState) {
    let a = getState().completo;
    let variable = getState().variable;
    a = a.sort(function (o2, o1) {
      if (o1.nombre > o2.nombre) {
        return 1;
      } else if (o1.nombre < o2.nombre) {
        return -1;
      }
      return 0;
    });
    let b = [];
    for (let i = variable - 10; i < variable; i++) {
      b.push(a[i]);
    }
    dispatch({
      type: ASCENDENTE,
      payload: {
        paises: b,
        completo: a,
      },
    });
  };
}

export function buscar(input) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/paises?name=${input}`).then((r) => {
      dispatch({
        type: BUSCAR,
        payload: r.data,
      });
    });
  };
}

export function agregar(input) {
  return function (dispatch) {
    axios.post(`http://localhost:3001/actividades`, input).then((r) => {
      dispatch({
        type: AGREGAR,
      });
    });
  };
}

export function volver() {
  return function (dispatch) {
    dispatch({
      type: VOLVER,
      payload: {
        pais: [],
        detalles: {},
        tur: [],
      },
    });
  };
}

export function continentes(arg) {
  return function (dispatch) {
    let continente = [];
    axios.get(`http://localhost:3001/paises?offset=0&limit=250`).then((r) => {
      for (let i = 0; i < r.data.length; i++) {
        if (arg === r.data[i].continente) {
          continente.push(r.data[i]);
        }
      }
      dispatch({
        type: FILTRAR,
        payload: continente,
      });
    });
  };
}

export function mas_poblacion() {
  return function (dispatch, getState) {
    let a = getState().completo;
    let variable = getState().variable;
    a = a.sort((a, b) => b.poblacion - a.poblacion);
    let array = [];
    for (let i = variable - 10; i < variable; i++) {
      array.push(a[i]);
    }
    dispatch({
      type: MAS_POBLACION,
      payload: {
        paises: array,
        completo: a,
      },
    });
  };
}

export function menos_poblacion() {
  return function (dispatch, getState) {
    let a = getState().completo;
    let variable = getState().variable;
    a = a.sort((b, a) => b.poblacion - a.poblacion);
    let array = [];
    for (let i = variable - 10; i < variable; i++) {
      array.push(a[i]);
    }
    dispatch({
      type: MENOS_POBLACION,
      payload: {
        paises: array,
        completo: a,
      },
    });
  };
}

export function turismo(arg) {
  console.log(arg);
  return function (dispatch) {
    let turismo = [];
    axios.get(`http://localhost:3001`).then((r) => {
      console.log(r);
      for (let i = 0; i < r.data.length; i++) {
        if (r.data[i].actividades.length > 0) {
          for (let j = 0; j < r.data[i].actividades.length; j++) {
            if (
              arg.toUpperCase() ===
              r.data[i].actividades[j].nombre.toUpperCase()
            )
              turismo.push(r.data[i]);
          }
        }
      }
      let tur = new Set(turismo);
      let result = [...tur];

      dispatch({
        type: TURISMO,
        payload: result,
      });
    });
  };
}

export function todos() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/paises?offset=0&limit=250`).then((r) => {
      let todos = r.data;
      dispatch({
        type: TODOS,
        payload: todos,
      });
    });
  };
}

export function location() {
  return function (dispatch) {
    navigator.geolocation.watchPosition((position) => {
      // console.log(position);
      position = position.coords;
      // console.log(position)
      // let a = position.latitude
      // console.log(a)
      dispatch({
        type: POSITION,
        payload: position,
      });
    });
  };
}
