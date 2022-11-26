const videosRouter = require('express').Router();
const tagController = require('../controllers/tagController');
const videosController = require('../controllers/videosController')

videosRouter.get('/tags', tagController.getTags);
videosRouter.get('/home', videosController.homeVideos)

module.exports = videosRouter