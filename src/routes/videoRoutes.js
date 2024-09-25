const express = require('express');
const videoController = require('../controllers/video/videoController');

const router = express.Router();

router.get('/', videoController.getVideos);


module.exports = router;
