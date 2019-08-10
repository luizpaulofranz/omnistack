const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {

        // the dev who GIVES the like comes through headers
        const { user } = req.headers;
        // the dev who receives the like comes through URL params 
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        // check if the user exists
        if (!targetDev) {
            return res.status(400).json({ error: 'Target Dev no exists!'});
        }
        if (!loggedDev) {
            return res.status(400).json({ error: 'Logged Dev no exists!'});
        }

        loggedDev.dislikes.push(targetDev._id);
        await loggedDev.save();

        return res.json(loggedDev)
    }
}