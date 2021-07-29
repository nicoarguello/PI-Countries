const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const paisRuta = require("./pais");
const actividad = require("./actividadTuristica");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", paisRuta);
router.use("/", actividad);

module.exports = router;
