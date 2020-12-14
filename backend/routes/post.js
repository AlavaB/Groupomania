module.exports = app => {
    const posts = require('../controllers/post');
    const auth = require('../middleware/auth');
  
    const router = require('express').Router();
    //const multer = require('../middleware/multer-config');
  
    //Create a new Post
    router.post("/", auth, posts.createPost);
  
    //Get one Post
    router.get("/:id", posts.getOnePost);
    router.get("/", auth, posts.getAllPosts);
    router.put('/:id', auth, posts.modifyPost);
    router.delete('/:id', auth, posts.deletePost);

    app.use('/api/posts', router);
  };