var express = require("express");
var router = express.Router();

const auth = require("../controllers/auth.controller.js");

//Metodo para autenticarse
router.post("/login", auth.login);

module.exports = router;