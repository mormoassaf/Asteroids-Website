const mongoose = require('mongoose');

const generateKey = function (length) {
    var result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const userSchema  = new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
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
    permissionLevel: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false},
    verificationKey: { type: String, default: generateKey(10)}
});

module.exports = mongoose.model('User', userSchema);
