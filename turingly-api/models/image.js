const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
});

//Image is a model which has a schema imageSchema

module.exports = mongoose.model('Image', imageSchema);
