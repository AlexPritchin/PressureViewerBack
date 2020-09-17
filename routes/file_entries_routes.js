const express = require('express');

const fileEntriesController = require('../controllers/file_entries_controller');
const isAuth = require('../middleware/auth_middleware');

const router = express.Router();

router.get('/file-entries', isAuth, fileEntriesController.getFileEntries);

router.post('/file-entries', isAuth, fileEntriesController.createFileEntry);

router.delete('/file-entries/:fileEntryId', isAuth, fileEntriesController.deleteFileEntry);

module.exports = router;