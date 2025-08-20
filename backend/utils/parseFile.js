const fs = require('fs');
const csv = require('csv-parser'); // optional, for CSV parsing here we used 

const parseFile = async (file) => {
  return new Promise((resolve, reject) => {
    const results = [];

    if (file.filename.endsWith('.csv')) {
      fs.createReadStream(file.filepath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    } else if (file.filename.endsWith('.json')) {
      fs.readFile(file.filepath, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    } else {
      // For other types, just return raw text
      fs.readFile(file.filepath, 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    }
  });
};

module.exports = parseFile;
