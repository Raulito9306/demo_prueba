const db = require("../models");
const Child = db.Child;
const Op = db.Sequelize.Op;

// Crear nuevo hijo
exports.create = (req, res) => {
    // Validar request
    if (!req.body.name) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
        return;
    }

    // Crear hijo
    const child = {
        name: req.body.name,
        personId: req.body.personId
    };

    // Salvar hijo en la bd
    Child.create(child)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al crear un hijo."
            });
        });
};

//Eliminar un hijo por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Child.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Hijo eliminado correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el hijo con id=${id}. No se encontro la hijo!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error eliminando al hijo con  id=" + id
            });
        });
};