const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const fileEntriesRoutes = require('./routes/file_entries_routes');
const errorMiddleware = require('./middleware/error_middleware');

const mongoDBConnectionString =
  'mongodb+srv://alex_main:alex_main_123@cluster0-n0qvc.mongodb.net/PressureViewer?retryWrites=true&w=majority';

const app = express();

app.use(bodyParser.json());

app.use(fileEntriesRoutes);

app.use(errorMiddleware.errorHandler);

mongoose
  .connect(mongoDBConnectionString)
  .then(result => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
