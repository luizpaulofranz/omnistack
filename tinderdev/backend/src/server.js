const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://luizpaulofranz:opT631xS@cluster0-iekvu.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

// by default, express doesn't understand json, so we have to set it
server.use(express.json());
// to allow cors
server.use(cors());
server.use(routes);

server.listen(3333);