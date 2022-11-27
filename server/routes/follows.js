const followsRouter = require('express').Router();
const followsController = require('../controllers/followsController');

followsRouter.get('/followsData', followsController.getData);

module.exports = followsRouter