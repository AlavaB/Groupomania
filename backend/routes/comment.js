module.exports = app => {
    const comments = require('../controllers/comment');
  
    var router = require('express').Router();
  
    //Create a new Comment
    router.post("/", comments.createComment);
  
    //Get one Comment
    router.get("/:id", comments.getOneComment);
  
    app.use('/api/comments', router);
  };