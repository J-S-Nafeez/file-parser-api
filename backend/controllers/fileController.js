




const File = require('../models/fileModel');
const { v4: uuidv4 } = require('uuid');
const { processFile } = require('../services/fileService');
const path = require('path');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
  try {
    console.log('req.file:', req.file);

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newFile = await File.create({
      fileId: uuidv4(),
      filename: req.file.originalname,
      filepath: req.file.path,
    });

    processFile(newFile.fileId);

    res.status(201).json(newFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getFileProgress = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOne({ fileId });
    if (!file) return res.status(404).json({ message: 'File not found' });

    res.json({ fileId: file.fileId, status: file.status, progress: file.progress });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFileContent = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOne({ fileId });
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (file.status !== 'ready') {
      return res.json({ message: 'File upload or processing in progress. Please try again later.' });
    }

    res.json({ fileId: file.fileId, parsedData: file.parsedData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const files = await File.find().select('-parsedData');
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOneAndDelete({ fileId });
    if (!file) return res.status(404).json({ message: 'File not found' });

    if (fs.existsSync(file.filepath)) fs.unlinkSync(file.filepath);

    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
