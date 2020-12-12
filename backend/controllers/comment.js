const db = require('../models');
const Comment = db.comment;

// Create and Save a new Comment
exports.createComment = (req, res, next) => {

  // Create a Comment
  const comment = {
    content: req.body.content,
    post_id: req.body.post_id,
    user_id: req.body.user_id
  };
  //Save Comment in database
  Comment.create(comment)
    .then(data => { res.send(data) })
    .catch(error => res.status(500).json({ error }));
};


// Find a single Comment with an id
exports.getOneComment = (req, res, next) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => { res.send(data) })
    .catch(error => res.status(500).json({ error }));
};

//Find all comments
/*exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    order: [[ "created_at", "DESC" ]],
    include: [
    {model: db.post,
      },{model: db.user
      }]})

    .then(comments => { const resObj = comments.map(comment => {
        //tidy up the user data
      return Object.assign(
        {},
        {
          comment_id: comment.id,
          comment_content: comment.content,
          comment_user: comment.user.pseudo,
          comment_posts: comment.posts,
          comment_creation_date: comment.created_at
        })
        
    });
    res.json(resObj) })

};*/