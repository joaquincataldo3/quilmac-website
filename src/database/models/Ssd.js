module.exports = (sequelize, dataTypes) => {
    const alias = "Ssd";

    const cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ssd: {
            type: dataTypes.INTEGER,
            allowNull: false
    }
    }
    const config = {
        tableName :"ssds",
        timestamps: false,
        paranoid: true,
    }

    const Ssd = sequelize.define(alias, cols, config);

    Ssd.associate = (models) => {
            Ssd.belongsToMany(models.Device, {
                as: "devices",
                through: "device_ssd",
                foreignKey: "ssd_id",
                otherKey: "device_id",
                timestamps: false
            }) 

            Ssd.belongsToMany(models.DeviceType, {
                as: "device_types",
                through: "device_ssd",
                foreignKey: "ssd_id",
                otherKey: "device_type_id",
                timestamps: false
            }) 

    }

    return Ssd;
}