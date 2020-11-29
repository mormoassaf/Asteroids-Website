const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/:userId', userController.getById);


module.exports = router;
