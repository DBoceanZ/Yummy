const followsRouter = require('express').Router();
const { getFollowers, getFollowing } = require('../controllers/followsController');

followsRouter.get('/followers', getFollowers);
followsRouter.get('/following', getFollowing);

module.exports = followsRouter