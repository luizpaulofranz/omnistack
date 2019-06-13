const express = require('express');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

// multer is a lib to handle upload files through multipart-forms and beyound that, it parses our form fields
// it is configured in config/upload file
const multer = require('multer');
const uploadConf = require('./config/upload');

const routes = new express.Router();
const upload = multer(uploadConf);

// ***** point routes to controller methods ****//
routes.get('/posts', PostController.index)
// second arg is the form field which contains a file
routes.post('/posts', upload.single('image'),  PostController.store)

routes.post('/posts/:id/like', LikeController.store)

module.exports = routes;