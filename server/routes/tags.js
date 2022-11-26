const tagsRouter = require('express').Router();
const tagController = require('../controllers/tagController');

tagsRouter.get('/tags', tagController.getTags);

module.exports = tagsRouter