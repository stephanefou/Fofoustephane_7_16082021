const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/post');

/*router.get('/getAllPost', auth, userCtrl.getAllPost);
router.post('/newPost', auth, userCtrl.newPost);
router.post('/getOnePost', auth, userCtrl.getOnePost);
router.post('/deleteOnePost', auth, userCtrl.deleteOnePost);
router.post('/modifyOnePost', auth, userCtrl.modifyOnePost);
router.post('/getUserPosts', auth, userCtrl.getUserPosts);
router.post('/newComment', auth, userCtrl.newComment);
router.post('/getAllComments', auth, userCtrl.getAllComments);
router.post('/deleteComment', auth, userCtrl.deleteComment);*/

//Posts
router.get('/', auth, userCtrl.getAllPost);
router.post('/', auth, userCtrl.newPost);
router.get('/:id', auth, userCtrl.getOnePost);
router.delete('/:id', auth, userCtrl.deleteOnePost);
router.put('/:id', auth, userCtrl.modifyOnePost);
router.get('/user:id/posts', auth, userCtrl.getUserPosts);

//Commentaires
router.get('/:id/comments', auth, userCtrl.getAllComments);
router.post('/:id/comment/', auth, userCtrl.newComment);
router.delete('/comment/:id', auth, userCtrl.deleteComment);

module.exports = router;