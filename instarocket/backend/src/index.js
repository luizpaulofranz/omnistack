const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
// cors handling, all access *
app.use(cors());
// to handle socket.io communication
const server = require('http').Server(app); // to handle HTTP
const io = require('socket.io')(server); // to handle web sockets

// we create our own midlleware to send the io obj with all requests
app.use((req, res, next) => {
    req.io = io
    next() // step ahead
});

// to give access to static files
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

// routing
app.use(require('./routes'));

// db connection
mongoose.connect('mongodb+srv://luizpaulofranz:opT631xS@cluster0-iekvu.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.listen(3333);