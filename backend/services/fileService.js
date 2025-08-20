// const File = require('../models/fileModel');
// const parseFile = require('../utils/parseFile');

// const processFile = async (fileId) => {
//   const file = await File.findOne({ fileId });
//   if (!file) return;

//   try {
//     // Simulate progress
//     for (let i = 10; i <= 90; i += 20) {
//       file.progress = i;
//       await file.save();
//       await new Promise((res) => setTimeout(res, 500)); // delay to simulate processing
//     }

//     const parsedData = await parseFile(file);
//     file.parsedData = parsedData;
//     file.status = 'ready';
//     file.progress = 100;
//     await file.save();
//   } catch (err) {
//     file.status = 'failed';
//     await file.save();
//   }
// };

// module.exports = { processFile };












const File = require('../models/fileModel');
const fs = require('fs');
const csv = require('csv-parser'); // for CSV
const path = require('path');

// Parse file utility
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
        else resolve(JSON.parse(data));
      });
    } else {
      fs.readFile(file.filepath, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    }
  });
};

// Async process function
const processFile = async (fileId) => {
  const file = await File.findOne({ fileId });
  if (!file) return;

  try {
    // Simulate progress
    for (let i = 10; i <= 90; i += 20) {
      file.progress = i;
      await file.save();
      await new Promise((res) => setTimeout(res, 500)); // delay
    }

    const parsedData = await parseFile(file);
    file.parsedData = parsedData;
    file.status = 'ready';
    file.progress = 100;
    await file.save();
  } catch (err) {
    console.error(err);
    file.status = 'failed';
    await file.save();
  }
};

module.exports = { processFile, parseFile };
