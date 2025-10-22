module.exports = (sequelize, dataTypes) => {
    const alias = "AccessoryImage";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        public_id: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        accessory_id: {
            type: dataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: "Accessory",
                key: "id"
            },
            allowNull: false
        },
    }

    const config = {
        tableName :"accessory_images",
        timestamps: false,
        paranoid: true
    }

    const AccessoryImage = sequelize.define(alias, cols, config);

    AccessoryImage.associate = (models) => {
        
        AccessoryImage.belongsTo(models.Accessory, {
            as: "accessories",
            foreignKey: "accessory_id",
            timestamps: false
        })

    }

    return AccessoryImage;
}