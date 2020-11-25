const mongoose = require('mongoose');
const {Schema, SchemaTypes} = require("mongoose");

const articleSchema = new Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    author: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    body: { type: String, required: true },
    created: { type: Date, default: Date.now },
    comments: { type: Array, default: [] },
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Article', articleSchema);