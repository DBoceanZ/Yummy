const videoRouter = require('express').Router();
const getVideoData = require('../controllers/getVideoData');

videoRouter.get('/comments', getVideoData.videoComments)
module.exports = videoRouter