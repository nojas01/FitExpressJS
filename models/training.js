'use strict';
module.exports = (sequelize, DataTypes) => {
  var training = sequelize.define('training', {
    time: DataTypes.TIME,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    temperature: DataTypes.FLOAT,
    cadance: DataTypes.INTEGER,
    heartrate: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return training;
};
