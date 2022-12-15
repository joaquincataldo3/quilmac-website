module.exports = (sequelize, dataTypes) => {
    const alias = "DeviceRam";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        device_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "Device",
                key: "id"
            },
            allowNull: false
        },
        device_type_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "DeviceType",
                key: "id"
            },
            allowNull: false
        },
        ram_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "Ram",
                key: "id"
            },
            allowNull: false
        }
    }

    const config = {
        tableName :"device_ram",
        timestamps: false
    }

    const DeviceRam = sequelize.define(alias, cols, config);

    return DeviceRam;
}