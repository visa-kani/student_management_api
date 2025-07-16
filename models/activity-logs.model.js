const { DataTypes } = require('sequelize');
const sequelize = require("../database.js");

const ActivitiesModel = sequelize.define("activity_logs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userDetails: {
    type: DataTypes.JSON, // supports any object data
    allowNull: true
  },
  currentData: {
    type: DataTypes.JSON,
    allowNull: true
  },
  previousData: {
    type: DataTypes.JSON,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notNull: { msg: 'Type is required!' } },
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
}, {
  tableName: 'activity_logs'
});

module.exports = ActivitiesModel;
