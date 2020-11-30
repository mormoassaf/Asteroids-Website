const mongoose = require('mongoose');
const {Schema, SchemaTypes} = require("mongoose");

const commentSchema = new Schema({
    content: { type: String, required: true },
    author : { type: SchemaTypes.ObjectId, ref: "User", required: true },
    comments: [{type: SchemaTypes.ObjectId, ref: "Comment"}],
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', commentSchema);