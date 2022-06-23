'use strict';
const express = require('express');
const cors = require('cors');
const router = require('./router')

const app = express();

app.use(cors({origin: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.options(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/.netlify/functions/api', router);

module.exports = app;
