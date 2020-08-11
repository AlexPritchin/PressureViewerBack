const express = require('express');

const router = express.Router();

router.get('/file-entries');

router.post('/file-entries');

router.delete('/file-entries/:fileEntryId');

module.exports = router;