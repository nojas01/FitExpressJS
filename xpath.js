const fs        = require('fs');
const XmlStream = require('xml-stream');
const models = require('./models')


const stream=fs.createReadStream('test.gpx');
const xml = new XmlStream(stream);
// xml.preserve('extensions', true)
// xml.collect('subitem')
xml.on('endElement: trkpt', function(row) {
  const newTraining = {}
  newTraining.time = row.time
  newTraining.latitude = row['$'].lat
  newTraining.longitude = row['$'].lon
  newTraining.cadance = row.extensions['ns3:TrackPointExtension']['ns3:cad']
  newTraining.heartrate = row.extensions['ns3:TrackPointExtension']['ns3:hr']

  console.log(newTraining);
  models.training.create(newTraining)
    .then((training) => {
      console.log(training)
    })
    .catch((error) => console.log(error))
});
