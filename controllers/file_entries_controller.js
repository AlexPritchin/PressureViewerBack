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
    fileEntry: {
      id: result._id,
      dateModified: result.dateModified,
      fileName: result.fileName,
    },
  });
};

exports.deleteFileEntry = async (req, res, next) => {
  const fileEntryIdForDeletion = req.params.fileEntryId;
  const result = await FileEntry.findByIdAndRemove(fileEntryIdForDeletion);
  res.status(200).json({ message: 'Deleted successfully' });
};
