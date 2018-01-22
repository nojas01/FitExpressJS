// formula source: https://www.geodatasource.com/developers/javascript
const models = require('../models')
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config)

sequelize.query( "SELECT latitude, longitude FROM trainings", {type: Sequelize.QueryTypes.SELECT})
  .then((position) => {
    let totalDistance = 0
    for (let i = 1; i < position.length; i++) {
      let radlat1 = Math.PI * position[i-1].latitude /180
    	let radlat2 = Math.PI * position[i].latitude /180
    	let theta = position[i-1].longitude - position[i].longitude
    	let radtheta = Math.PI * theta/180
    	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    	dist = Math.acos(dist)
    	dist = dist * 180/Math.PI
    	dist = dist * 60
      totalDistance += dist
    }
    console.log(totalDistance);
})
.catch((error) => console.log(error))
