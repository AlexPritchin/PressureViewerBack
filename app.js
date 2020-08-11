const express = require('express');
const bodyParser = require('body-parser');

const fileEntriesRoutes = require('./routes/file_entries_routes');

const app = express();

app.use(bodyParser.json());

app.use(fileEntriesRoutes);

app.listen(8000);