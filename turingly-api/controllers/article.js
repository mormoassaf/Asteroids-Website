const Article = require('../models/article');
const mongoose = require('mongoose');

const createArticle = function(data) {
    return new Article({
        _id: new mongoose.Types.ObjectId(),
        author: data.author,
        title: data.title,
        description: data.description,
        blocks: data.blocks,
        version: data.version
    });
}

exports.getAll = function(req, res, next) {
    Article.find()
        .exec()
        .then(result => res.status(200).json(result))
        .catch(e => next(e));
}

exports.getById = function (req, res, next) {
    Article.findById(req.params.articleId)
        .exec()
        .then(result => {
            if (result) res.status(200).json(res)
            else res.status(404).json({message: 'Article could not be found'});
        })
        .catch(e => next(e));
}

exports.create = function(req, res, next) {
    const article = createArticle(req.data);
    article
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