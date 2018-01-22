const fs        = require('fs');
const XmlStream = require('xml-stream');
const models = require('./models')


const stream=fs.createReadStream('activity_2449018051.gpx');
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

  return models.sequelize.transaction(function (t) {
    return models.training.create({newTraining},
  {transaction: t}).then((training) => { console.log(training) })
    .catch((error) => console.log(error))
  })
})
