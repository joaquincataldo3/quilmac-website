module.exports = (sequelize, dataTypes) => {
    const alias = "Device";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        model: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        screen: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        technical_detail: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: false
        }
    }

    const config = {
        tableName :"devices",
        timestamps: false,
        paranoid: true
    }

    const Device = sequelize.define(alias, cols, config);

    Device.associate = (models) => {
            Device.hasMany(models.Image, {
                as: "images",
                foreignKey: "device_id"
            })

            Device.belongsTo(models.DeviceType, {
                as: "device_types",
                foreignKey: "device_type_id"
            })

            Device.belongsToMany(models.Color, {
                as: "colors",
                through: "device_color",
                foreignKey: "device_id",
                otherKey: "color_id",
                timestamps: false
            })

            Device.belongsToMany(models.Ram, {
                as: "rams",
                through: "device_ram",
                foreignKey: "device_id",
                otherKey: "ram_id",
                timestamps: false
            })

            Device.belongsToMany(models.Ssd, {
                as: "ssds",
                through: "device_ssd",
                foreignKey: "device_id",
                otherKey: "ssd_id",
                timestamps: false
            })

            Device.belongsToMany(models.Core, {
                as: "cores",
                through: "device_core",
                foreignKey: "device_id",
                otherKey: "core_id",
                timestamps: false
            })

            Device.belongsToMany(models.Storage, {
                as: "storages",
                through: "device_storage",
                foreignKey: "device_id",
                otherKey: "storage_id",
                timestamps: false
            })
            


    }

    return Device;
}