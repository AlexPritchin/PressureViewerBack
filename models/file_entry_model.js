const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileEntrySchema = new Schema({
    dateModified: Number,
    fileName: String
});

module.exports = mongoose.model('FileEntry', fileEntrySchema);