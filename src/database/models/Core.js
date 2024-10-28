module.exports = (sequelize, dataTypes) => {
    const alias = "Core";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        core: {
            type: dataTypes.INTEGER,
            allowNull: false
    }
    }
    const config = {
        tableName :"cores",
        timestamps: false,
        paranoid: true
    }

    const Core = sequelize.define(alias, cols, config);

    Core.associate = (models) => {
            Core.belongsToMany(models.Device, {
                as: "devices",
                through: "device_core",
                foreignKey: "core_id",
                otherKey: "device_id",
                timestamps: false
            }) 

            Core.belongsToMany(models.DeviceType, {
                as: "device_types",
                through: "device_color",
                foreignKey: "core_id",
                otherKey: "device_type_id",
                timestamps: false
            })
    }

    return Core;
}