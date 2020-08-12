const FileEntry = require('../models/file_entry_model');

exports.getFileEntries = async (req, res, next) => {
  const fileEntries = await FileEntry.find();
  const mappedFileEntries = fileEntries.map(entry => {
    return {
      id: entry._id,
      dateModified: entry.dateModified,
      fileName: entry.fileName,
    };
  });
  res.status(200).json(mappedFileEntries);
};
