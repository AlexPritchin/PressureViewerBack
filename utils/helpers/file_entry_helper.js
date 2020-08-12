exports.mapFileEntryToOnlyNeededFields = entry => {
  return {
    id: entry._id,
    dateModified: entry.dateModified,
    fileName: entry.fileName,
  };
};
