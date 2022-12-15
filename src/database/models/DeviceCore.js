module.exports = (sequelize, dataTypes) => {
    const alias = "DeviceCore";

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
        core_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "Core",
                key: "id"
            },
            allowNull: false
        }
    }

    const config = {
        tableName :"device_core",
        timestamps: false
    }

    const DeviceCore = sequelize.define(alias, cols, config);

    return DeviceCore;
}