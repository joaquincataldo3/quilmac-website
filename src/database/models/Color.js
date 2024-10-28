module.exports = (sequelize, dataTypes) => {
    const alias = "Color";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        HEX: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    }
    const config = {
        tableName: "colors",
        timestamps: false,
        paranoid: true,
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = (models) => {
        Color.belongsToMany(models.Device, {
            as: "devices",
            through: "device_color",
            foreignKey: "color_id",
            otherKey: "device_id",
            timestamps: true
        })
        

        Color.belongsToMany(models.DeviceType, {
            as: "device_types",
            through: "device_color",
            foreignKey: "color_id",
            otherKey: "device_type_id",
            timestamps: true
        })

    }

    return Color;
}