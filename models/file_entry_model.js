const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileEntrySchema = new Schema({
    dateModified: Number,
    fileName: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('FileEntry', fileEntrySchema);