const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/post');

router.get('/getAllPost', auth, userCtrl.getAllPost);

module.exports = router;