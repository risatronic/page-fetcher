const request = require('request');
const fs = require('fs');
const inputURL = process.argv[2];
const outputFile = process.argv[3];

request(inputURL, (error, response, body) => {
  console.log('statusCode:', response && response.statusCode);
  fs.writeFile(outputFile, body, (error) => {
    // fs.lstatSync(outputFile);

    if (error || response.statusCode !== 200) {
      if (error.code === 'ENOENT') {
        console.log('Invalid file path, nothing written to system');
      }
      return console.log('error: ', error);
    }
    let size = body.length;
    console.log(`Downloaded and saved ${size} bytes to ${outputFile}`);
  });
});