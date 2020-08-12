const FileEntry = require('../models/file_entry_model');

exports.getFileEntries = async (req, res, next) => {
  fileEntries = await FileEntry.find();
  res.status(200).json(fileEntries);
};
