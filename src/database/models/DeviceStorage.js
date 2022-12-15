module.exports = (sequelize, dataTypes) => {
    const alias = "DeviceStorage";

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
        storage_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "Storage",
                key: "id"
            },
            allowNull: false
        }
    }

    const config = {
        tableName :"device_storage",
        timestamps: false
    }

    const DeviceStorage = sequelize.define(alias, cols, config);

    return DeviceStorage;
}