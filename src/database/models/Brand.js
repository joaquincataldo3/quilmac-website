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
        timestamps: false,
        paranoid: true
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