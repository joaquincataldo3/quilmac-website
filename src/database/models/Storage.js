module.exports = (sequelize, dataTypes) => {
    const alias = "Storage";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        storage: {
            type: dataTypes.INTEGER,
            allowNull: false
    }
    }
    const config = {
        tableName :"storages",
        timestamps: false,
        paranoid: true,
    }

    const Storage = sequelize.define(alias, cols, config);

    Storage.associate = (models) => {
           Storage.belongsToMany(models.Device, {
                as: "devices",
                through: "device_storage",
                foreignKey: "storage_id",
                otherKey: "device_id",
                timestamps: true
            }) 

            Storage.belongsToMany(models.Device, {
                as: "device_types",
                through: "device_storage",
                foreignKey: "storage_id",
                otherKey: "device_type_id",
                timestamps: true
            }) 

    }

    return Storage;
}