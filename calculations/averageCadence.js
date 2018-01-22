const models = require('../models')
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config)


sequelize.query( "SELECT avg(cadance) FROM trainings", { type: Sequelize.QueryTypes.SELECT})
  .then((avg) => console.log(avg))
  .catch((error) => console.log(error))



//
// models.training.count()
//   .then(count => {console  .log(count)})
//   .catch((error) => console.log(error))
//
// models.training.sum('cadance').then(sum => {
// console.log(sum)
// }).catch((error) => console.log(error))
//
//
// // const question = "SELECT * FROM `Rowers` WHERE UserId =" + UserId
// // sequelize.query( question, { type: Sequelize.QueryTypes.SELECT})
// //   .then((rowers) => res.json(rowers))
// //   .catch((error) => next(error))
