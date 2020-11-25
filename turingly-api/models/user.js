const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    created: { type: Date, default: Date.now },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    permissionLevel: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
