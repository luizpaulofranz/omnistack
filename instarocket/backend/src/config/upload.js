const multer = require('multer');
const path = require('path'); // native from node

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), // first is current path, then is just folder navigation commands
        filename: function(req, file, callBack) {
            callBack(null, file.originalname);
        }
    })
};