module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
        name: {
            type: Sequelize.STRING,
            validate: { len: [20, 150] },
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            validate: { max: 150 }
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [
                    ["Male", "Famale", "Others"] ////validacion para que solo admita estos valores
                ]
            }
        },
        married: {
            type: Sequelize.BOOLEAN
        },
        age: {
            type: Sequelize.INTEGER
        }
    });

    return Person;
};