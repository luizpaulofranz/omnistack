const Post = require('../models/Post');

module.exports = {

    async store(req, res) {
        
        const post = await Post.findById(req.params.id);
        post.likes += 1;
        await post.save();

        // notify all users that has a new like
        req.io.emit('like', post);

        res.json(post);
    }
}