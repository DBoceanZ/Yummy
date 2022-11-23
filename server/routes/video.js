const videoRouter = require('express').Router();
const getVideoData = require('../controllers/getVideoData');
const postVideoData = require('../controllers/postVideoData');

videoRouter.get('/comments', getVideoData.videoComments);
videoRouter.post('/comments', postVideoData.comment);
videoRouter.post('/likes', postVideoData.like)
module.exports = videoRouter