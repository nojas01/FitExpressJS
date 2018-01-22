// formula source: https://www.geodatasource.com/developers/javascript
const models = require('../models')
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config)

sequelize.query( "SELECT latitude, longitude, time FROM trainings ORDER BY time", {type: Sequelize.QueryTypes.SELECT})
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
    	dist = dist * 60 * 1.1515 * 1.609344
      totalDistance += dist
    }
    console.log(totalDistance);
})
.catch((error) => console.log(error))

//
// function distance(lat1, lon1, lat2, lon2, unit) {
// 	var radlat1 = Math.PI * lat1/180
// 	var radlat2 = Math.PI * lat2/180
// 	var theta = lon1-lon2
// 	var radtheta = Math.PI * theta/180
// 	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
// 	dist = Math.acos(dist)
// 	dist = dist * 180/Math.PI
// 	dist = dist * 60 * 1.1515
// 	if (unit=="K") { dist = dist * 1.609344 }
// 	if (unit=="N") { dist = dist * 0.8684 }
// 	return dist
// }
