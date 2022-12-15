module.exports = (sequelize, dataTypes) => {
    const alias = "DeviceSsd";

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
        ssd_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "Ssd",
                key: "id"
            },
            allowNull: false
        }
    }

    const config = {
        tableName :"device_ssd",
        timestamps: false
    }

    const DeviceSsd = sequelize.define(alias, cols, config);

    return DeviceSsd;
}