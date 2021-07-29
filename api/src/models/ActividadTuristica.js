const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("actividades", {
    alpha_code:{
      type: DataTypes.STRING,
      primariKey:true,
      // unique: true
    },
    nombre: {
      type: DataTypes.STRING,
    },
    dificultad: {
      type: DataTypes.STRING,
    },
    duracion: {
      type: DataTypes.STRING,
    },
    temporada: {
      type: DataTypes.STRING,
    },
  });
};
