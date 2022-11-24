const userRouter = require('express').Router();
const userController = require('../controllers/userController');

userRouter.get('/userData', userController.getData);

module.exports = userRouter