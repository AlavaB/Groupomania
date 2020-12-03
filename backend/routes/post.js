module.exports = app => {
    const posts = require('../controllers/post');
  
    var router = require('express').Router();
  
    //Create a new Post
    router.post("/", posts.createPost);
  
    //Get one Post
    router.get("/:id", posts.getOnePost);
  
    app.use('/api/posts', router);
  };