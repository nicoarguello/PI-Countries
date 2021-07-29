const { Router } = require("express");

const { actividad } = require("../controladores/actividadTuristica");

const router = Router();

router.post("/actividades", actividad);

module.exports = router;
