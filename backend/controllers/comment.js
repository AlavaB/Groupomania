const db = require('../models');
const Comment = db.comment;
const Op = db.Sequelize.Op;

// Create and Save a new Comment
exports.createComment = (req, res) => {
    
    // Create a Comment
    const comment = {
        content: req.body.content,
        image: req.body.image,
        post_id: req.body.post_id
    };
    //Save Comment in database
    Comment.create(comment)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur serveur."
        });
    });
};

// Find a single Comment with an id
exports.getOneComment = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur serveur"
      });
    });
};