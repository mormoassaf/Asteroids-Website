const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

/*
Create a user by passing the data object, note that the password will be hashed
@return promise which can be rejected if the hashing fails
 */
const createUser = function (data) {
    return new Promise((resolve, reject) => {
        // Encrypt the password and add salt
        bcrypt.hash(data.password, 10, (err, hash) => {
            if (err) {
                reject(new Error('failed to hash password'));
            } else {
                // Create the user
                resolve(new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: data.email,
                    password: hash,
                    fname: data.fname,
                    lname: data.lname,
                    gender: data.gender,
                    birthday: data.birthday,
                }));
            }
        });
    })
}

// Return a promise resolving a boolean checking if the email already exists
const checkEmail = function (email) {
    return new Promise((resolve, reject) => {
        User.find({ email: email })
            .exec()
            .then(user => {
                resolve(user.length >= 1);
            })
            .catch(e => {
                reject(e);
            })
    })
}

const createToken = function (userData) {
    return jwt.sign({
            email: userData.email,
            userId: userData._id,
            permissionLevel: userData.permissionLevel
        },
        process.env.JWT_KEY, {
            expiresIn: "1h"
        });
}

exports.signup = function (req, res, next) {
    checkEmail(req.body.email)
        .then(b => {
            if (!b) {
                createUser(req.body).then(newUser => {
                    newUser.save()
                        .then(() => res.status(201).json({ message: 'User has been registered!' }))
                        .catch(e => next(e));
                })
            } else {
                res.status(409).json({ message: "This email is already registered" });
            }
        })
        .catch(e => next(e));
}

exports.login = function (req, res, next) {
    User.find({ email: req.body.email })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return res.status(401).json({ message: "Authorisation failed!" });
            }
            // Compare the passwords and if matched pass back the access token
            bcrypt.compare(req.body.password, users[0].password, (err, isMatching) => {
                if (err) return next(err);
                if (isMatching) {
                    const token = createToken(users[0]);
                    // Send back the access token
                    return res.status(200).json({
                        message: "Login successful!",
                        token: token
                    });
                }
                res.status(401).json({ message: "Authorisation failed!" });
            });
        })
        .catch(err => next(err));
}