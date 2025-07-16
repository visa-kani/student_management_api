const { DataTypes } = require('sequelize');
const sequelize = require("../database.js");

const StudentModel = sequelize.define("student_details", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'First name is required!' },
            notEmpty: { msg: 'First name should not be empty!' }
        },
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Last name is required!' },
            notEmpty: { msg: 'Last name should not be empty!' }
        },
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: { msg: 'Date of birth is required!' },
            notEmpty: { msg: 'Date of birth should not be empty!' },
            isDate: { msg: 'Invalid date format!' },
        },
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Gender is required!' },
            notEmpty: { msg: 'Gender should not be empty!' }
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Email is required!' },
            notEmpty: { msg: 'Email should not be empty!' },
            isEmail: { msg: 'Invalid email format!' },
        },
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Phone number is required!' },
            notEmpty: { msg: 'Phone number should not be empty!' }
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Address is required!' },
            notEmpty: { msg: 'Address should not be empty!' }
        },
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'City is required!' },
            notEmpty: { msg: 'City should not be empty!' }
        },
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'State is required!' },
            notEmpty: { msg: 'State should not be empty!' }
        },
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Pincode is required!' },
            notEmpty: { msg: 'Pincode should not be empty!' }
        },
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Country is required!' },
            notEmpty: { msg: 'Country should not be empty!' }
        },
    },
    enrollment_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Enrollment number is required!' },
            notEmpty: { msg: 'Enrollment number should not be empty!' }
        },
    },
    admission_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notNull: { msg: 'Admission date is required!' },
            notEmpty: { msg: 'Admission date should not be empty!' },
            isDate: { msg: 'Invalid date format!' },
        },
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true, // optional, change to false if mandatory
    },
    course: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Course is required!' },
            notEmpty: { msg: 'Course should not be empty!' }
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Status is required!' },
            notEmpty: { msg: 'Status should not be empty!' }
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    }
});

module.exports = StudentModel;
