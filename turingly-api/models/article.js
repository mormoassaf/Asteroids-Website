const mongoose = require('mongoose');
const {Schema, SchemaTypes} = require("mongoose");

const articleSchema = new Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    image: { type: SchemaTypes.ObjectId, ref: 'Image', required: true },
    author: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    blocks: { type: Array, required: true },
    created: { type: Date, default: Date.now },
    comments: [{type: SchemaTypes.ObjectId, ref: "Comment"}],
    likes: [{ type: SchemaTypes.ObjectId, ref: 'User', required: true }],
    version: {type: String, required: true},
    tags: [{ type: String, require: false}]
});

module.exports = mongoose.model('Article', articleSchema);