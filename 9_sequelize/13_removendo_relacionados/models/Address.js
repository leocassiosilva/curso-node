const {DataTypes} = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const Address = db.define('Address', {
    street: {
        type: DataTypes.STRING,
        require: true
    },
    number: {
        type: DataTypes.STRING,
        require: true
    },
    city: {
        type: DataTypes.STRING,
        require: true
    }
});

/* Um usuario pode ter muitos endereços */
User.hasMany(Address);

/* Um endereço pertence a um usuario */
Address.belongsTo(User);

module.exports = Address;