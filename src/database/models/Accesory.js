module.exports = (sequelize, dataTypes) => {
    const alias = "Accesory";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }


    const config = {
        tableName :"accesories",
        timestamps: true,
        paranoid: true,
        createdAt: false,
        updatedAt: false,
    }

    const Accesory = sequelize.define(alias, cols, config);

    return Accesory;
}