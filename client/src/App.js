import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./componentes/home/home";
import Inicio from "./componentes/index/index";
import Detalle from "./componentes/detalles/detalles";
import Formulario from "./componentes/formulario/formulario";
import Busqueda from "./componentes/busqueda/busqueda.js";
import Continente from "./componentes/continentes/continentes.js"
import Turismo from "./componentes/turismo/turismo.js"
import Position from './componentes/position/position.js'

const App = () => {
  return (
    <React.Fragment>
      <Route path="/" exact component={Inicio} />
      <Route path="/home" exact component={Home} />
      <Route path="/home/busqueda" component={Busqueda} />
      <Route path="/home/detalle" component={Detalle} />
      <Route path="/home/formulario" component={Formulario} />
      <Route path="/home/continentes" component={Continente}/>
      <Route path='/home/turismo' component={Turismo}/>
      <Route path='/position' component={Position}/>

    </React.Fragment>
  );
};

export default App;
