module.exports = (sequelize, dataTypes) => {
    const alias = "DeviceType";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        apple_product: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    const config = {
        tableName :"device_types",
        timestamps: false
    }

    const DeviceType = sequelize.define(alias, cols, config);

    DeviceType.associate = (models) => {
        DeviceType.hasMany(models.Image, {
            as: "images",
            foreignKey: "device_type_id"
        })

        DeviceType.hasMany(models.Device, {
            as: "devices",
            foreignKey: "device_type_id"
        })

        DeviceType.belongsToMany(models.Color, {
            as: "colors",
            through: "device_color",
            foreignKey: "device_type_id",
            otherKey: "color_id",
            timestamps: true
        })

        DeviceType.belongsToMany(models.Ram, {
            as: "rams",
            through: "device_ram",
            foreignKey: "device_type_id",
            otherKey: "ram_id",
            timestamps: true
        })

        DeviceType.belongsToMany(models.Ssd, {
            as: "ssds",
            through: "device_ssd",
            foreignKey: "device_type_id",
            otherKey: "ssd_id",
            timestamps: true
        })

        DeviceType.belongsToMany(models.Core, {
            as: "cores",
            through: "device_core",
            foreignKey: "device_type_id",
            otherKey: "core_id",
            timestamps: true
        })

        DeviceType.belongsToMany(models.Storage, {
            as: "storages",
            through: "device_storage",
            foreignKey: "device_type_id",
            otherKey: "storage_id",
            timestamps: true
        })
        
    }

    return DeviceType;
}