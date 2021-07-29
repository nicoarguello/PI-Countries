const { Actividades, Pais } = require("../db");

async function actividad(req, res, next) {
  try {
    const { alpha_code, actividad, dificultad, duracion, temporada } = req.body;

    let actividades = await Actividades.findOrCreate({
      where: {
        alpha_code: alpha_code,
        nombre: actividad,
        dificultad,
        duracion,
        temporada,
      },
    });

    let pais = await Pais.findAll({
      where: {
        alphaCode: alpha_code,
      },
    });

    let i = await pais[0].addActividades(actividades[0]);
    res.send(i)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  actividad,
};
