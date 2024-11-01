module.exports = (sequelize, dataTypes) => {
    const alias = "Ram";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ram: {
            type: dataTypes.INTEGER,
            allowNull: false
    }
    }
    const config = {
        tableName :"rams",
        timestamps: false,
        paranoid: true
    }

    const Ram = sequelize.define(alias, cols, config);

    Ram.associate = (models) => {
            Ram.belongsToMany(models.Device, {
                as: "devices",
                through: "device_ram",
                foreignKey: "ram_id",
                otherKey: "device_id",
                timestamps: false
            }) 

            Ram.belongsToMany(models.DeviceType, {
                as: "device_types",
                through: "device_ram",
                foreignKey: "ram_id",
                otherKey: "device_type_id",
                timestamps: false
            })

    }

    return Ram;
}