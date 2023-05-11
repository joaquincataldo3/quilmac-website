module.exports = (sequelize, dataTypes) => {
    const alias = "Brand";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand: {
            type: dataTypes.STRING(255),
            allowNull: false
        }
    }


    const config = {
        tableName: "brands",
        timestamps: true,
        paranoid: true,
        createdAt: false,
        updatedAt: false,
    }

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = (models) => {

        Brand.hasMany(models.Accessory, {
            as: "accessories",
            foreignKey: "brand_id"
        })

    }

    return Brand;
}