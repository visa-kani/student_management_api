const { DataTypes } = require('sequelize');
const sequelize = require("../database.js");

const FacultyModel = sequelize.define("faculty_details", {
    id: {
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
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: { msg: 'Date of birth is required!' },
            isDate: { msg: 'Invalid date format!' },
        },
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Gender is required!' } },
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Address is required!' } },
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'City is required!' } },
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'State is required!' } },
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Pincode is required!' } },
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Country is required!' } },
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Designation is required!' } },
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Department is required!' } },
    },
    joining_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: { msg: 'Joining date is required!' },
            isDate: { msg: 'Invalid date format!' },
        },
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Qualification is required!' } },
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: 'Experience is required!' },
            isInt: { msg: 'Experience must be an integer value!' },
        },
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'Password is required!' } },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

module.exports = FacultyModel;
