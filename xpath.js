// const readline = require('readline')
// const xpath = require('xpath')
// const fs = require('fs')
//
// const rl = readline.createInterface({
//   input: fs.createReadStream('./test.gpx'),
//   crlfDelay: 100
// })
//
// rl.on('line', (line) => {
//   const filterword = /<name>*/;
//   const x = line.match(filterword)
//
//   console.log(`Line from File: ${x}`)
// })
//

const fs        = require('fs');
const XmlStream = require('xml-stream');
/*
   * Pass the ReadStream object to xml-stream
*/
const stream=fs.createReadStream('test.gpx');
const xml = new XmlStream(stream);
xml.on('endElement: trkpt', function(thing) {
  console.log(thing);
});
