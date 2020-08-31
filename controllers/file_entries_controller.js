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
    next(error);
  }
};

exports.createFileEntry = async (req, res, next) => {
  try {
    const newDateModified = req.body.dateModified;
    const newFileName = req.body.fileName;
    if (newDateModified == null || newFileName == null) {
      let error = new Error('No dateModified or fileName specified');
      error.statusCode = 400;
      throw error;
    }
    const newFileEntry = new FileEntry({
      dateModified: newDateModified,
      fileName: newFileName,
    });
    const result = await newFileEntry.save();
    res.status(201).json({
      message: 'Created successfully',
      fileEntry: fileEntriesHelper.mapFileEntryToOnlyNeededFields(result),
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFileEntry = async (req, res, next) => {
  try {
    const fileEntryIdForDeletion = req.params.fileEntryId;
    if (fileEntryIdForDeletion == null) {
      let error = new Error('No fileEntryId specified');
      error.statusCode = 400;
      throw error;
    }
    const result = await FileEntry.findByIdAndRemove(fileEntryIdForDeletion);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
