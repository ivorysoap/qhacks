const Sequelize = require('sequelize');

const tables = {
    "1": {
        table_name: "Customers",
        fields: {
            "Id": {
                type: Sequelize.MEDIUMINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            "timeOfVisit": {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            "gameCompleted": {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            "discountCodeGiven": {
                type: Sequelize.STRING(5)
            },
            "purchaseMade": {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        },
        associations: (models) => {
            let thisModel = models['Customers'];
            thisModel.hasOne(models['Demographics'], {as: 'demographic', foreignKey: 'customerId'});
            thisModel.hasOne(models['Visits'], {as: 'visit', foreignKey: 'customerId'});
        }
    },
    "2": {
        table_name: "Demographics",
        fields: {
            "Id": {
                type: Sequelize.MEDIUMINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            "gender": {
                type: Sequelize.ENUM,
                values: ["Male", "Female", "Unidentified"]
            },
            "age": {
                type: Sequelize.MEDIUMINT
            },
            "ethnicity": {
                type: Sequelize.ENUM,
                values: ['White', 'Black', 'Asian']
            }
        }
    },
    "3": {
        table_name: "Visits",
        fields: {
            "Id": {
                type: Sequelize.MEDIUMINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            "timeOfVisit": {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            amountSpent: {
                type: Sequelize.FLOAT
            }
        },
        associations: (models) => {
            let thisModel = models['Visits'];
            thisModel.hasMany(models['Products'], {as: 'purchases', foreignKey: 'visitId'});
            thisModel.hasOne(models['Discounts'], {as: 'discount', foreignKey: 'visitId'});
            thisModel.belongsToMany(models['Products'], {as: 'products', through: 'Purchases'});
        }
    },
    "4": {
        table_name: "Products",
        fields: {
            "Id": {
                type: Sequelize.MEDIUMINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            "name": {
                type: Sequelize.STRING
            },
            "price": {
                type: Sequelize.FLOAT
            },
            "category": {
                type: Sequelize.ENUM,
                values: ['Footwear', 'Clothes', 'Pants', 'Hats']
            }
        }
    },
    "5": {
        table_name: "Discounts",
        fields: {
            "discountCode": {
                type: Sequelize.STRING(5),
                primaryKey: true
            },
            "redeemed": {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            "discountType": {
                type: Sequelize.ENUM,
                values: ['PercentageOff', "AmountOff"]
            },
            "discountAmount": {
                type: Sequelize.FLOAT
            }
        }
    }
};

module.exports = tables;