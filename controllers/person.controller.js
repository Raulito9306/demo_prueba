const db = require("../models");
const Person = db.Person;
const Child = db.child;
const Op = db.Sequelize.Op;

// Crear y salvar nueva persona
exports.create = (req, res) => {
    // Validar request
    if (!req.body.name || !req.body.gender) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
        return;
    }

    // Crear persona
    const person = {
        name: req.body.name,
        lastname: req.body.lastname,
        gender: req.body.gender,
        age: req.body.age,
        married: req.body.married ? req.body.married : false
    };

    // Salvar persona en la bd
    Person.create(person)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al crear la persona."
            });
        });
};

//Actualizar datos de una persona por id
exports.update = (req, res) => {
    const id = req.params.id;

    Person.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Datos actulizados correctamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar los datos de la persona con id=${id}. No se encontro la persona o req.body esta vacio!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando la persona con id=" + id
            });
        });
};

//Eliminar datos de una persona por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Person.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Persona eliminada correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la persona con id=${id}. No se encontro la persona!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error eliminando la persona con  id=" + id
            });
        });
};

// Obtiene una persona con sus hijos.
exports.findOnePerson = (req, res) => {
    const id = req.params.id;
    Person.findByPk(id, {
            include: "children"
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error buscando la persona."
            });
        });
};

// Obtiene todas las personas con la cantidad de hijos.
exports.findAllCountChildren = (req, res) => {
    Person.findAll({
            attributes: {
                include: [
                    [
                        db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM children AS hijos
                    WHERE
                        hijos.personId = Person.id
                )`),
                        "cantidadHijos"
                    ]
                ]
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error buscando las personas."
            });
        });
};