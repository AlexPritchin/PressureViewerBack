const FileEntry = require('../models/file_entry_model');
const fileEntriesHelper = require('../utils/helpers/file_entry_helper');

exports.getFileEntries = async (req, res, next) => {
  try {
    const fileEntries = await FileEntry.find();
    const mappedFileEntries = fileEntries.map(entry => {
      return fileEntriesHelper.mapFileEntryToOnlyNeededFields(entry);
    });
    res.status(200).json(mappedFileEntries);
  } catch (error) {
    error.message = 'Server error';
    next(error);
  }
};

exports.createFileEntry = async (req, res, next) => {
  const newDateModified = req.body.dateModified;
  const newFileName = req.body.fileName;
  const newFileEntry = new FileEntry({
    dateModified: newDateModified,
    fileName: newFileName,
  });
  const result = await newFileEntry.save();
  res.status(201).json({
    message: 'Created successfully',
    fileEntry: fileEntriesHelper.mapFileEntryToOnlyNeededFields(result),
  });
};

exports.deleteFileEntry = async (req, res, next) => {
  const fileEntryIdForDeletion = req.params.fileEntryId;
  const result = await FileEntry.findByIdAndRemove(fileEntryIdForDeletion);
  res.status(200).json({ message: 'Deleted successfully' });
};
