const Image = require('../models/image');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

exports.getById = function (req, res, next) {
    Image.findById(req.params.imageId)
        .exec()
        .then(result => {
            if (result) {
                res.writeHead(200, {
                    'Content-Type': result.img.contentType,
                    'Content-Length': result.img.data.length
                });
                res.end(result.img.data);
            }
            else res.status(404).json({message: 'Image could not be found'});
        })
        .catch(e => next(e));
}

exports.create = function (req, res, next) {
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync('resources/static/assets/uploads/' + req.file.filename),
            contentType: 'image/png'
        }
    });
    image
        .save()
        .then(result => res.status(201).json({
            data: {
                _id: result._id,
            },
            request: {
                method: 'GET',
                uri: ''
            }
        }))
        .catch(e => next(e));
}