const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileEntrySchema = new Schema({
    dateModified: 'number',
    fileName: 'string'
});

module.exports = mongoose.model('FileEntry', fileEntrySchema);