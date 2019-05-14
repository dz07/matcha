const express = require('express');
const router  = express.Router();

router.post('/save-avatar', require('./saveAvatar'));

router.post('/save-photo', require('./savePhoto'));

router.post('/get-photos', require('./getPhotos'));

router.post('/delete-photo', require('./deletePhoto'));

export default router;

