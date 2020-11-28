const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const auth = require('../middleware/auth');

router.get('/', articleController.getAll);
router.get('/titles', articleController.getTitles);
router.get('/:articleId', articleController.getById);
router.post('/', auth.check, articleController.create);

module.exports = router;