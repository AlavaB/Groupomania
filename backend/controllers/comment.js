const db = require('../models');
const Comment = db.comment;

// Create and Save a new Comment
exports.createComment = (req, res) => {

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
exports.getOneComment = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => { res.send(data) })
    .catch(error => res.status(500).json({ error }));
};