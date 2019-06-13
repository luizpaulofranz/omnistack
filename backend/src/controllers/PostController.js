const Post = require('../models/Post');
const sharp = require('sharp'); // dependency to resize images
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt'); //the minus sign "-" means "DESC"
        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body; // multer middleware parses the body
        const { filename: image } = req.file;
        const [name] = image.split('.');
        const fileName = `${name}.jpg`
        //console.log(req.file);

        await sharp(req.file.path) // the file path
            .resize(500) // 500 is the max size either width or height
            .jpeg({quality:75}) // convert always to jpg with 75 percent quality
            .toFile( // configure where this croped img will be saved
                path.resolve(req.file.destination, 'resized' , fileName)
            );
        
        // then we erase the original img
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        });

        // notify all users that has a new post
        req.io.emit('post', post);

        res.json(post);
    }
}