'use strict';
const express = require('express');
const cors = require('cors');
const router = require('./router')

const app = express();

app.use(cors({origin: "null"}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options('*', cors())
app.use('/.netlify/functions/api', router);

module.exports = app;
