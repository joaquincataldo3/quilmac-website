module.exports = (sequelize, dataTypes) => {
    const alias = "Image";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        public_id: {
            type: dataTypes.STRING(255),
            allowNull: false
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
            references: {
                model: "DeviceType",
                key: "id"
            },
            foreignKey: true,
            allowNull: false
        }
    }

    const config = {
        tableName :"images",
        timestamps: false,
        paranoid: true
    }

    const Image = sequelize.define(alias, cols, config);

    Image.associate = (models) => {
        Image.belongsTo(models.Device, {
            as: "devices",
            foreignKey: "device_id",
            timestamps: false
        })

        Image.belongsTo(models.DeviceType, {
            as: "devices_types",
            foreignKey: "device_id",
            timestamps: false
        })

        /* Image.belongsTo(models.Color, {
            as: "color",
            foreignKey: "color_id"
        }) */

    }

    return Image;
}