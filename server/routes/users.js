const userRouter = require('express').Router();
const userController = require('../controllers/userController');

userRouter.get('/userData', userController.getData);
userRouter.post('/follow', userController.postFollow);
userRouter.delete('/follow', userController.deleteFollow)

module.exports = userRouter