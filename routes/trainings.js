const models    = require('../models')
const express   = require('express')
const multer    = require('multer')
const fs        = require('fs')
const XmlStream = require('xml-stream')
const router    = express.Router()
const storage   = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '.gpx')
    }
  })
const upload = multer({ storage: storage })

router
  .post('/trainings',upload.single('training'), (req, res, next) => {
      const stream = fs.createReadStream('./uploads/training.gpx')
      const xml = new XmlStream(stream)

      xml.on('endElement: trkpt', function(row) {
        const newTraining = {}
        newTraining.time = row.time
        newTraining.latitude = row['$'].lat
        newTraining.longitude = row['$'].lon
        newTraining.cadance = row.extensions['ns3:TrackPointExtension']['ns3:cad']
        newTraining.heartrate = row.extensions['ns3:TrackPointExtension']['ns3:hr']

        sequelize.transactions
        models.training.create(newTraining)
          .then((training) => { res.json(training) })
          .catch((error) => next(error))
      })

      fs.unlink('./uploads/training.gpx',(err) => {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
      })
    })

module.exports = router
