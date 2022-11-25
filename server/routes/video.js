const videoRouter = require('express').Router();
const videoController = require('../controllers/videoController');

videoRouter.get('/comments', videoController.getComments);
videoRouter.post('/comments', videoController.addComment);
videoRouter.post('/likes', videoController.addLike)
module.exports = videoRouter