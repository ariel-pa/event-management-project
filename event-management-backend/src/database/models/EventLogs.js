'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventLogs.belongsTo(models.User,{
        foreignKey: "user_id"
      })

      EventLogs.belongsTo(models.Events,{
        foreignKey: "event_id"
      })
    }
  }
  EventLogs.init({
    registration_date: DataTypes.DATE,
    user_id: DataTypes.STRING,
    event_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventLogs',
  });
  return EventLogs;
};