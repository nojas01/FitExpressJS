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

      res.setHeader('Content-Type', 'application/json')

      xml.on('endElement: trkpt', function(row) {
        const newTraining = {
          time: row.time,
          latitude: row['$'].lat,
          longitude: row['$'].lon,
          cadance: row.extensions['ns3:TrackPointExtension']['ns3:cad'],
          heartrate: row.extensions['ns3:TrackPointExtension']['ns3:hr']
        }

      models.training.create(newTraining)
      // .then((training) => { res.write(training) })
      // .catch((error) => next(error))

      })
      xml.on('end', function() {
        res.end();
      })

      fs.unlink('./uploads/training.gpx',(err) => {
        if (err) throw err;
        console.log('successfully deleted /tmp/hello');
      })
    })

module.exports = router
