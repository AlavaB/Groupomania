const db = require('../models');
const user = require('../models/user');
const Comment = db.comment;

// Create and Save a new Comment
exports.createComment = (req, res, next) => {

  // Create a Comment
  const comment = {
    content: req.body.content,
    post_id: req.body.postId,
    user_id: req.body.userId
  };
  //Save Comment in database
  Comment.create(comment)
    .then(data => { res.send(data) })
    .catch(error => console.log(error) );//res.status(500).json({ error }
};


// Find a single Comment with an id
exports.getOneComment = (req, res, next) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => { res.send(data) })
    .catch(error => res.status(500).json({ error }));
};

// Modify a single Comment with an id
exports.modifyComment = (req, res, next) => {
  Comment.update({
    content: req.body.content
  }, {
    where: { id: req.params.id },
    returning: true,//Option to tell Sequelize to return the post
    plain: true//To return the post itself 
  })
    .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
    .catch(error => res.status(404).json(error));
};

exports.deleteComment = (req, res, next) => {console.log(req.params.id);
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch(error => res.status(404).json(error));
}
