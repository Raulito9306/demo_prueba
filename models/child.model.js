module.exports = (sequelize, Sequelize) => {
    const Child = sequelize.define("child", {
        name: {
            type: Sequelize.STRING,
            validate: { len: [20, 150] },
            allowNull: false
        }
    });

    return Child;
};