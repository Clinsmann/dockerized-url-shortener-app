const express = require('express');
const server = express();
const pg = require('pg');
require('./src/database/connection');

const PORT = process.env.PORT || 3000;

// pg.connect('postgres://postgres:admin@localhost:5432/url_shortener');

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

server.get('/', (req, res) => res.status(200).send('hello'));