import {
  GET_PAISES,
  SIGUIENTE,
  ANTERIOR,
  DETALLE,
  ASCENDENTE,
  DESCENDETE,
  BUSCAR,
  VOLVER,
  FILTRAR,
  MAS_POBLACION,
  MENOS_POBLACION,
  TODOS,
  TURISMO,
  POSITION,
} from "actions/index";

const estado_inicial = {
  paises: [],
  offset: 0,
  detallePais: {},
  pais: [],
  filtro: [],
  todos: [],
  turismo: [],
  completo: [],
  variable: 10,
  numeros: [2, 3, 4, 5, 6, 7, 8, 9],
  position: [],
};

function rootReducer(state = estado_inicial, action) {
  switch (action.type) {
    case GET_PAISES:
      return {
        ...state,
        paises: action.payload.paises,
        completo: action.payload.completo,
      };
    case SIGUIENTE:
      return {
        ...state,
        paises: action.payload.paises,
        variable: action.payload.variable,
        // numeros: action.payload.num
      };
    case ANTERIOR:
      return {
        ...state,
        paises: action.payload.paises,
        variable: action.payload.variable,
      };
    case DETALLE:
      return {
        ...state,
        detallePais: action.payload,
      };
    case ASCENDENTE:
      return {
        ...state,
        paises: action.payload.paises,
        completo: action.payload.completo,
      };
    case DESCENDETE:
      return {
        ...state,
        paises: action.payload.paises,
        completo: action.payload.completo,
      };
    case BUSCAR:
      return {
        ...state,
        pais: action.payload,
      };
    case VOLVER:
      return {
        ...state,
        pais: action.payload.pais,
        detallePais: action.payload.detalles,
        turismo: action.payload.tur,
        filtro: action.payload.tur
      };
    case FILTRAR:
      return {
        ...state,
        filtro: action.payload,
      };
    case MAS_POBLACION:
      return {
        ...state,
        paises: action.payload.paises,
        completo: action.payload.completo,
      };
    case MENOS_POBLACION:
      return {
        ...state,
        paises: action.payload.paises,
        completo: action.payload.completo,
      };
    case TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case TURISMO:
      return {
        ...state,
        turismo: action.payload,
      };
    case POSITION:
      return {
        ...state,
        position: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
