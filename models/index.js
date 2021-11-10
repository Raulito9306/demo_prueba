const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Person = require("./person.model.js")(sequelize, Sequelize);
db.Child = require("./child.model.js")(sequelize, Sequelize);

//Relacion de uno a muchos entre Person y Child
db.Person.hasMany(db.Child, {
    foreignKey: {
        allowNull: false
    }
});
db.Child.belongsTo(db.Person);

module.exports = db;