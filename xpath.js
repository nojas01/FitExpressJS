const fs        = require('fs');
const XmlStream = require('xml-stream');
/*
   * Pass the ReadStream object to xml-stream
*/
const stream=fs.createReadStream('test.gpx');
const xml = new XmlStream(stream);
xml.on('endElement: trkpt', function(row) {
  console.log(row);
});
