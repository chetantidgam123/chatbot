﻿require('rootpath')();
require("dotenv").config()
const express = require('express');
// const  logger  = require('')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger')
const db = require('./_helpers/db')
const errorHandler = require('_middleware/error-handler');
const api = require('./api');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
require('events').EventEmitter.prototype._maxListeners = 0;
db;
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false })); // PARSE application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' })); // PARSE application/json
// Use morgan middleware with the custom format
// api routes
// app.use(checkSqlInjection());
app.use(process.env.BASE_URL, api({ express, logger }));
// global error handler
app.use(errorHandler);
// start server
// connect()
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
