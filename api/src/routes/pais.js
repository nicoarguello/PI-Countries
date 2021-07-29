const { Router } = require("express");

const { todosLosPaises, paisPorId, tabla, mapas} = require("../controladores/pais");
// const { paisesFiltrados } = require("../controladores/paginado");

const router = Router();

router.get("/paises", todosLosPaises);
router.get("/paises/:id", paisPorId);
router.get("/", tabla);
router.get('/map', mapas);

module.exports = router;
