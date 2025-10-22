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
        price: {
            type: dataTypes.INTEGER,
        },
        brand_id: {
            type: dataTypes.STRING(100)
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
        timestamps: false,
        paranoid: true,
    }

    const Accessory = sequelize.define(alias, cols, config);

    Accessory.associate = (models) => {
        
        Accessory.hasMany(models.AccessoryImage, {
               as: "accessory_images",
               foreignKey: "accessory_id"
           })

        Accessory.belongsTo(models.Accessory, {
            as: "types",
            foreignKey: "accessory_type_id",
            timestamps: false
        })

        Accessory.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "brand_id",
            timestamps: false
        })

    }

    return Accessory;
}