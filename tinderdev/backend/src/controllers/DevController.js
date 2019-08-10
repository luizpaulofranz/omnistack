const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    async index(req, res) {
        // the current logged user must have ID in their header
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);

        // we find users there are not me, and are not in my like and dislike lists
        const users = await Dev.find({
            // and conditions
            $and: [
                { _id: { $ne: user }}, // all users where _id is NOT EQUAL ($ne) to the current logged user
                { _id: { $nin: loggedDev.likes }}, // all users where _id is NOT IN ($nin) my liked list
                { _id: { $nin: loggedDev.dislikes }},
            ]
        });

        return res.json(users);
    },

    async store(req, res) {
        const { username } = req.body;

        // if user already exists, just retur the current DB user
        const userExists = await Dev.findOne({ user:username });
        if ( userExists ) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        
        // here we're renaming a constname during its destructuring
        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev)
    }
}