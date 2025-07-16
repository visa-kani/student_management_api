const { DataTypes } = require('sequelize');
const sequelize = require("../database.js");

const AdminModel = sequelize.define("admin_details", {
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'First name is required!' } },
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Last name is required!' } },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Email is required!' },
            isEmail: { msg: 'Invalid email format!' },
        },
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Phone number is required!' } },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { notNull: { msg: 'Username is required!' } },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Password is required!' } },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Role is required!' } },
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true, // optional
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Status is required!' } },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    }
});

module.exports = AdminModel;
