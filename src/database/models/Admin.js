module.exports = (sequelize, dataTypes) => {
    const alias = "Admin";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }


    const config = {
        tableName :"admins",
        timestamps: true,
        paranoid: true,
        createdAt: false,
        updatedAt: false,
    }

    const Admin = sequelize.define(alias, cols, config);

    return Admin;
}