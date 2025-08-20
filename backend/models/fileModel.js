const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileId: { type: String, unique: true },
  filename: { type: String },
  filepath: { type: String },
  status: { type: String, default: 'uploading' }, // uploading, processing, ready, failed
  progress: { type: Number, default: 0 },
  parsedData: { type: mongoose.Schema.Types.Mixed, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
