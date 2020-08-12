const express = require('express');

const fileEntriesController = require('../controllers/file_entries_controller');

const router = express.Router();

router.get('/file-entries', fileEntriesController.getFileEntries);

router.post('/file-entries', fileEntriesController.createFileEntry);

router.delete('/file-entries/:fileEntryId', fileEntriesController.deleteFileEntry);

module.exports = router;