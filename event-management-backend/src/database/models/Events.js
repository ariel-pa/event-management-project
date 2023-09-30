'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Events.belongsTo(models.User,{
        foreignKey: "user_id"
      })
    
      Events.hasMany(models.EventLogs,{
        foreignKey: "event_id"
      })
    }
  }
  Events.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    event_date: DataTypes.DATE,
    place: DataTypes.STRING,
    imagen: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};