const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const auth = require('../middleware/auth');

router.get('/', articleController.getAll);
router.get('/:articleId', articleController.getById);
router.post('/', auth, articleController.createPost);

module.exports = router;