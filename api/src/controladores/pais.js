const { Pais, Actividades } = require("../db");
const axios = require("axios");

const paises = axios.get(`https://restcountries.eu/rest/v2/all`);
function todosLosPaises(req, res, next) {
  paises
    .then(async (r) => {
      const datos = r.data;
      let array = [];
      for (let i = 0; i < datos.length; i++) {
        array.push({
          alphaCode: datos[i].alpha3Code,
          nombre: datos[i].name,
          bandera: datos[i].flag,
          continente: datos[i].region,
          capital: datos[i].capital,
          subregion: datos[i].subregion,
          area: datos[i].area,
          poblacion: datos[i].population,
        });
        if (array[i].capital.includes("ē"))
          array[i].capital = array[i].capital.replace("ē", "e");
        if (array[i].capital.includes("ș"))
          array[i].capital = array[i].capital.replace("ș", "s");
        if (array[i].capital.includes("ă"))
          array[i].capital = array[i].capital.replace("ă", "a");
        if (array[i].nombre.includes("Å"))
          array[i].nombre = array[i].nombre.replace("Å", "A");
      }

      for (let j = 0; j < array.length; j++) {
        await Pais.findOrCreate({
          where: {
            alphaCode: array[j].alphaCode,
            nombre: array[j].nombre,
            bandera: array[j].bandera,
            continente: array[j].continente,
            capital: array[j].capital,
            subregion: array[j].subregion,
            area: array[j].area,
            poblacion: array[j].poblacion,
          },
        });
      }

      //----------------QUERY--------------
      // let q = req.query;
      let name = req.query.name;
      let offset = parseInt(req.query.offset);
      let limit = parseInt(req.query.limit);
      const queryName = [];
      //---------------------------PAGINADO------------------
      //////////////////////////////// ascendente
      if (offset >= 0 && offset <= 250 && offset + limit <= 250) {
        for (let j = 0; j < array.length; j++) {
          if (offset === j) {
            Pais.findAll().then((r) => {
              let pBd = [];
              for (let i = j; i < j + limit; i++) {
                pBd.push({
                  alphaCode: r[i].alphaCode,
                  bandera: r[i].bandera,
                  nombre: r[i].nombre,
                  continente: r[i].continente,
                  poblacion: r[i].poblacion,
                });
              }
              return res.send(pBd);
            });
          }
        }

        /////////////////////////////////////
      } else if (!!name) {
        Pais.findAll().then((paisRes) => {
          for (let i = 0; i < paisRes.length; i++) {
            if (
              paisRes[i].nombre.includes(
                name.toLowerCase().charAt(0).toUpperCase() +
                  req.query.name.slice(1).toLowerCase()
              )
            ) {
              queryName.push({
                alphaCode: paisRes[i].alphaCode,
                bandera: paisRes[i].bandera,
                nombre: paisRes[i].nombre,
                continente: paisRes[i].continente,
                poblacion: paisRes[i].poblacion,
              });
            }
          }
          const qName = [];
          if (queryName.length > 0 && queryName.length < 10) {
            return res.send(queryName);
          } else if (queryName.length >= 10) {
            for (let i = 0; i < 10; i++) {
              qName.push(queryName[i]);
            }
            return res.send(qName);
          }
          return res
            .status(404)
            .send("<h1>ERROR 404...</h1>" + ", <h2>Pais no encontrado</h2>");
        });
        //--------------SIN QUERY-----------------
      } else {
        Pais.findAll().then((r) => {
          let pBd = [];
          for (let i = 0; i < 10; i++) {
            pBd.push({
              alphaCode: array[i].alphaCode,
              bandera: r[i].bandera,
              nombre: r[i].nombre,
              continente: r[i].continente,
              poblacion: r[i].poblacion,
            });
          }
          return res.send(pBd);
        });
      }
    })
    .catch((err) => next(err));
}
//------------------PARAMS-----------------------

async function paisPorId(req, res, next) {
  try {
    let id = req.params.id.toUpperCase();
    const pais = await Pais.findOne({
      where: {
        alphaCode:id
      }, include: Actividades,
    })
    if(pais) return res.send(pais)
    if(!pais) return res
        .status(404)
        .json({ message: "<h1>Ingrese un codigo valido...</h1>" });
    
  } catch (error) {
    next(err);
  }
}

async function tabla(req, res, next) {
  Pais.findAll({
    include: Actividades,
  }).then((r) => res.send(r));
}


function mapas(req, res, next){
  // axios.get(`https://restcountries.eu/rest/v2/all`)
  // .then(r => {

    
  // })
  console.log(navigator);
}


module.exports = {
  todosLosPaises,
  paisPorId,
  tabla,
  mapas
};
