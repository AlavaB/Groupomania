module.exports = app => {
    const posts = require('../controllers/post');
    const auth = require('../middleware/auth');
  
    const router = require('express').Router();
  
    //Create a new Post
    router.post("/", auth, posts.createPost);
  
    //Get one Post
    router.get("/:id", posts.getOnePost);
    router.get("/", auth, posts.getAllPosts);
    router.put('/:id', posts.modifyPost);
    router.delete('/:id', auth, posts.deletePost);

    app.use('/api/posts', router);
  };