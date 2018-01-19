const fs        = require('fs');
const XmlStream = require('xml-stream');
const models = require('./models')


const stream=fs.createReadStream('test.gpx');
const xml = new XmlStream(stream);
// xml.preserve('extensions', true)
// xml.collect('subitem')
xml.on('endElement: trkpt', function(row) {
  const newTraining = {
    time: row.time,
    latitude: row['$'].lat,
    longitude: row['$'].lon,
    cadance: row.extensions['ns3:TrackPointExtension']['ns3:cad'],
    heartrate: row.extensions['ns3:TrackPointExtension']['ns3:hr']
  }

  models.sequelize.transaction(function (t) {
    return models.training.bulkCreate(newTraining)
  },  {transaction: t}).then((training) => { console.log(training) })
    .catch((error) => console.log(error))
});
