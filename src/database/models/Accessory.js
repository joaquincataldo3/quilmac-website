module.exports = (sequelize, dataTypes) => {
    const alias = "Accessory";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessory: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
        },
        accessory_type_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "AccessoryType",
                key: "id"
            },
            allowNull: false
        }
    }


    const config = {
        tableName: "accessories",
        timestamps: true,
        paranoid: true,
        createdAt: false,
        updatedAt: false,
    }

    const Accessory = sequelize.define(alias, cols, config);

    Accessory.associate = (models) => {

        Accessory.belongsTo(models.Accessory, {
            as: "types",
            foreignKey: "accessory_type_id"
        })

        Accessory.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "brand_id"
        })

    }

    return Accessory;
}