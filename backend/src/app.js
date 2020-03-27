const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {
    errors
} = require('celebrate');

const app = express();

app.use(cors())
app.use(express.json()); // os corpos da requisição serão convertidos para json
app.use(routes);
app.use(errors());

module.exports = app;