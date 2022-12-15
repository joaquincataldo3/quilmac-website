module.exports = (sequelize, dataTypes) => {
    const alias = "DeviceColor";

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
        color_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "Color",
                key: "id"
            },
            allowNull: false
        }
    }

    const config = {
        tableName :"device_color",
        timestamps: false
    }

    const DeviceColor = sequelize.define(alias, cols, config);

    return DeviceColor;
}