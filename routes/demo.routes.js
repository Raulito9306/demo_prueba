var express = require("express");
var router = express.Router();

const person = require("../controllers/person.controller.js");
const child = require("../controllers/child.controller.js");
const auth = require("../controllers/auth.controller.js");

// Crear nueva persona
router.post("/person", person.create);

// Editar persona por id
router.put("/person:id", person.update);

// Eliminar persona por id
router.delete("/person:id", person.delete);

// Crear nuevo hijo
router.post("/child", child.create);

// Eliminar hijo por id
router.delete("/child:id", child.delete);

// Obtiene una persona con la informacion de los hijos
router.get("/person:id", person.findOnePerson);

// Obtiene todas las personas con la cantidad de hijos
router.get("/personall/countchildren", person.findAllCountChildren);

module.exports = router;