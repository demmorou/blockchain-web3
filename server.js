const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');

app.use(bodyParser.json());
app.use('/instructor', require('./src/routes'));

app.listen(process.env.ON_PORT);