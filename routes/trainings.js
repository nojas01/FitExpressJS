const models    = require('../models')
const express   = require('express')
const multer    = require('multer')
const fs        = require('fs')
const XmlStream = require('xml-stream')
const router    = express.Router()
const storage   = multer.memoryStorage()
const upload    = multer({ storage: storage })

router
  .post('/trainings',, (req, res, next) => {
      console.log(upload)
      const stream = fs.createReadStream(upload)
      const xml = new XmlStream(stream)

      xml.on('endElement: trkpt', function(row) {
        const newTraining = {}
        newTraining.time = row.time
        newTraining.latitude = row['$'].lat
        newTraining.longitude = row['$'].lon
        newTraining.cadance = row.extensions['ns3:TrackPointExtension']['ns3:cad']
        newTraining.heartrate = row.extensions['ns3:TrackPointExtension']['ns3:hr']

        models.training.create(newTraining)
          .then((training) => { res.json(training) })
          .catch((error) => next(error))
      })
    })

module.exports = router
