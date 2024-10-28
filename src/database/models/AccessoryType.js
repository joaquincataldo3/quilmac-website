module.exports = (sequelize, dataTypes) => {
    const alias = "AccessoryType";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }

    const config = {
        tableName: "accessory_types",
        timestamps: false,
        paranoid: true
    }

    const AccessoryType = sequelize.define(alias, cols, config);

    AccessoryType.associate = (models) => {

        AccessoryType.hasMany(models.Accessory, {
            as: "accessories",
            foreignKey: "accessory_type_id"
        })

    }

    return AccessoryType;
}