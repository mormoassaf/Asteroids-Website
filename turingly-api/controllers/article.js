const Article = require('../models/article');
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


const createArticle = function(data) {
    return new Article({
        _id: data.title.split(' ').join('-') + generateKey(),
        author: data.userData.userId,
        title: data.title,
        description: data.description,
        blocks: data.blocks,
        version: data.version,
        tags: data.tags
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
            if (result) res.status(200).json(result)
            else res.status(404).json({message: 'Article could not be found'});
        })
        .catch(e => next(e));
}

exports.create = function(req, res, next) {
    const article = createArticle(req.body);
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

exports.getTitles = function(req, res, next) {
    Article
        .find()
        .sort([['created', -1]])
        .select('_id author title description created')
        .exec()
        .then(results => {
            if (results) res.status(200).json(results)
            else res.status(404).json({msg: 'There are no articles'});
        })
        .catch(e => next(e));
}